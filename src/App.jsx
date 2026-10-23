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
import { FinQryPreview } from "@/components/FinQryPreview";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Snapcircle home">
      <svg
        className="brand-mark"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M20 4a16 16 0 0 1 0 32"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle cx="20" cy="20" r="2.4" fill="currentColor" />
      </svg>
      <span>
        snapcircle<span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;
  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <Brand />
        <button
          className="menu-toggle icon-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
        </button>
        <nav
          className={"navigation" + (menuOpen ? " navigation-open" : "")}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#method" onClick={closeMenu}>
            Method
          </a>
          <a href="#studio" onClick={closeMenu}>
            Studio
          </a>
          <button
            className="theme-toggle icon-button"
            type="button"
            onClick={onThemeToggle}
            aria-label={
              "Switch to " + (theme === "dark" ? "light" : "dark") + " theme"
            }
            title={
              "Switch to " + (theme === "dark" ? "light" : "dark") + " theme"
            }
          >
            <ThemeIcon width={17} height={17} aria-hidden="true" />
          </button>
          <a
            className="nav-contact"
            href="mailto:hello@snapcircle.io?subject=Hello%20Snap%20Circle"
            onClick={closeMenu}
          >
            Let’s talk{" "}
            <ArrowTopRightIcon width={16} height={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Eyebrow({ index, children, inverse = false }) {
  return (
    <div className={"eyebrow" + (inverse ? " eyebrow-inverse" : "")}>
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function FeaturedWork() {
  return (
    <section
      className="featured-section section-pad"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <Eyebrow index="01 / SELECTED WORK">From our studio</Eyebrow>
        <div className="section-heading-row">
          <h2 id="work-title">
            Built around <span className="accent-word">real questions.</span>
          </h2>
          <p>
            Different products, one standard: make the work easier to understand
            and the outcome easier to trust.
          </p>
        </div>
        <article className="featured-product" id="finqry">
          <div className="featured-copy">
            <div className="product-index">
              <span>01</span>
              <span>IN DEVELOPMENT</span>
            </div>
            <p className="product-category">Cloud financial intelligence</p>
            <h3>
              fin<span>Qry</span>
              <i>.</i>
            </h3>
            <p className="featured-description">
              Cloud costs create questions faster than dashboards can answer
              them. finQry is being built to help teams ask what changed,
              follow the evidence, and see how an answer was reached.
            </p>
            <a className="text-link" href="#method">
              Explore the thinking <ArrowRightIcon aria-hidden="true" />
            </a>
            <p className="product-disclaimer">
              Interactive preview with illustrative data.
            </p>
          </div>
          <FinQryPreview />
        </article>
        <div className="other-work-heading">
          <span>MORE FROM SNAP CIRCLE</span>
          <span>02—03</span>
        </div>
        <div className="work-grid">
          <article className="work-card inqry-card">
            <div className="card-art inqry-art" aria-hidden="true">
              <div className="card-art-top">
                <span>INQRY</span>
                <span>CONVERSATIONS, MADE USEFUL.</span>
              </div>
              <div className="inqry-glyph">
                i<span>?</span>
              </div>
              <div className="card-art-bottom">
                <span>KNOWLEDGE IN / ANSWERS OUT</span>
                <span>02 / 03</span>
              </div>
            </div>
            <div className="work-card-info">
              <div>
                <p className="product-category">Customer experience</p>
                <h3>
                  inQry<span>.</span>
                </h3>
              </div>
              <a
                className="round-link"
                href="https://inqry.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit inQry, opens in a new tab"
              >
                <ArrowTopRightIcon aria-hidden="true" />
              </a>
            </div>
            <p>
              AI support that helps businesses answer customer questions using
              their own knowledge and content.
            </p>
          </article>
          <article className="work-card tiny-card">
            <div className="card-art tiny-art" aria-hidden="true">
              <div className="card-art-top">
                <span>TINYCRAFTS</span>
                <span>USEFUL BY DESIGN.</span>
              </div>
              <div className="tiny-tool-list">
                <div>
                  <span>01</span>
                  <strong>Sentinel</strong>
                  <span>Developer logs</span>
                </div>
                <div>
                  <span>02</span>
                  <strong>DataDuck</strong>
                  <span>Data explorer</span>
                </div>
                <div>
                  <span>03</span>
                  <strong>markV</strong>
                  <span>Markdown viewer</span>
                </div>
              </div>
              <div className="card-art-bottom">
                <span>SMALL TOOLS / CLEAR PURPOSE</span>
                <span>03 / 03</span>
              </div>
            </div>
            <div className="work-card-info">
              <div>
                <p className="product-category">Developer tools</p>
                <h3>
                  Tinycrafts<span>.</span>
                </h3>
              </div>
              <a
                className="round-link"
                href="https://tinycrafts.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Tinycrafts, opens in a new tab"
              >
                <ArrowTopRightIcon aria-hidden="true" />
              </a>
            </div>
            <p>
              Small, focused utilities for people who build. One job at a time,
              with the details done well.
            </p>
            <div className="tiny-links" aria-label="Tinycrafts tools">
              <a
                href="https://sentinel.tinycrafts.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sentinel <ArrowTopRightIcon aria-hidden="true" />
              </a>
              <a
                href="https://tinycrafts.ai/dataduck/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DataDuck <ArrowTopRightIcon aria-hidden="true" />
              </a>
              <a
                href="https://tinycrafts.ai/markv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                markV <ArrowTopRightIcon aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const steps = [
  [
    "01",
    "Understand",
    "Start with the question and the business meaning behind it.",
  ],
  ["02", "Constrain", "Keep requests within known data and metric boundaries."],
  ["03", "Verify", "Check the path to an answer before it becomes a decision."],
  ["04", "Explain", "Make the calculation and supporting evidence visible."],
];

function MethodSection() {
  return (
    <section
      className="method-section section-pad"
      id="method"
      aria-labelledby="method-title"
    >
      <div className="container">
        <Eyebrow index="02 / THE FOUNDATION" inverse>
          Stratum Core
        </Eyebrow>
        <div className="method-intro">
          <div>
            <p className="method-overline">Under the surface of finQry</p>
            <h2 id="method-title">
              Answers need
              <br />
              <span className="accent-word">a foundation.</span>
            </h2>
          </div>
          <p>
            Stratum Core is the developing system behind finQry. It connects
            natural language questions to governed data, with checks and context
            along the way.
          </p>
        </div>
        <div className="method-steps">
          {steps.map(([number, title, description]) => (
            <div className="method-step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowTopRightIcon aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="method-note">
          Stratum Core is in development. This describes the intended approach,
          not a live product capability.
        </p>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section
      className="studio-section section-pad"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="container">
        <Eyebrow index="03 / THE STUDIO">Dublin, Ireland</Eyebrow>
        <div className="studio-layout">
          <h2 id="studio-title">
            Independent
            <br />
            in scale.
            <br />
            <span className="accent-word">Considered</span>
            <br />
            in every detail.
          </h2>
          <div className="studio-copy">
            <p className="studio-lede">
              Snapcircle Limited is an independent software company making
              products across financial intelligence, customer experience, and
              developer tooling.
            </p>
            <p>
              Each initiative has its own purpose and pace. What connects them
              is a preference for clear thinking, sound engineering, and
              software people can actually use.
            </p>
            <div className="studio-facts">
              <span>BASED IN DUBLIN</span>
              <span>REGISTERED IN IRELAND</span>
              <span>COMPANY NO. 675788</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-main">
          <div>
            <span className="footer-kicker">A GOOD PLACE TO START</span>
            <h2>
              Have something
              <br />
              in mind<span>?</span>
            </h2>
          </div>
          <a
            href="mailto:hello@snapcircle.io?subject=Hello%20Snap%20Circle"
            className="footer-contact"
          >
            Start a conversation <ArrowTopRightIcon aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <Brand />
          <span>
            © {new Date().getFullYear()} Snapcircle Limited · Company no. 675788
          </span>
          <a href="#top">
            Back to top <ArrowDownIcon aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem("snapcircle-theme") === "dark"
      ? "dark"
      : "light",
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("snapcircle-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111a17" : "#ffffff");
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
        <Hero1 />
        <FeaturedWork />
        <MethodSection />
        <StudioSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
