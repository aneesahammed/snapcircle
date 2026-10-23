import { useEffect, useLayoutEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Hero1 } from "@/components/hero1";

const principles = [
  [
    "01 / Clarity",
    "Make complexity navigable.",
    "Give people better ways to ask questions and understand the systems behind their work.",
    "clarity",
  ],
  [
    "02 / Rigour",
    "Engineer for confidence.",
    "Put rules, useful context and validation between a model’s suggestion and a business decision.",
    "rigour",
  ],
  [
    "03 / Accountability",
    "Make answers inspectable.",
    "Keep the reasoning and calculations visible so teams can check an answer before they rely on it.",
    "accountability",
  ],
];

const stratumSteps = [
  ["01", "Understand", "Translate a question into governed business concepts."],
  ["02", "Plan", "Shape an approach within known data and metric boundaries."],
  ["03", "Validate", "Check the query before it reaches source data."],
  ["04", "Explain", "Connect an answer back to its calculation and evidence."],
];

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Snap Circle home">
      <svg
        className="brand-symbol"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="55 16"
          transform="rotate(-43 20 20)"
        />
        <circle cx="20" cy="20" r="3.3" fill="currentColor" />
      </svg>
      <span>
        snapcircle<span className="brand-period">.</span>
      </span>
    </a>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const Icon = theme === "dark" ? SunIcon : MoonIcon;
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Icon width={16} height={16} aria-hidden="true" />
    </button>
  );
}

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header wrap" id="top">
      <BrandMark />
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? (
          <Cross2Icon width={20} height={20} />
        ) : (
          <HamburgerMenuIcon width={20} height={20} />
        )}
      </button>
      <nav
        className={`navigation${menuOpen ? " navigation-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a href="#approach" onClick={closeMenu}>
          Approach
        </a>
        <a href="#finqry" onClick={closeMenu}>
          finQuery
        </a>
        <a href="#work" onClick={closeMenu}>
          Our work
        </a>
        <a href="#company" onClick={closeMenu}>
          Company
        </a>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <a className="nav-contact" href="#contact" onClick={closeMenu}>
          Get in touch <ArrowTopRightIcon width={14} height={14} />
        </a>
      </nav>
    </header>
  );
}

function SectionMeta({ first, second, dark = false }) {
  return (
    <div className={`section-meta${dark ? " section-meta-dark" : ""}`}>
      <span>{first}</span>
      <span>{second}</span>
    </div>
  );
}

function PrincipleMark({ variant }) {
  return (
    <svg
      className={`principle-mark principle-mark-${variant}`}
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {variant === "clarity" && (
        <>
          <circle cx="28" cy="28" r="19" />
          <circle cx="28" cy="28" r="10" />
          <circle cx="28" cy="28" r="2.5" fill="currentColor" stroke="none" />
        </>
      )}
      {variant === "rigour" && (
        <>
          <path d="M28 5 46 15.5v21L28 47 10 36.5v-21L28 5Z" />
          <path d="m19 27 6 6 13-14" />
        </>
      )}
      {variant === "accountability" && (
        <>
          <path d="M19 18h17v17H19zM34 35h14v14H34z" />
          <circle cx="45" cy="16" r="7" />
          <path d="M36 20h5M27 35v8h7M36 27v8" />
          <path d="M7 9h17v17H7z" />
        </>
      )}
    </svg>
  );
}

function DoodleMark() {
  return (
    <svg
      className="doodle-mark"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="doodle-trail"
        d="M5 34c5-8 11-4 15-11 3-5 2-11 8-15 5-3 9 2 5 6-3 3-7-1-4-4"
      />
      <path d="M34 32c4-3 7-2 10-6M38 22l6 4-1 7" />
      <path d="m15 8 1.5 4.5L21 14l-4.5 1.5L15 20l-1.5-4.5L9 14l4.5-1.5L15 8Z" />
    </svg>
  );
}

function ApproachSection() {
  return (
    <section
      className="approach-section section-wrap"
      id="approach"
      aria-labelledby="approach-title"
    >
      <SectionMeta
        first="Our point of view"
        second="Clarity before complexity"
      />
      <div className="approach-layout">
        <h2 id="approach-title">
          Good software solves hard problems.
          <br />
          <span className="approach-emphasis">
            Great software feels clear.
            <DoodleMark />
          </span>
        </h2>
        <p>
          We believe the best tools have depth behind them and simplicity in
          front. That idea guides everything we make.
        </p>
      </div>
      <div className="principles-list">
        {principles.map(([eyebrow, title, description, mark]) => (
          <article className="principle-row" key={eyebrow}>
            <span className="principle-kicker">{eyebrow}</span>
            <PrincipleMark variant={mark} />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinQuerySection() {
  return (
    <section
      className="finquery-section section-wrap"
      id="finqry"
      aria-labelledby="finquery-title"
    >
      <SectionMeta
        first="01 / Featured initiative"
        second={
          <>
            <i className="status-dot" /> In development
          </>
        }
      />
      <div className="finquery-layout">
        <div className="finquery-copy">
          <p className="product-wordmark">
            fin<span>Query</span>
          </p>
          <h2 id="finquery-title">See the story behind cloud spend.</h2>
          <p className="section-copy">
            We’re developing a clearer way for teams to investigate cloud costs.
            Ask a question in natural language, follow the evidence and
            understand how an answer was reached.
          </p>
          <a className="inline-link" href="#stratum">
            Meet the foundation <ArrowRightIcon width={15} height={15} />
          </a>
          <p className="small-note">
            finQuery is an initiative in development. The interface shown here
            is illustrative.
          </p>
        </div>
        <div
          className="finquery-figure"
          role="img"
          aria-label="Illustrative chart showing a cloud spending trend"
        >
          <div className="figure-heading">
            <span>FINANCIAL INTELLIGENCE</span>
            <span>FIG. 01</span>
          </div>
          <div className="figure-chart">
            <div className="chart-axis">
              <span>Spend</span>
              <span>Time</span>
            </div>
            <svg
              viewBox="0 0 520 220"
              role="img"
              aria-label="Illustrative trend line"
            >
              <path
                className="chart-gridline"
                d="M0 30H520M0 80H520M0 130H520M0 180H520"
              />
              <path
                className="chart-area"
                d="M0 156C50 144 52 111 108 120S166 153 215 129s63-70 112-51 60 20 88-7 54-11 105-47v196H0z"
              />
              <path
                className="chart-line"
                d="M0 156C50 144 52 111 108 120S166 153 215 129s63-70 112-51 60 20 88-7 54-11 105-47"
              />
              <circle className="chart-point" cx="415" cy="71" r="5" />
            </svg>
            <div className="chart-legend">
              <span>
                <i />
                Current period
              </span>
              <span>
                <i />
                Previous period
              </span>
            </div>
          </div>
          <div className="figure-foot">
            <span>Illustrative workflow</span>
            <span>Questions, context, evidence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StratumSection() {
  return (
    <section
      className="stratum-section"
      id="stratum"
      aria-labelledby="stratum-title"
    >
      <div className="section-wrap stratum-layout">
        <div className="stratum-intro">
          <SectionMeta
            first="02 / Under the surface"
            second="Technology foundation"
            dark
          />
          <p className="stratum-overline">A foundation for finQuery</p>
          <h2 id="stratum-title">
            Stratum
            <br />
            Core<span>.</span>
          </h2>
          <p className="stratum-copy">
            The developing core behind finQuery, designed to connect
            natural-language questions to data that can support a clear,
            governed answer.
          </p>
          <a className="stratum-link" href="#company">
            Our approach <ArrowDownIcon width={15} height={15} />
          </a>
        </div>
        <div
          className="stratum-process"
          aria-label="Illustrative Stratum Core workflow"
        >
          {stratumSteps.map(([number, title, description]) => (
            <div className="process-row" key={number}>
              <span className="process-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowTopRightIcon width={15} height={15} aria-hidden="true" />
            </div>
          ))}
          <p className="process-caption">
            A developing approach to governed, explainable analytics.
          </p>
        </div>
      </div>
    </section>
  );
}

function InqryArtwork() {
  return (
    <div className="inqry-art" aria-hidden="true">
      <div className="art-topline">
        <span>INQRY / CUSTOMER SUPPORT</span>
        <span>01</span>
      </div>
      <div className="chat-scene">
        <div className="chat-question">
          Where can I find your return policy?
        </div>
        <div className="chat-answer">
          <span className="chat-spark">i</span>
          <span>
            I can help you find the right information in the help centre.
          </span>
        </div>
      </div>
      <div className="art-bottomline">
        <span className="signal-dot" />
        Answers grounded in your content
      </div>
    </div>
  );
}

function TinycraftsArtwork() {
  const tools = [
    ["Sentinel", "Developer logs", "https://sentinel.tinycrafts.ai/"],
    ["DataDuck", "Data explorer", "https://tinycrafts.ai/dataduck/"],
    ["markV", "Markdown viewer", "https://tinycrafts.ai/markv/"],
  ];
  return (
    <div className="tiny-art">
      <div className="art-topline">
        <span>TINYCRAFTS / TOOL INDEX</span>
        <span>02</span>
      </div>
      {tools.map(([name, label, href], index) => (
        <a
          className="tool-row"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name}, ${label} (opens in a new tab)`}
          key={name}
        >
          <span>0{index + 1}</span>
          <strong>{name}</strong>
          <span>{label}</span>
          <ArrowTopRightIcon width={14} height={14} aria-hidden="true" />
          <span className="sr-only">Opens in a new tab</span>
        </a>
      ))}
      <div className="art-bottomline">SMALL TOOLS / ONE JOB EACH</div>
    </div>
  );
}

function PortfolioSection() {
  return (
    <section
      className="portfolio-section section-wrap"
      id="work"
      aria-labelledby="portfolio-title"
    >
      <SectionMeta
        first="03 / Other initiatives"
        second="Different problems, considered solutions"
      />
      <div className="portfolio-heading">
        <h2 id="portfolio-title">
          Useful work,
          <br />
          in its own shape.
        </h2>
        <p>
          Alongside our featured initiative, we explore customer support and
          small tools for people who build.
        </p>
      </div>
      <div className="portfolio-grid">
        <article className="portfolio-item inqry-item">
          <InqryArtwork />
          <div className="portfolio-item-meta">
            <span>AI / Customer experience</span>
            <span>01</span>
          </div>
          <h3>
            inQry<span>.</span>
          </h3>
          <p>
            AI support that helps businesses answer customer questions using
            their own knowledge and content.
          </p>
          <a
            href="https://inqry.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Visit inqry.ai <ArrowTopRightIcon width={15} height={15} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
        <article className="portfolio-item tiny-item">
          <TinycraftsArtwork />
          <div className="portfolio-item-meta">
            <span>Maker studio / Developer tools</span>
            <span>02</span>
          </div>
          <h3>
            Tinycrafts<span>.</span>
          </h3>
          <p>
            Focused developer utilities, made with a preference for simplicity,
            speed and useful details.
          </p>
          <a
            href="https://tinycrafts.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Visit tinycrafts.ai <ArrowTopRightIcon width={15} height={15} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
      </div>
    </section>
  );
}

function CompanySection() {
  return (
    <section
      className="company-section section-wrap"
      id="company"
      aria-labelledby="company-title"
    >
      <SectionMeta first="04 / Snapcircle Limited" second="Dublin, Ireland" />
      <div className="company-layout">
        <div>
          <h2 id="company-title">
            Small by design.
            <br />
            <span>Ambitious in thought.</span>
          </h2>
        </div>
        <div className="company-copy">
          <p>
            Snapcircle Limited is an independent software company based in
            Dublin. We build focused products across financial intelligence,
            customer experience and developer tooling, with a shared emphasis on
            thoughtful design and sound engineering.
          </p>
          <p>
            Our initiatives are at different stages and keep their own
            character. What connects them is care for the work and respect for
            the people who rely on it.
          </p>
          <div className="company-details">
            <span>
              <i />
              Registered in Ireland
            </span>
            <span>Company no. 675788</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="section-wrap footer-inner">
        <div className="footer-cta">
          <div>
            <p className="section-label">Have a thoughtful problem to solve?</p>
            <h2>Start a conversation.</h2>
          </div>
          <a
            className="button button-footer"
            href="mailto:hello@snapcircle.io?subject=Hello%20Snap%20Circle"
          >
            Get in touch <ArrowRightIcon width={16} height={16} />
          </a>
        </div>
        <div className="footer-base">
          <div>
            <BrandMark />
            <p>
              Independent software company.
              <br />
              Thoughtfully engineered in Dublin.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#finqry">finQuery</a>
            <a href="#stratum">Stratum Core</a>
            <a href="#work">Our work</a>
            <a href="#company">Company</a>
          </nav>
          <span>
            © {new Date().getFullYear()} Snapcircle Limited · Company no. 675788
          </span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("snapcircle-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("snapcircle-theme", theme);
  }, [theme]);

  return (
    <div className="site-shell">
      <Header
        theme={theme}
        onThemeToggle={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <main>
        <div className="hero-shell">
          <div className="section-wrap">
            <Hero1 />
          </div>
        </div>
        <ApproachSection />
        <FinQuerySection />
        <StratumSection />
        <PortfolioSection />
        <CompanySection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
