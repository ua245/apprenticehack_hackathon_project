"""
Tools-R-Us API
Run: uvicorn main:app --reload
"""

import uuid
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from catalogue import CATALOGUE, CATEGORIES, retrieve_tools
from models import (
    AskRequest, AskResponse,
    ReviewRequest, ModerateRequest, ModerationResult,
    BiasCheckRequest, NormaliseRequest, LaunchPostRequest,
)
import prompts

app = FastAPI(
    title="Tools-R-Us API",
    description="Prompt-powered tool recommendations for UK apprentices.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory stores (swap to PostgreSQL for production)
_reviews: dict[str, list[dict]] = {}  # keyed by tool_id
_pending_reviews: list[dict] = []      # moderation queue


# ── Tools ────────────────────────────────────────────────────────────────────

@app.get("/api/tools")
def list_tools(
    category: Optional[str] = None,
    role: Optional[str] = None,
    q: Optional[str] = None,
    limit: int = Query(default=20, le=50),
):
    tools = CATALOGUE
    if category and category != "All":
        tools = [t for t in tools if t["category"] == category]
    if role:
        tools = [t for t in tools if role in t["roles"] or "all" in t["roles"]]
    if q:
        words = [w for w in q.lower().split() if len(w) > 2]
        tools = [t for t in tools if any(w in t["keywords"] for w in words)]
    return {"tools": tools[:limit], "total": len(tools)}


@app.get("/api/categories")
def list_categories():
    return {"categories": CATEGORIES}


@app.get("/api/tools/{tool_id}")
def get_tool(tool_id: str):
    tool = next((t for t in CATALOGUE if t["id"] == tool_id), None)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    reviews = _reviews.get(tool_id, [])
    return {**tool, "reviews": reviews, "review_count": len(reviews)}


# ── Ask ──────────────────────────────────────────────────────────────────────

@app.post("/api/ask")
def ask_endpoint(req: AskRequest):
    history = [m.model_dump() for m in req.history]
    result = prompts.ask(
        question=req.question,
        role=req.role,
        level=req.level,
        history=history,
        include_reviews=req.include_reviews,
    )
    # attach full tool objects for convenience
    tool_map = {t["id"]: t for t in CATALOGUE}
    for rec in result.get("recommendations", []):
        rec["tool"] = tool_map.get(rec["tool_id"])
    return result


# ── Reviews ──────────────────────────────────────────────────────────────────

@app.get("/api/tools/{tool_id}/reviews")
def get_reviews(tool_id: str):
    return {"reviews": _reviews.get(tool_id, []), "total": len(_reviews.get(tool_id, []))}


@app.post("/api/tools/{tool_id}/reviews")
def submit_review(tool_id: str, review: ReviewRequest):
    tool = next((t for t in CATALOGUE if t["id"] == tool_id), None)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    # run moderation
    mod = prompts.moderate(
        text=review.text,
        tool_id=tool_id,
        reviewer_role=review.reviewer_role,
        reviewer_level=review.reviewer_level,
        usefulness=review.usefulness,
        learning=review.learning,
        recommend=review.recommend,
    )

    review_doc = {
        "id": str(uuid.uuid4()),
        "tool_id": tool_id,
        "reviewer_role": review.reviewer_role,
        "reviewer_level": review.reviewer_level,
        "usefulness": review.usefulness,
        "learning": review.learning,
        "recommend": review.recommend,
        "text": review.text,
        "created_at": datetime.utcnow().isoformat(),
        "status": mod.get("verdict", "needs_human"),
    }

    if mod.get("verdict") == "approve":
        _reviews.setdefault(tool_id, []).append(review_doc)
    else:
        _pending_reviews.append({**review_doc, "moderation": mod})

    return {
        "status": mod.get("verdict"),
        "message": {
            "approve": "Review published. Thanks!",
            "needs_human": "Your review is under review and will appear soon.",
            "reject": mod.get("suggested_edit") or "Review doesn't meet our guidelines.",
        }.get(mod.get("verdict"), "Submitted"),
    }


# ── Admin ─────────────────────────────────────────────────────────────────────

@app.get("/api/admin/queue")
def get_queue():
    return {"pending": _pending_reviews, "total": len(_pending_reviews)}


@app.post("/api/admin/queue/{review_id}/approve")
def approve_review(review_id: str):
    idx = next((i for i, r in enumerate(_pending_reviews) if r["id"] == review_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Review not found in queue")
    review = _pending_reviews.pop(idx)
    review["status"] = "approved"
    _reviews.setdefault(review["tool_id"], []).append(review)
    return {"status": "approved"}


@app.post("/api/admin/queue/{review_id}/reject")
def reject_review(review_id: str):
    idx = next((i for i, r in enumerate(_pending_reviews) if r["id"] == review_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Review not found in queue")
    _pending_reviews.pop(idx)
    return {"status": "rejected"}


@app.post("/api/admin/bias-check")
def run_bias_check(req: BiasCheckRequest):
    reviews = _reviews.get(req.tool_id, [])
    result = prompts.bias_check(req.tool_id, reviews)
    return result


@app.post("/api/admin/normalise")
def run_normalise(req: NormaliseRequest):
    result = prompts.normalise(req.source_type, req.raw_text, req.source_url)
    return result


@app.post("/api/admin/launch-post")
def run_launch_post(req: LaunchPostRequest):
    result = prompts.launch_post(
        req.tool_id, req.submitter_role, req.submitter_level, req.submitter_use_case
    )
    return result


@app.get("/api/admin/stats")
def get_stats():
    total_reviews = sum(len(v) for v in _reviews.values())
    return {
        "tools_total": len(CATALOGUE),
        "reviews_published": total_reviews,
        "reviews_pending": len(_pending_reviews),
        "categories": len(CATEGORIES),
    }


@app.get("/")
def root():
    return {"name": "Tools-R-Us API", "docs": "/docs"}
