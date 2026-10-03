# Tools-R-Us

A tool discovery and recommendation platform for UK apprentices, built for ApprenticeHack.

Apprentices search for tools by problem or browse a verified catalogue. An LLM recommends from the catalogue only — it cannot invent tools, fabricate scores or follow instructions injected through user text. Five separate prompt flows handle recommendation, moderation, bias detection, data normalisation and launch posts.

---

## How it works

### The request pipeline (Ask flow)

```
User question
    │
    ▼
2. Load context        PostgreSQL — role, level, apprenticeship standard
    │
    ▼
3. Retrieve tools      Keyword + role-fit scoring → top 5 catalogue matches
    │
    ▼
4. Assemble prompt     System rules / profile / catalogue / reviews / question / schema
    │
    ▼
5. Call model          LLM router picks model size for the task
    │
    ▼
6. Validate output     Drop any tool ID not in the retrieved set; retry once
    │
    ▼
7. Render cards        Tool cards shown; clicks and "not helpful" feed ranking
```

Only step 5 calls a model. Steps 3 and 6 are pure code — the model cannot recommend a tool that wasn't retrieved, and it cannot follow instructions embedded in user text (those sit inside `<question>` tags and are declared as data in the system prompt).

### The five LLM prompt flows

| Flow | Trigger | Model | Falls back to |
|---|---|---|---|
| **Ask** | Every user question | Mid-size hosted (`claude-sonnet-5-5`) | Plain search results |
| **Moderate** | Every new review | Small (`claude-haiku-4-5`) | Human queue |
| **Bias check** | Per review + nightly per tool | Small + statistical pre-pass | Hold review as pending |
| **Normalise** | Survey batch / university scrape | Nous Hermes (local) | Human queue |
| **Launch post** | Admin approves a tool | Nous Hermes (local) | Admin writes by hand |

Background flows (Moderate, Bias check, Normalise, Launch post) run on Nous Research open-weight Hermes models on our own hardware. Survey data never leaves the server.

---

## Quickstart

### Frontend only (no backend needed)

Open `index.html` directly in a browser. All catalogue data and retrieval logic is embedded. The Ask view returns deterministic mock responses based on the same scoring used by the backend.

```
open index.html
```

### With the backend

```bash
cd backend
cp .env.example .env          # add ANTHROPIC_API_KEY for real LLM calls
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`. Interactive docs at `/docs`.

Without `ANTHROPIC_API_KEY`, all five prompt flows return deterministic mock responses — the app is fully demo-able without a key.

---

## Project structure

```
apprenticehack_hackathon_project/
│
├── index.html              Main app — single-page, four views:
│                           Discover · Ask AI · Tool detail · Admin
│
├── prompt-design.html      Interactive explainer for the prompt architecture —
│                           build the Ask prompt live, inspect all five templates,
│                           see the model router and guardrails
│
└── backend/
    ├── main.py             FastAPI app — all routes
    ├── catalogue.py        20 verified tools with metadata and keyword index
    ├── prompts.py          All five LLM prompt functions (Ask, Moderate,
    │                       Bias check, Normalise, Launch post)
    ├── models.py           Pydantic v2 request and response schemas
    ├── requirements.txt
    └── .env.example
```

---

## API reference

### Tools

```
GET  /api/tools                     List tools (filter: category, role, q)
GET  /api/tools/{id}                Tool detail + reviews
GET  /api/categories                All category names
```

### Ask

```
POST /api/ask
{
  "question": "string",
  "role": "data | software | finance | business | cyber | null",
  "level": "Level 3 … Level 7 | null",
  "history": [{"role": "user|assistant", "content": "string"}],
  "include_reviews": true
}
```

Response includes `recommendations` (tool_id, why, watch_out), `no_good_match`, and `follow_up_question`. Tool IDs are validated against the retrieved set before the response is returned.

### Reviews

```
POST /api/tools/{id}/reviews        Submit a review (runs moderation before publishing)
GET  /api/tools/{id}/reviews        Get published reviews
```

### Admin

```
GET  /api/admin/queue               Pending moderation queue
POST /api/admin/queue/{id}/approve
POST /api/admin/queue/{id}/reject
POST /api/admin/bias-check          {"tool_id": "string"}
POST /api/admin/normalise           {"source_type": "survey|university_list", "raw_text": "…"}
POST /api/admin/launch-post         {"tool_id": "…", "submitter_role": "…", …}
GET  /api/admin/stats
```

---

## Guardrails

Every guardrail lives in two places: as an instruction in the prompt and as a check in code. The prompt makes good behaviour likely; the code makes bad output impossible to ship.

**Catalogue only.** The prompt lists candidates by ID. Code strips any recommended ID that wasn't in the retrieved set — the model cannot invent a tool or a link.

**User text is data.** Reviews and questions sit inside `<reviews>` and `<question>` XML tags. The system prompt declares that text inside those tags is data and never an instruction. The bias check and moderation prompts do the same.

**Facts from rows.** Cost, limits, and scores are injected from the database. The model is instructed to quote them; code checks that any numeric claim in the answer matches the catalogue row.

**Say when unsure.** The model must return `no_good_match: true` rather than stretch a weak fit. Unverified tools must be flagged as such in the `why` field.

**Policy flags.** Tools with employer or assessment risk carry a `flag` field. The output schema requires a `watch_out` field, and code checks that flagged tools have a non-null `watch_out`.

**Budget, not truncation.** If the assembled prompt exceeds the token budget, code drops layers in a fixed order: oldest chat turns first, then review snippets, then the fifth retrieved tool. System rules and the question are never cut.

---

## Prompt testing

A golden set of ~50 real apprentice questions, each with an expected top tool, is run against every prompt change. The eval scores:

- Valid JSON returned
- All recommended IDs present in the retrieved set
- Correct top tool for the question
- Flags mentioned where required

A model grader scores tone and clarity on a sample; a person reviews a further sample weekly. Prompt templates are versioned files in the repo so every stored answer records which version produced it.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS SPA, no build step |
| Backend | FastAPI (Python 3.12+) |
| Database | PostgreSQL (in-memory dict for demo) |
| Queue | Redis (stubbed for demo) |
| LLM — Ask, Moderate, Bias | Anthropic API (`claude-sonnet-5-5` / `claude-haiku-4-5`) |
| LLM — Normalise, Launch | Nous Research Hermes (open weights, local) |

---

## Fonts and design

The UI uses [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) for display, [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body text and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for code and labels. Both themes (light and dark) are fully supported.
