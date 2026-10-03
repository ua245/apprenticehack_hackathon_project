import { useMemo, useState, type ReactNode } from "react";

type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  cost: string;
  score: number;
  votes: number;
  logo?: string;
  tone: string;
  featured?: boolean;
  role: string;
};

type Recommendation = Tool & { reason: string };

const tools: Tool[] = [
  {
    id: "claude",
    name: "Claude",
    category: "AI",
    description: "Explain complex ideas, review your work and turn rough thinking into a clear next step.",
    cost: "Freemium",
    score: 92,
    votes: 486,
    logo: "/logos/claude.svg",
    tone: "coral",
    featured: true,
    role: "All roles",
  },
  {
    id: "github",
    name: "GitHub (Student Plan)",
    category: "Dev & Data",
    description: "Version control, code review, project boards and a portfolio that grows with you.",
    cost: "Free",
    score: 93,
    votes: 421,
    logo: "/logos/github.svg",
    tone: "ink",
    featured: true,
    role: "Software",
  },
  {
    id: "bitwarden",
    name: "Bitwarden",
    category: "Security",
    description: "An open-source password manager with unlimited logins and devices, free forever.",
    cost: "Free",
    score: 96,
    votes: 397,
    logo: "/logos/bitwarden.svg",
    tone: "blue",
    featured: true,
    role: "All roles",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    description: "Notes, wikis, databases and task boards in one flexible workspace.",
    cost: "Freemium",
    score: 76,
    votes: 285,
    logo: "/logos/notion.svg",
    tone: "paper",
    role: "All roles",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "AI",
    description: "AI code completion inside your editor, free for verified students.",
    cost: "Free",
    score: 88,
    votes: 264,
    logo: "/logos/github-copilot.svg",
    tone: "violet",
    role: "Software",
  },
  {
    id: "loom",
    name: "Loom",
    category: "Communication",
    description: "Record quick screen and camera videos to explain things without another meeting.",
    cost: "Freemium",
    score: 81,
    votes: 219,
    logo: "/logos/loom.svg",
    tone: "purple",
    role: "All roles",
  },
  {
    id: "calendar",
    name: "Calendar Manager (Outlook/Teams, Google Calendar)",
    category: "Work & OTJ",
    description: "Protect study days, track off-the-job hours and keep work in the right lane.",
    cost: "Employer",
    score: 90,
    votes: 198,
    logo: "/logos/microsoft-outlook.svg",
    tone: "sky",
    role: "All roles",
  },
];

const additionalTools: Tool[] = [
  { id: "budget-tracker", name: "Budget Tracker (Google Sheets)", category: "Productivity", description: "A flexible spreadsheet template for planning spending, saving and apprenticeship costs.", cost: "Free", score: 84, votes: 176, tone: "paper", role: "All roles" },
  { id: "training-reminders", name: "Training Reminders", category: "Work & OTJ", description: "Built-in prompts to keep training milestones and review dates on track.", cost: "Included", score: 82, votes: 142, tone: "sky", role: "All roles" },
  { id: "assignment-reminders", name: "Assignment Reminders", category: "Work & OTJ", description: "Built-in deadline reminders for assignments, evidence and portfolio work.", cost: "Included", score: 85, votes: 189, tone: "coral", role: "All roles" },
  { id: "confluence", name: "Work Documentation Links (Confluence)", category: "Work & OTJ", description: "Keep project knowledge, processes and useful workplace links in one shared space.", cost: "Employer", score: 86, votes: 167, tone: "ink", role: "All roles" },
  { id: "proprietary-ai", name: "Proprietary AI Tools", category: "AI", description: "Approved workplace AI tools for secure, organisation-specific support.", cost: "Employer", score: 78, votes: 94, tone: "violet", role: "All roles" },
  { id: "jira", name: "Work Task Manager (Jira)", category: "Work & OTJ", description: "Plan work, follow delivery progress and understand agile project boards.", cost: "Employer", score: 87, votes: 211, tone: "blue", role: "Software" },
  { id: "teams", name: "Microsoft Teams", category: "Communication", description: "Chat, calls, meetings and shared files for staying connected at work.", cost: "Employer", score: 89, votes: 274, tone: "sky", role: "All roles" },
  { id: "outlook", name: "Outlook (Email)", category: "Communication", description: "Manage workplace email, calendars and meeting invitations.", cost: "Employer", score: 88, votes: 253, tone: "blue", role: "All roles" },
  { id: "loop", name: "Microsoft Loop", category: "Productivity", description: "Collaborative workspaces and live components for planning together.", cost: "Employer", score: 80, votes: 108, tone: "violet", role: "All roles" },
  { id: "chorus", name: "Chorus", category: "Work & OTJ", description: "A focused workspace for learning, feedback and progression conversations.", cost: "Employer", score: 77, votes: 81, tone: "coral", role: "All roles" },
  { id: "vscode", name: "VS Code", category: "Dev & Data", description: "A flexible code editor with extensions, debugging and integrated Git tools.", cost: "Free", score: 95, votes: 403, tone: "ink", role: "Software" },
  { id: "smart-assessor", name: "Smart Assessor", category: "Work & OTJ", description: "Collect evidence, receive feedback and track apprenticeship progress.", cost: "Employer", score: 83, votes: 156, tone: "teal", role: "All roles" },
  { id: "slack", name: "Slack", category: "Communication", description: "Organise team conversations into channels and searchable threads.", cost: "Freemium", score: 84, votes: 198, tone: "purple", role: "All roles" },
  { id: "luma", name: "Luma", category: "Productivity", description: "Find and organise events, workshops and community learning opportunities.", cost: "Freemium", score: 75, votes: 68, tone: "violet", role: "All roles" },
  { id: "kaggle", name: "Kaggle", category: "Dev & Data", description: "Learn data skills with datasets, notebooks and practical competitions.", cost: "Free", score: 89, votes: 246, tone: "blue", role: "Data" },
  { id: "hugging-face", name: "Hugging Face", category: "AI", description: "Explore models, datasets and demos for hands-on AI learning.", cost: "Freemium", score: 90, votes: 229, tone: "coral", role: "Data" },
  { id: "flowcv", name: "FlowCV", category: "Productivity", description: "Create and tailor a clear CV for placements, projects and next steps.", cost: "Freemium", score: 79, votes: 101, tone: "paper", role: "All roles" },
  { id: "cluely", name: "Cluely", category: "AI", description: "An AI meeting companion for notes, prompts and follow-up actions.", cost: "Freemium", score: 74, votes: 73, tone: "violet", role: "All roles" },
  { id: "notesnook", name: "Notesnook", category: "Productivity", description: "Private note-taking for study notes, reflections and useful references.", cost: "Freemium", score: 85, votes: 139, tone: "ink", role: "All roles" },
  { id: "rocketbook", name: "Rocketbook", category: "Productivity", description: "Capture handwritten notes and send them into your digital workflow.", cost: "Paid", score: 76, votes: 87, tone: "coral", role: "All roles" },
  { id: "borrowbox", name: "BorrowBox", category: "Productivity", description: "Borrow ebooks and audiobooks from your library for free.", cost: "Free", score: 81, votes: 116, tone: "paper", role: "All roles" },
  { id: "camo-studio", name: "Camo Studio", category: "Communication", description: "Use your phone as a high-quality webcam for remote meetings and demos.", cost: "Freemium", score: 79, votes: 64, tone: "sky", role: "All roles" },
  { id: "tailscale", name: "Tailscale", category: "Security", description: "Securely connect devices and services without exposing them publicly.", cost: "Freemium", score: 88, votes: 152, tone: "blue", role: "Software" },
  { id: "economist-espresso", name: "Economist Espresso", category: "Productivity", description: "A concise daily briefing to build commercial awareness and context.", cost: "Paid", score: 80, votes: 97, tone: "ink", role: "Business" },
  { id: "geteduroam", name: "GetEduRoam", category: "Productivity", description: "Connect eligible learners to secure education Wi-Fi while studying.", cost: "Free", score: 82, votes: 124, tone: "sky", role: "All roles" },
  { id: "google-colab", name: "Google Colab", category: "Dev & Data", description: "Run Python notebooks in the browser for data, AI and experimentation.", cost: "Free", score: 91, votes: 281, tone: "coral", role: "Data" },
];

tools.push(...additionalTools);

const categories = ["All tools", "AI", "Dev & Data", "Productivity", "Work & OTJ", "Communication", "Security"];

const apprenticeSkills = [
  { name: "Evidence & reflection", description: "Turn work into clear OTJ evidence, reflective notes and portfolio-ready examples." },
  { name: "Digital collaboration", description: "Communicate clearly in workplace tools, meetings and asynchronous updates." },
  { name: "Project delivery", description: "Plan tasks, manage priorities and contribute confidently to real delivery work." },
  { name: "Data & AI literacy", description: "Use data and AI tools responsibly, with checks for privacy, accuracy and policy." },
  { name: "Technical practice", description: "Build repeatable habits in coding, version control, debugging and documentation." },
  { name: "Career development", description: "Build a visible portfolio, learn from peers and prepare for progression conversations." },
];

const apprenticePeople = [
  { name: "Gus Cohen", organisation: "Amazon", url: "https://www.linkedin.com/in/gus-cohen-7415b32a6/", featured: true },
  { name: "Caden Cheong", organisation: "Amazon", url: "https://www.linkedin.com/in/cadencheong/", featured: true },
  { name: "Mali Shah", organisation: "Apprentice community", url: "https://www.linkedin.com/in/mali-shah/" },
  { name: "Lakshminarasimha Alagani", organisation: "Apprentice community", url: "https://www.linkedin.com/in/lakshminarasimha-alagani/" },
  { name: "Samia Valji", organisation: "Apprentice community", url: "https://www.linkedin.com/in/samia-valji-a72a45276/" },
  { name: "Kai Jie Martin Lin", organisation: "Apprentice community", url: "https://www.linkedin.com/in/kai-jie-martin-lin/" },
  { name: "Senoli R", organisation: "Apprentice community", url: "https://www.linkedin.com/in/senoli-r-4a9241346/?isSelfProfile=false" },
];

const toolWebsites: Record<string, string> = {
  claude: "https://claude.ai",
  github: "https://education.github.com/pack",
  bitwarden: "https://bitwarden.com",
  notion: "https://www.notion.so",
  copilot: "https://github.com/features/copilot",
  loom: "https://www.loom.com",
  calendar: "https://www.microsoft.com/microsoft-365/outlook/calendar",
  "budget-tracker": "https://docs.google.com/spreadsheets",
  "training-reminders": "https://support.microsoft.com/office/set-or-remove-reminders-7a992377-ca93-4ddd-a711-851ef3597925",
  "assignment-reminders": "https://support.microsoft.com/office/set-or-remove-reminders-7a992377-ca93-4ddd-a711-851ef3597925",
  confluence: "https://www.atlassian.com/software/confluence",
  "proprietary-ai": "https://www.microsoft.com/microsoft-365/copilot",
  jira: "https://www.atlassian.com/software/jira",
  teams: "https://www.microsoft.com/microsoft-teams",
  outlook: "https://www.microsoft.com/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook",
  loop: "https://loop.microsoft.com",
  chorus: "https://www.chorus.ai",
  vscode: "https://code.visualstudio.com",
  "smart-assessor": "https://www.smartassessor.co.uk",
  slack: "https://slack.com",
  luma: "https://lu.ma",
  kaggle: "https://www.kaggle.com",
  "hugging-face": "https://huggingface.co",
  flowcv: "https://flowcv.com",
  cluely: "https://cluely.com",
  notesnook: "https://notesnook.com",
  rocketbook: "https://getrocketbook.com",
  borrowbox: "https://www.borrowbox.com",
  "camo-studio": "https://camo.studio",
  tailscale: "https://tailscale.com",
  "economist-espresso": "https://www.economist.com/espresso",
  geteduroam: "https://geteduroam.app",
  "google-colab": "https://colab.research.google.com",
};

function Icon({
  name,
  size = 18,
}: {
  name: "search" | "spark" | "arrow" | "check" | "bookmark" | "menu" | "close" | "chevron" | "shield";
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    spark: <path d="M12 2 14.3 9.7 22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3L12 2Z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21V4.8Z" />,
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    shield: <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Zm-3-10 2 2 4-4" />,
  };
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <div className="brand" aria-label="Tools R Us">
      <span className="brand-mark">
        <span>T</span>
        <i />
      </span>
      <span className="brand-name">TOOLS—R—US</span>
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All tools");
  const [activeFeed, setActiveFeed] = useState("Featured");
  const [catalogueExpanded, setCatalogueExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAsk, setShowAsk] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submissionKind, setSubmissionKind] = useState("tool");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [askPrompt, setAskPrompt] = useState("");
  const [askRole, setAskRole] = useState("");
  const [askLevel, setAskLevel] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recommendationIds, setRecommendationIds] = useState<string[]>([]);

  const filteredTools = useMemo(() => {
    return tools
      .filter((tool) => activeCategory === "All tools" || tool.category === activeCategory)
      .filter((tool) => recommendationIds.length === 0 || recommendationIds.includes(tool.id))
      .filter((tool) => `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (activeFeed === "Top rated") return b.score - a.score;
        if (activeFeed === "Newest") return a.name.localeCompare(b.name);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [activeCategory, activeFeed, query, recommendationIds]);
  const visibleTools = catalogueExpanded ? filteredTools : filteredTools.slice(0, 7);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const findRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: askPrompt, role: askRole, level: askLevel, tools }),
      });
      const result = (await response.json()) as {
        error?: string;
        recommendations?: Array<{ id?: string; reason?: string }>;
      };

      if (!response.ok) throw new Error(result.error || "The AI guide is temporarily unavailable.");

      const selected = (result.recommendations || [])
        .map((recommendation) => {
          const tool = tools.find((entry) => entry.id === recommendation.id);
          return tool && typeof recommendation.reason === "string" ? { ...tool, reason: recommendation.reason } : null;
        })
        .filter((recommendation): recommendation is Recommendation => recommendation !== null);

      if (!selected.length) throw new Error("The AI guide did not return a catalogue recommendation.");
      setRecommendations(selected);
      setRecommendationIds(selected.map((tool) => tool.id));
      setActiveCategory("All tools");
      setActiveFeed("Top rated");
      setCatalogueExpanded(true);
      setShowAsk(false);
      requestAnimationFrame(() => scrollTo("catalogue"));
    } catch (error) {
      setRecommendations([]);
      setNotice(error instanceof Error ? error.message : "The AI guide is temporarily unavailable.");
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className={mobileOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
            <a className="active" href="#discover" onClick={() => setMobileOpen(false)}>
              Discover
            </a>
            <a href="#collections" onClick={() => setMobileOpen(false)}>
              Collections
            </a>
            <a href="#community" onClick={() => setMobileOpen(false)}>
              Community
            </a>
            <a href="#skills" onClick={() => setMobileOpen(false)}>
              Skills
            </a>
            <a href="#people" onClick={() => setMobileOpen(false)}>
              People
            </a>
            <a href="#about" onClick={() => setMobileOpen(false)}>
              About
            </a>
          </nav>
          <div className="header-actions">
            <button className="ask-nav" type="button" onClick={() => setShowAsk(true)}>
              <Icon name="spark" size={15} />
              Ask AI
            </button>
            <button className="submit-nav" type="button" onClick={() => setShowSubmit(true)}>
              Submit a tool
              <Icon name="arrow" size={15} />
            </button>
            <button
              className="menu-button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="discover">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-core">T</div>
            <span className="orbit-node node-one" />
            <span className="orbit-node node-two" />
          </div>
          <div className="hero-content">
            <div className="eyebrow">
              <span className="pulse" />
              Built with apprentices, for apprentices
            </div>
            <h1>
              Find the right tool.
              <br />
              <span>Do your best work.</span>
            </h1>
            <p>
              A community-tested catalogue of tools that actually help you learn, build and progress—without the
              sponsored noise.
            </p>
            <div className="hero-search">
              <Icon name="search" size={21} />
              <input
                aria-label="Search tools"
                placeholder="What are you trying to do?"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setRecommendationIds([]);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setCatalogueExpanded(true);
                  document.querySelector(".catalogue")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Search tools
                <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="quick-searches">
              <span>Popular:</span>
              {["Learn to code", "Track OTJ hours", "Stay organised"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                    setRecommendationIds([]);
                    setCatalogueExpanded(true);
                    scrollTo("catalogue");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            <span>01</span>
            <i />
            <span>DISCOVER</span>
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-item">
            <strong>20+</strong>
            <span>Verified tools</span>
          </div>
          <div className="trust-item">
            <strong>1,200</strong>
            <span>Apprentice reviews</span>
          </div>
          <div className="trust-item">
            <strong>100%</strong>
            <span>Independent</span>
          </div>
          <div className="trust-message">
            <Icon name="shield" size={19} />
            No affiliate links. No paid rankings. Just honest recommendations.
          </div>
        </section>

        <section className="catalogue" id="catalogue">
          <div className="section-heading">
            <div>
              <span className="section-kicker">CURATED DIRECTORY / 2025</span>
              <h2>Tools worth your time</h2>
            </div>
            <p>Ranked by apprentices who use them in real projects, real workplaces and real study sessions.</p>
          </div>

          <div className="category-scroller">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setRecommendationIds([]);
                  setCatalogueExpanded(true);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="content-grid">
            <div className="feed">
              <div className="feed-tabs">
                {["Featured", "Top rated", "Newest"].map((tab) => (
                  <button
                    className={activeFeed === tab ? "active" : ""}
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveFeed(tab);
                      setRecommendationIds([]);
                    }}
                  >
                    {tab}
                  </button>
                ))}
                <span>{visibleTools.length}{catalogueExpanded ? "" : ` of ${filteredTools.length}`} tools</span>
              </div>

              <div className="tool-list">
                {visibleTools.length ? (
                  visibleTools.map((tool, index) => {
                    const hasVoted = votes[tool.id];
                    return (
                      <article
                        className="tool-card"
                        key={tool.id}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          if ((event.target as HTMLElement).closest("button")) return;
                          window.location.assign(toolWebsites[tool.id]);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") window.location.assign(toolWebsites[tool.id]);
                        }}
                      >
                        <span className="rank">{String(index + 1).padStart(2, "0")}</span>
                        <div className={`tool-logo ${tool.tone}`}>
                          {tool.logo ? <img src={tool.logo} alt="" /> : <span className="tool-monogram">{tool.name.charAt(0)}</span>}
                        </div>
                        <div className="tool-copy">
                          <div className="tool-title-row">
                            <h3>{tool.name}</h3>
                            <span className="verified">
                              <Icon name="check" size={11} />
                              VERIFIED
                            </span>
                          </div>
                          <p>{tool.description}</p>
                          <div className="tool-meta">
                            <span>{tool.category}</span>
                            <i />
                            <span>{tool.cost}</span>
                            <i />
                            <span>{tool.role}</span>
                          </div>
                        </div>
                        <div className="card-actions">
                          <button
                            className={saved[tool.id] ? "save active" : "save"}
                            aria-label={`Save ${tool.name}`}
                            type="button"
                            onClick={() => setSaved((current) => ({ ...current, [tool.id]: !current[tool.id] }))}
                          >
                            <Icon name="bookmark" size={17} />
                          </button>
                          <button
                            className={hasVoted ? "vote active" : "vote"}
                            aria-label={`Upvote ${tool.name}`}
                            type="button"
                            onClick={() => setVotes((current) => ({ ...current, [tool.id]: !current[tool.id] }))}
                          >
                            <span className="vote-arrow">▲</span>
                            <strong>{tool.votes + (hasVoted ? 1 : 0)}</strong>
                          </button>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="empty-state">
                    <Icon name="search" size={28} />
                    <h3>No exact match yet</h3>
                    <p>Try a broader search, or ask the guide for a tailored recommendation.</p>
                    <button type="button" onClick={() => setShowAsk(true)}>
                      Ask the guide
                    </button>
                  </div>
                )}
              </div>

              <button
                className="load-more"
                type="button"
                onClick={() => {
                  setActiveCategory("All tools");
                  setActiveFeed("Newest");
                  setQuery("");
                  setRecommendationIds([]);
                  setCatalogueExpanded(true);
                  setNotice("Showing the full catalogue.");
                  scrollTo("catalogue");
                }}
              >
                Explore the full catalogue
                <Icon name="arrow" size={17} />
              </button>
            </div>

            <aside className="sidebar">
              <div className="guide-card">
                <div className="guide-topline">
                  <span className="guide-icon">
                    <Icon name="spark" size={17} />
                  </span>
                  <span>AI TOOL GUIDE</span>
                  <i>ONLINE</i>
                </div>
                <h3>Not sure what you need?</h3>
                <p>Describe the problem. We’ll only recommend tools from our verified catalogue.</p>
                <button type="button" onClick={() => setShowAsk(true)}>
                  Get a recommendation
                  <Icon name="arrow" size={17} />
                </button>
                <div className="guide-foot">
                  <span>CATALOGUE-ONLY RESULTS</span>
                  <span>NO INVENTED TOOLS</span>
                </div>
              </div>

              <div className="collection-card" id="collections">
                <span className="section-kicker">STARTER COLLECTION</span>
                <div className="collection-art">
                  <div className="mini-logo coral">
                    <img src="/logos/claude.svg" alt="Claude" />
                  </div>
                  <div className="mini-logo ink">
                    <img src="/logos/github.svg" alt="GitHub" />
                  </div>
                  <div className="mini-logo paper">
                    <img src="/logos/notion.svg" alt="Notion" />
                  </div>
                  <div className="mini-logo blue">
                    <img src="/logos/bitwarden.svg" alt="Bitwarden" />
                  </div>
                </div>
                <h3>The new apprentice stack</h3>
                <p>Eight essentials for your first 90 days.</p>
                <button type="button" onClick={() => scrollTo("collection-details")}>
                  View collection
                  <Icon name="chevron" size={16} />
                </button>
              </div>

              <form
                className="newsletter-card"
                onSubmit={(event) => {
                  event.preventDefault();
                  setNotice(`Thanks — ${email} is subscribed to the weekly tool update.`);
                  setEmail("");
                }}
              >
                <span>WEEKLY / NO NOISE</span>
                <h3>One useful tool, every Tuesday.</h3>
                <div>
                  <input
                    aria-label="Email address"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button aria-label="Subscribe" type="submit">
                    <Icon name="arrow" size={17} />
                  </button>
                </div>
              </form>
            </aside>
          </div>
        </section>

        <section className="catalogue information-section" id="collection-details">
          <div className="section-heading">
            <div>
              <span className="section-kicker">STARTER COLLECTION</span>
              <h2>The new apprentice stack</h2>
            </div>
            <p>A practical first toolkit for learning, collaborating and keeping your work secure.</p>
          </div>
          <div className="collection-summary">
            {tools.slice(0, 4).map((tool) => (
              <a href="#catalogue" key={tool.id} onClick={() => setQuery(tool.name)}>
                {tool.name}
              </a>
            ))}
          </div>
        </section>

        <section className="catalogue information-section" id="community">
          <div className="section-heading">
            <div>
              <span className="section-kicker">COMMUNITY</span>
              <h2>Built on practical experience</h2>
            </div>
            <p>Save useful tools, vote for the ones you trust and submit the resources that helped your apprenticeship.</p>
          </div>
          <button className="load-more" type="button" onClick={() => setShowSubmit(true)}>
            Submit a tool
            <Icon name="arrow" size={17} />
          </button>
        </section>

        <section className="catalogue information-section" id="skills">
          <div className="section-heading">
            <div>
              <span className="section-kicker">APPRENTICE SKILLS</span>
              <h2>Choose tools that build useful habits</h2>
            </div>
            <p>Every recommendation is framed around the skill it helps you practise, not just the feature list.</p>
          </div>
          <div className="skill-grid">
            {apprenticeSkills.map((skill) => (
              <article key={skill.name}>
                <span>SKILL</span>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="catalogue information-section" id="people">
          <div className="section-heading">
            <div>
              <span className="section-kicker">APPRENTICE RECOMMENDERS</span>
              <h2>Learn from people doing the work</h2>
            </div>
            <p>These profiles are shared as community links. Recommendations still need human verification before they affect the global catalogue.</p>
          </div>
          <div className="people-grid">
            {apprenticePeople.map((person) => (
              <a href={person.url} key={person.url} target="_blank" rel="noreferrer">
                <span className="profile-avatar" aria-hidden="true">
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                {person.featured && <span>FEATURED</span>}
                <strong>{person.name}</strong>
                <small>{person.organisation}</small>
                <em>View LinkedIn profile ↗</em>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer id="about">
        <Logo />
        <p>Independent tool discovery for the next generation of talent.</p>
        <div>
          <a href="#principles">Principles</a>
          <a href="#method">Methodology</a>
          <a href="https://github.com/ua245/apprenticehack_hackathon_project" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <span id="principles">© 2025 TOOLS—R—US</span>
        <span id="method">Tools are selected from community recommendations and ranked by apprentice feedback.</span>
      </footer>

      {notice && (
        <div className="app-notice" role="status">
          <span>{notice}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      {showAsk && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowAsk(false)}>
          <div className="ask-modal" role="dialog" aria-modal="true" aria-labelledby="ask-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label="Close" type="button" onClick={() => setShowAsk(false)}>
              <Icon name="close" />
            </button>
            <span className="modal-signal">
              <Icon name="spark" size={19} />
            </span>
            <span className="section-kicker">VERIFIED RECOMMENDATION ENGINE</span>
            <h2 id="ask-title">What are you trying to get done?</h2>
            <p>We’ll search the catalogue and recommend a fit—never invent a tool or a score.</p>
            <textarea
              autoFocus
              placeholder="For example: I need to organise evidence for my apprenticeship portfolio..."
              value={askPrompt}
              onChange={(event) => setAskPrompt(event.target.value)}
            />
            <div className="modal-fields">
              <select aria-label="Your role" value={askRole} onChange={(event) => setAskRole(event.target.value)}>
                <option value="" disabled>
                  Your role
                </option>
                <option>Software</option>
                <option>Data</option>
                <option>Business</option>
                <option>Finance</option>
                <option>Cyber</option>
              </select>
              <select aria-label="Your level" value={askLevel} onChange={(event) => setAskLevel(event.target.value)}>
                <option value="" disabled>
                  Apprenticeship level
                </option>
                <option>Level 3</option>
                <option>Level 4</option>
                <option>Level 5</option>
                <option>Level 6</option>
                <option>Level 7</option>
              </select>
            </div>
            <button
              className="modal-submit"
              type="button"
              onClick={() => {
                if (!askPrompt.trim()) {
                  setNotice("Tell us what you need help with before searching the catalogue.");
                  return;
                }
                void findRecommendations();
              }}
            >
              Find my tools
              <Icon name="arrow" size={18} />
            </button>
            {recommendations.length > 0 && (
              <div className="recommendations" aria-live="polite">
                <strong>Best matches for your {askLevel || "apprenticeship"}:</strong>
                {recommendations.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => {
                      setQuery(tool.name);
                      setShowAsk(false);
                      scrollTo("catalogue");
                    }}
                  >
                    <span>
                      {tool.name} <em>{tool.category}</em>
                    </span>
                    <span>{tool.reason}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showSubmit && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowSubmit(false)}>
          <form
            className="ask-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-title"
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              setShowSubmit(false);
              setNotice(`Thanks. This ${submissionKind === "tool" ? "tool" : "profile"} link is now awaiting human review.`);
            }}
          >
            <button className="modal-close" aria-label="Close" type="button" onClick={() => setShowSubmit(false)}>
              <Icon name="close" />
            </button>
            <span className="section-kicker">COMMUNITY CONTRIBUTION</span>
            <h2 id="submit-title">Submit a useful link</h2>
            <p>Submit a tool website or an apprentice profile. Links are placed in the human review queue and never appear globally without approval.</p>
            <select
              aria-label="Submission type"
              value={submissionKind}
              onChange={(event) => setSubmissionKind(event.target.value)}
            >
              <option value="tool">Tool website</option>
              <option value="person">Apprentice profile</option>
            </select>
            <input
              aria-label={submissionKind === "tool" ? "Tool name" : "Person name"}
              placeholder={submissionKind === "tool" ? "Tool name" : "Person name"}
              required
            />
            <input
              aria-label={submissionKind === "tool" ? "Tool website" : "Profile URL"}
              placeholder="https://example.com"
              type="url"
              required
            />
            <textarea
              aria-label="Why should this be added?"
              placeholder={submissionKind === "tool" ? "What problem does it help apprentices solve?" : "Why should this profile be featured?"}
              required
            />
            <button className="modal-submit" type="submit">
              Send for review
              <Icon name="arrow" size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
