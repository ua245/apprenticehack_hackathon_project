CATALOGUE = [
    # ── AI ──────────────────────────────────────────────────────────────────
    {
        "id": "t_claude", "category": "AI", "name": "Claude",
        "cost": "freemium", "roles": ["all"], "usefulness": 5, "learning": 5, "recommend_pct": 92,
        "desc": "Conversational AI for explaining concepts, drafting and reviewing work.",
        "limits": "Free plan usage limits reset after a few hours",
        "flag": "Check your provider's AI policy before using it on assessed work",
        "verified": True,
        "keywords": "ai assistant coursework assessed explain code learn writing draft review",
    },
    {
        "id": "t_chatgpt", "category": "AI", "name": "ChatGPT",
        "cost": "freemium", "roles": ["all"], "usefulness": 5, "learning": 4, "recommend_pct": 89,
        "desc": "General-purpose AI assistant from OpenAI. GPT-4o on the free plan.",
        "limits": "GPT-4 in paid plan; free tier uses GPT-4o with rate limits",
        "flag": "Check your provider's AI policy before using it on assessed work",
        "verified": True,
        "keywords": "ai assistant chatbot gpt openai coursework explain help writing",
    },
    {
        "id": "t_copilot", "category": "AI", "name": "GitHub Copilot",
        "cost": "free", "roles": ["software", "data"], "usefulness": 5, "learning": 5, "recommend_pct": 88,
        "desc": "AI code completion inside VS Code and JetBrains. Free for verified students.",
        "limits": "Free with GitHub Education pack; verify your student email",
        "flag": None,
        "verified": True,
        "keywords": "code ai autocomplete editor github students programming copilot",
    },
    # ── Dev & Data ──────────────────────────────────────────────────────────
    {
        "id": "t_colab", "category": "Dev & Data", "name": "Google Colab",
        "cost": "freemium", "roles": ["data", "software"], "usefulness": 5, "learning": 5, "recommend_pct": 91,
        "desc": "Python notebooks with free GPU in the browser. No local setup needed.",
        "limits": "Free GPU time is limited; idle sessions time out after 90 min",
        "flag": None,
        "verified": True,
        "keywords": "python notebook gpu ml machine learning jupyter browser locked laptop data science",
    },
    {
        "id": "t_kaggle", "category": "Dev & Data", "name": "Kaggle",
        "cost": "free", "roles": ["data"], "usefulness": 4, "learning": 5, "recommend_pct": 88,
        "desc": "Free notebooks, datasets, short courses and ML competitions.",
        "limits": "Weekly GPU/TPU quotas; 30 hrs GPU per week",
        "flag": None,
        "verified": True,
        "keywords": "python notebook gpu datasets ml competition data practice courses free",
    },
    {
        "id": "t_vscode", "category": "Dev & Data", "name": "VS Code",
        "cost": "free", "roles": ["software", "data"], "usefulness": 5, "learning": 4, "recommend_pct": 94,
        "desc": "The de-facto standard code editor. Extensions for every language.",
        "limits": "Free; some extensions need separate accounts",
        "flag": None,
        "verified": True,
        "keywords": "code editor python notebook coding ide vscode programming",
    },
    {
        "id": "t_github", "category": "Dev & Data", "name": "GitHub",
        "cost": "free", "roles": ["software", "data"], "usefulness": 5, "learning": 4, "recommend_pct": 93,
        "desc": "Version control, code review, project boards and your portfolio.",
        "limits": "Free for public and private repos; Actions minutes limited on free",
        "flag": None,
        "verified": True,
        "keywords": "git version control code repo github portfolio projects pull request review",
    },
    {
        "id": "t_hf", "category": "Dev & Data", "name": "Hugging Face",
        "cost": "freemium", "roles": ["data", "software"], "usefulness": 4, "learning": 5, "recommend_pct": 84,
        "desc": "Host and share ML models, datasets and interactive Spaces demos.",
        "limits": "Free tier covers most needs; paid hardware for bigger Spaces",
        "flag": None,
        "verified": True,
        "keywords": "models ml ai demo gpu datasets portfolio hugging face transformers",
    },
    {
        "id": "t_tableau", "category": "Dev & Data", "name": "Tableau Public",
        "cost": "free", "roles": ["data", "business"], "usefulness": 4, "learning": 4, "recommend_pct": 79,
        "desc": "Drag-and-drop data visualisation. Publish interactive charts for free.",
        "limits": "Dashboards are public; no private workbooks on free plan",
        "flag": None,
        "verified": True,
        "keywords": "data visualisation charts dashboards tableau business analytics viz",
    },
    # ── Productivity & Notes ────────────────────────────────────────────────
    {
        "id": "t_notion", "category": "Productivity", "name": "Notion",
        "cost": "freemium", "roles": ["all"], "usefulness": 4, "learning": 4, "recommend_pct": 76,
        "desc": "Free-form notes, wikis, databases and task boards in one workspace.",
        "limits": "Free plan is generous; education plan with .ac.uk email",
        "flag": None,
        "verified": True,
        "keywords": "notes uni search organise revision free wiki database productivity",
    },
    {
        "id": "t_obsidian", "category": "Productivity", "name": "Obsidian",
        "cost": "free", "roles": ["all"], "usefulness": 4, "learning": 4, "recommend_pct": 80,
        "desc": "Local Markdown notes with backlinks and a graph view of your knowledge.",
        "limits": "Free for personal use; Sync and Publish are paid add-ons",
        "flag": None,
        "verified": True,
        "keywords": "notes markdown local private graph links knowledge management second brain",
    },
    {
        "id": "t_nn", "category": "Productivity", "name": "Notesnook",
        "cost": "freemium", "roles": ["all"], "usefulness": 4, "learning": 3, "recommend_pct": 77,
        "desc": "End-to-end encrypted notes when privacy matters. Open source.",
        "limits": "Free plan with limits on attachments and devices",
        "flag": None,
        "verified": True,
        "keywords": "notes encrypted private search free secure privacy",
    },
    {
        "id": "t_anki", "category": "Productivity", "name": "Anki",
        "cost": "free", "roles": ["all"], "usefulness": 5, "learning": 5, "recommend_pct": 91,
        "desc": "Spaced-repetition flashcards that adapt to what you're forgetting.",
        "limits": "Free on all platforms; AnkiMobile (iOS) is paid",
        "flag": None,
        "verified": True,
        "keywords": "revision flashcards spaced repetition memory study exams learning recall",
    },
    {
        "id": "t_miro", "category": "Productivity", "name": "Miro",
        "cost": "freemium", "roles": ["business", "software"], "usefulness": 4, "learning": 3, "recommend_pct": 74,
        "desc": "Infinite whiteboard for diagrams, planning and remote workshops.",
        "limits": "3 boards on free plan; collaborators limited",
        "flag": None,
        "verified": True,
        "keywords": "whiteboard diagrams planning workshops brainstorm collaboration flowchart",
    },
    # ── Work & OTJ ──────────────────────────────────────────────────────────
    {
        "id": "t_smart", "category": "Work & OTJ", "name": "Smart Assessor",
        "cost": "employer", "roles": ["all"], "usefulness": 3, "learning": 2, "recommend_pct": 40,
        "desc": "Portfolio and off-the-job evidence tracker from most training providers.",
        "limits": "Provided by your training provider — you can't choose it",
        "flag": None,
        "verified": True,
        "keywords": "otj off the job hours portfolio evidence log assessor review track apprenticeship",
    },
    {
        "id": "t_cal", "category": "Work & OTJ", "name": "Outlook / Teams Calendar",
        "cost": "employer", "roles": ["all"], "usefulness": 5, "learning": 2, "recommend_pct": 90,
        "desc": "Block study days, track OTJ hours and avoid people booking you in on uni days.",
        "limits": "Work/personal calendar sync is often blocked by IT",
        "flag": None,
        "verified": True,
        "keywords": "calendar otj hours schedule uni days track time reminders outlook teams blocks",
    },
    {
        "id": "t_planner", "category": "Work & OTJ", "name": "Microsoft Planner",
        "cost": "employer", "roles": ["all"], "usefulness": 3, "learning": 2, "recommend_pct": 68,
        "desc": "Simple Kanban boards built into Teams and Microsoft 365.",
        "limits": "Requires employer Microsoft 365 licence",
        "flag": None,
        "verified": True,
        "keywords": "kanban tasks planner project management teams m365 todo sprint",
    },
    # ── Security & Identity ─────────────────────────────────────────────────
    {
        "id": "t_bw", "category": "Security", "name": "Bitwarden",
        "cost": "free", "roles": ["all"], "usefulness": 5, "learning": 2, "recommend_pct": 96,
        "desc": "Open-source password manager. Unlimited logins, devices and sharing — free forever.",
        "limits": "Premium is £8/yr and adds advanced 2FA; free covers everything you need",
        "flag": "Some employers mandate their own password manager — check first",
        "verified": True,
        "keywords": "passwords password manager logins security forget browser extension 2fa",
    },
    # ── Communication ────────────────────────────────────────────────────────
    {
        "id": "t_slack", "category": "Communication", "name": "Slack",
        "cost": "employer", "roles": ["all"], "usefulness": 4, "learning": 2, "recommend_pct": 78,
        "desc": "Channels-based messaging. Most tech employers use it alongside Teams.",
        "limits": "Usually employer-provided; personal free plan limits message history",
        "flag": None,
        "verified": True,
        "keywords": "chat messaging channels workplace communication slack teams async",
    },
    {
        "id": "t_loom", "category": "Communication", "name": "Loom",
        "cost": "freemium", "roles": ["all"], "usefulness": 4, "learning": 3, "recommend_pct": 81,
        "desc": "Record quick screen + camera videos to explain things async. Beats a long email.",
        "limits": "Free plan: 25 videos, 5 min each",
        "flag": None,
        "verified": True,
        "keywords": "screen record video async communication walkthrough demo loom explain",
    },
]

CATEGORIES = sorted({t["category"] for t in CATALOGUE})


def retrieve_tools(question: str, role: str | None = None, limit: int = 5) -> list[dict]:
    words = [w for w in question.lower().split() if len(w) > 2]
    scored = []
    for t in CATALOGUE:
        s = sum(1 for w in words if w in t["keywords"])
        if role and (role in t["roles"] or "all" in t["roles"]):
            s += 0.5
        s += t["recommend_pct"] / 200
        if s > 1:
            scored.append((s, t))
    scored.sort(key=lambda x: -x[0])
    return [t for _, t in scored[:limit]]
