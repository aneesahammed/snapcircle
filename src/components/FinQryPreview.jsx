import { useEffect, useRef, useState, useCallback } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import "./FinQryPreview.css";

const QUESTION_TEXT = "What changed in compute spend last month?";
const tabs = ["Chart", "Table", "Semantic SQL", "Data flow"];

const costRows = [
  ["Amazon EC2", "$24,180", "+11.6%"],
  ["AWS Lambda", "$9,730", "+2.8%"],
  ["Amazon ECS", "$8,950", "+5.1%"],
];

function FinQryMark() {
  return (
    <span className="fq-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

function CostChart({ animate = true }) {
  return (
    <div
      className={`fq-chart ${animate ? "fq-chart-animating" : ""}`}
      role="img"
      aria-label="Illustrative compute cost rising across six months to $42,860"
    >
      <div className="fq-chart-axis">
        <span>$45k</span>
        <span>$30k</span>
        <span>$15k</span>
      </div>
      <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="fq-chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e8a59" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1e8a59" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path className="fq-chart-grid" d="M0 18H400M0 72H400M0 126H400" />
        <path
          className="fq-chart-area"
          fill="url(#fq-chart-grad)"
          d="M0 112 C45 109 58 102 92 104 S151 92 188 96 S244 80 280 84 S349 54 400 35 V150 H0 Z"
        />
        <path
          className="fq-chart-line"
          d="M0 112 C45 109 58 102 92 104 S151 92 188 96 S244 80 280 84 S349 54 400 35"
        />
        <circle className="fq-chart-end" cx="400" cy="35" r="4.5" />
      </svg>
      <div className="fq-chart-months">
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
      </div>
    </div>
  );
}

function DataFlowCanvas() {
  const [zoom, setZoom] = useState(1);

  return (
    <div
      className="fq-flow-canvas"
      aria-label="Sample data flow from AWS CUR through an approved metric to the answer"
    >
      <div className="fq-flow-graph" style={{ transform: `scale(${zoom})` }}>
        <svg
          className="fq-flow-edges"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M285 57 C335 57 330 34 385 34" />
          <path d="M625 34 C678 34 669 57 718 57" />
        </svg>
        <div className="fq-flow-node fq-flow-source">
          <i className="fq-flow-handle fq-flow-output" />
          <span>DATA SOURCE</span>
          <strong>AWS CUR 2.0</strong>
          <small>Cost &amp; usage</small>
        </div>
        <div className="fq-flow-node fq-flow-metric">
          <i className="fq-flow-handle fq-flow-input" />
          <i className="fq-flow-handle fq-flow-output" />
          <span>GOVERNED METRIC</span>
          <strong>Amortized cost</strong>
          <small>Approved definition</small>
        </div>
        <div className="fq-flow-node fq-flow-answer">
          <i className="fq-flow-handle fq-flow-input" />
          <span>RESULT</span>
          <strong>By service</strong>
          <small>12 rows returned</small>
        </div>
      </div>
      <div className="fq-flow-controls" aria-label="Data flow zoom controls">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() =>
            setZoom((value) =>
              Math.min(1.15, Math.round((value + 0.05) * 100) / 100)
            )
          }
        >
          <PlusIcon aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() =>
            setZoom((value) =>
              Math.max(0.85, Math.round((value - 0.05) * 100) / 100)
            )
          }
        >
          <MinusIcon aria-hidden="true" />
        </button>
      </div>
      <span className="fq-flow-watermark">SAMPLE FLOW</span>
    </div>
  );
}

function ResultBody({ tab, animateChart }) {
  if (tab === "Table") {
    return (
      <div className="fq-table-wrap">
        <table className="fq-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Current</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map(([service, cost, change]) => (
              <tr key={service}>
                <td>{service}</td>
                <td>{cost}</td>
                <td>{change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (tab === "Semantic SQL") {
    return (
      <div className="fq-code-wrap">
        <div className="fq-code-heading">
          <span>Compiled query</span>
          <span>READ ONLY</span>
        </div>
        <pre>{`SELECT service,
       SUM(amortized_cost) AS cost
FROM aws_cur
WHERE month = 'October'
GROUP BY service;`}</pre>
      </div>
    );
  }

  if (tab === "Data flow") {
    return <DataFlowCanvas />;
  }

  return <CostChart animate={animateChart} />;
}

function FinQryPreview() {
  const rootRef = useRef(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  // phases: "idle" -> "typing" -> "loading" -> "revealed"
  const [phase, setPhase] = useState("idle");
  const [typedText, setTypedText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Chart");
  const [saved, setSaved] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Check reduced motion
  const checkReducedMotion = useCallback(() => {
    return (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );
  }, []);

  // Intersection observer to trigger sequence when card enters view
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) {
      setHasEnteredView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Orchestrate typing -> loading -> revealed sequence
  useEffect(() => {
    if (!hasEnteredView) return;

    if (checkReducedMotion()) {
      setTypedText(QUESTION_TEXT);
      setLoadingProgress(100);
      setPhase("revealed");
      return;
    }

    let isCancelled = false;
    let typingInterval = null;
    let progressInterval = null;
    let timeoutId1 = null;
    let timeoutId2 = null;

    // Reset for run
    setPhase("typing");
    setTypedText("");
    setLoadingProgress(0);

    // Initial brief breath before typing starts
    timeoutId1 = setTimeout(() => {
      if (isCancelled) return;

      let charIndex = 0;
      typingInterval = setInterval(() => {
        if (isCancelled) return;
        charIndex += 1;
        setTypedText(QUESTION_TEXT.slice(0, charIndex));

        if (charIndex >= QUESTION_TEXT.length) {
          clearInterval(typingInterval);

          // Brief pause after typing, then transition to loading
          timeoutId2 = setTimeout(() => {
            if (isCancelled) return;
            setPhase("loading");

            const startTime = Date.now();
            const duration = 850; // smooth 850ms progress

            progressInterval = setInterval(() => {
              if (isCancelled) return;
              const elapsed = Date.now() - startTime;
              const pct = Math.min(100, Math.round((elapsed / duration) * 100));
              setLoadingProgress(pct);

              if (pct >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                  if (isCancelled) return;
                  setPhase("revealed");
                }, 140);
              }
            }, 30);
          }, 320);
        }
      }, 26); // smooth ~26ms per character (total ~1s)
    }, 180);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      if (typingInterval) clearInterval(typingInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [hasEnteredView, replayKey, checkReducedMotion]);

  const handleReplay = () => {
    setActiveTab("Chart");
    setReplayKey((k) => k + 1);
  };

  const handleTabClick = (tab) => {
    // If user interacts during typing or loading, jump directly to revealed state
    if (phase !== "revealed") {
      setTypedText(QUESTION_TEXT);
      setLoadingProgress(100);
      setPhase("revealed");
    }
    setActiveTab(tab);
  };

  const isRevealed = phase === "revealed";

  return (
    <div
      className={`fin-preview ${hasEnteredView ? "fin-preview-visible" : ""}`}
      ref={rootRef}
      aria-label="Interactive finQry sample workspace"
    >
      <div className="fq-stage-head">
        <span>FINQRY / PRODUCT PREVIEW</span>
        <span>
          <i /> SAMPLE DATA
        </span>
      </div>

      <div className="fq-window">
        {/* Window Title Bar */}
        <div className="fq-window-bar">
          <div className="fq-window-brand">
            <FinQryMark />
            <span className="fq-brand-name">
              <span>fin</span>
              <strong>Qry</strong>
            </span>
          </div>
          <div className="fq-workspace-name">
            Platform workspace <ChevronDownIcon aria-hidden="true" />
          </div>
        </div>

        {/* Window Interior */}
        <div className="fq-window-body">
          <div className="fq-main">
            {/* Sub-header row */}
            <div className="fq-main-top">
              <span>FINOPS QUERY</span>
              <div className="fq-main-actions">
                <span>DEMO WORKSPACE</span>
                <button
                  type="button"
                  className="fq-replay-btn"
                  onClick={handleReplay}
                  title="Replay query animation"
                  aria-label="Replay query animation"
                >
                  <ReloadIcon aria-hidden="true" />
                  <span>Replay</span>
                </button>
              </div>
            </div>

            {/* Question prompt area */}
            <div className="fq-question">
              <span className="fq-kicker">YOU ASKED</span>
              <p className="fq-question-text">
                {phase === "idle" ? "" : typedText}
                {phase === "typing" && (
                  <span className="fq-cursor" aria-hidden="true" />
                )}
              </p>
            </div>

            {/* Loading state: minimal progress bar & status */}
            {phase === "loading" && (
              <div
                className="fq-loading-wrap"
                aria-live="polite"
                aria-label="Grounding query in AWS CUR 2.0"
              >
                <div className="fq-loading-status">
                  <span className="fq-pulse-indicator" aria-hidden="true">
                    <span className="fq-pulse-dot" />
                  </span>
                  <span>Grounding query in AWS CUR 2.0...</span>
                  <span className="fq-loading-pct">{loadingProgress}%</span>
                </div>
                <div
                  className="fq-progress-track"
                  role="progressbar"
                  aria-valuenow={loadingProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="fq-progress-bar"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Answer Section */}
            {isRevealed && (
              <div className="fq-answer-section">
                <div className="fq-answer-header">
                  <span className="fq-answer-check">
                    <CheckIcon aria-hidden="true" />
                  </span>
                  <span>ANSWER GROUNDED IN AWS CUR</span>
                </div>
                <div className="fq-answer">
                  <strong>Compute spend rose 8.2%</strong>
                  <p>Amazon EC2 accounts for most of the increase.</p>
                </div>
              </div>
            )}

            {/* Result Card with Tabs */}
            {isRevealed && (
              <div className="fq-result-card">
                <div className="fq-result-tools">
                  <div
                    className="fq-tab-list"
                    role="tablist"
                    aria-label="Preview result views"
                  >
                    {tabs.map((tab) => (
                      <button
                        type="button"
                        role="tab"
                        key={tab}
                        className={
                          activeTab === tab
                            ? "fq-tab fq-tab-active"
                            : "fq-tab"
                        }
                        aria-selected={activeTab === tab}
                        onClick={() => handleTabClick(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={
                      saved ? "fq-save fq-save-active" : "fq-save"
                    }
                    aria-pressed={saved}
                    aria-label={
                      saved
                        ? "Remove from sample dashboard"
                        : "Save to sample dashboard"
                    }
                    onClick={() => setSaved((value) => !value)}
                  >
                    {saved ? (
                      <CheckIcon aria-hidden="true" />
                    ) : (
                      <PlusIcon aria-hidden="true" />
                    )}
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="fq-result-meta">
                  <strong>Amortized cost</strong>
                  <span>12 rows</span>
                  <span>AWS CUR 2.0</span>
                </div>

                <div className="fq-result-body" aria-live="polite">
                  <ResultBody
                    tab={activeTab}
                    animateChart={phase === "revealed"}
                  />
                </div>
              </div>
            )}

            {/* Evidence Note */}
            {isRevealed && (
              <div className="fq-evidence">
                <span className="fq-evidence-dot" /> Metric, source, and query
                are inspectable
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fq-stage-foot">
        <span>SAMPLE UI · NO LIVE QUERY OR SAVED DATA</span>
      </div>
    </div>
  );
}

export { FinQryPreview };
