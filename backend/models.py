from pydantic import BaseModel, Field
from typing import Optional


class HistoryMessage(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class AskRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=1000)
    role: Optional[str] = None   # software | data | finance | business | cyber
    level: Optional[str] = None  # Level 3 … Level 7
    history: list[HistoryMessage] = []
    include_reviews: bool = True


class Recommendation(BaseModel):
    tool_id: str
    why: str
    watch_out: Optional[str] = None


class AskResponse(BaseModel):
    recommendations: list[Recommendation]
    no_good_match: bool = False
    follow_up_question: Optional[str] = None
    prompt_version: str = "1.0"


class ReviewRequest(BaseModel):
    tool_id: str
    reviewer_role: str
    reviewer_level: str
    usefulness: int = Field(..., ge=1, le=5)
    learning: int = Field(..., ge=1, le=5)
    recommend: bool
    text: str = Field(..., min_length=20, max_length=2000)


class ModerateRequest(BaseModel):
    text: str
    tool_id: str
    reviewer_role: str
    reviewer_level: str
    usefulness: int
    learning: int
    recommend: bool


class ModerationResult(BaseModel):
    verdict: str  # approve | needs_human | reject
    first_hand: bool
    missing_fields: list[str]
    guideline_issues: list[dict]
    suggested_edit: Optional[str] = None


class BiasCheckRequest(BaseModel):
    tool_id: str


class NormaliseRequest(BaseModel):
    source_type: str  # survey | university_list
    source_url: Optional[str] = None
    raw_text: str


class LaunchPostRequest(BaseModel):
    tool_id: str
    submitter_role: str
    submitter_level: str
    submitter_use_case: str
