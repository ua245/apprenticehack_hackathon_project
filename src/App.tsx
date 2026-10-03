import { useMemo, useState, type ReactNode } from "react";

type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  cost: string;
  score: number;
  votes: number;
  logo: string;
  tone: string;
  featured?: boolean;
  role: string;
};

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
    name: "GitHub",
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
    name: "Outlook Calendar",
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

const categories = ["All tools", "AI", "Dev & Data", "Productivity", "Work & OTJ", "Security"];

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
  const [query, setQuery] = useState("");
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAsk, setShowAsk] = useState(false);

  const visibleTools = useMemo(() => {
    return tools
      .filter((tool) => activeCategory === "All tools" || tool.category === activeCategory)
      .filter((tool) => `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (activeFeed === "Top rated") return b.score - a.score;
        if (activeFeed === "Newest") return a.name.localeCompare(b.name);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [activeCategory, activeFeed, query]);

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
            <a href="#about" onClick={() => setMobileOpen(false)}>
              About
            </a>
          </nav>
          <div className="header-actions">
            <button className="ask-nav" type="button" onClick={() => setShowAsk(true)}>
              <Icon name="spark" size={15} />
              Ask AI
            </button>
            <button className="submit-nav" type="button">
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
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" onClick={() => document.querySelector(".catalogue")?.scrollIntoView({ behavior: "smooth" })}>
                Search tools
                <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="quick-searches">
              <span>Popular:</span>
              {["Learn to code", "Track OTJ hours", "Stay organised"].map((item) => (
                <button key={item} type="button" onClick={() => setQuery(item)}>
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

        <section className="catalogue">
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
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="content-grid">
            <div className="feed">
              <div className="feed-tabs">
                {["Featured", "Top rated", "Newest"].map((tab) => (
                  <button className={activeFeed === tab ? "active" : ""} key={tab} type="button" onClick={() => setActiveFeed(tab)}>
                    {tab}
                  </button>
                ))}
                <span>{visibleTools.length} tools</span>
              </div>

              <div className="tool-list">
                {visibleTools.length ? (
                  visibleTools.map((tool, index) => {
                    const hasVoted = votes[tool.id];
                    return (
                      <article className="tool-card" key={tool.id}>
                        <span className="rank">{String(index + 1).padStart(2, "0")}</span>
                        <div className={`tool-logo ${tool.tone}`}>
                          <img src={tool.logo} alt="" />
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

              <button className="load-more" type="button">
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
                <button type="button">
                  View collection
                  <Icon name="chevron" size={16} />
                </button>
              </div>

              <div className="newsletter-card">
                <span>WEEKLY / NO NOISE</span>
                <h3>One useful tool, every Tuesday.</h3>
                <div>
                  <input aria-label="Email address" placeholder="you@example.com" type="email" />
                  <button aria-label="Subscribe" type="button">
                    <Icon name="arrow" size={17} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer id="about">
        <Logo />
        <p>Independent tool discovery for the next generation of talent.</p>
        <div>
          <a href="#principles">Principles</a>
          <a href="#method">Methodology</a>
          <a href="#github">GitHub</a>
        </div>
        <span>© 2025 TOOLS—R—US</span>
      </footer>

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
            <textarea autoFocus placeholder="For example: I need to organise evidence for my apprenticeship portfolio..." />
            <div className="modal-fields">
              <select aria-label="Your role" defaultValue="">
                <option value="" disabled>
                  Your role
                </option>
                <option>Software</option>
                <option>Data</option>
                <option>Business</option>
                <option>Finance</option>
                <option>Cyber</option>
              </select>
              <select aria-label="Your level" defaultValue="">
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
            <button className="modal-submit" type="button">
              Find my tools
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
