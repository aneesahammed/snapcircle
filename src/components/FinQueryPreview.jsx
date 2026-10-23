import { useEffect, useRef, useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import "./FinQueryPreview.css";

const tabs = ["Chart", "Table", "Semantic SQL", "Data flow"];

const costRows = [
  ["Amazon EC2", "$24,180", "+11.6%"],
  ["AWS Lambda", "$9,730", "+2.8%"],
  ["Amazon ECS", "$8,950", "+5.1%"],
];

function FinQueryMark() {
  return (
    <span className="fq-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
    </span>
  );
}

function CostChart() {
  return (
    <div className="fq-chart" role="img" aria-label="Illustrative compute cost rising across six months to $42,860">
      <div className="fq-chart-axis"><span>$45k</span><span>$30k</span><span>$15k</span></div>
      <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
        <path className="fq-chart-grid" d="M0 18H400M0 72H400M0 126H400" />
        <path className="fq-chart-area" d="M0 112 C45 109 58 102 92 104 S151 92 188 96 S244 80 280 84 S349 54 400 35 V150 H0 Z" />
        <path className="fq-chart-line" d="M0 112 C45 109 58 102 92 104 S151 92 188 96 S244 80 280 84 S349 54 400 35" />
        <circle className="fq-chart-end" cx="400" cy="35" r="5" />
      </svg>
      <div className="fq-chart-months"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
    </div>
  );
}

function DataFlowCanvas() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="fq-flow-canvas" aria-label="Sample data flow from AWS CUR through an approved metric to the answer">
      <div className="fq-flow-graph" style={{ transform: `scale(${zoom})` }}>
        <svg className="fq-flow-edges" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M285 57 C335 57 330 34 385 34" />
          <path d="M625 34 C678 34 669 57 718 57" />
        </svg>
        <div className="fq-flow-node fq-flow-source"><i className="fq-flow-handle fq-flow-output" /><span>DATA SOURCE</span><strong>AWS CUR 2.0</strong><small>Cost &amp; usage</small></div>
        <div className="fq-flow-node fq-flow-metric"><i className="fq-flow-handle fq-flow-input" /><i className="fq-flow-handle fq-flow-output" /><span>GOVERNED METRIC</span><strong>Amortized cost</strong><small>Approved definition</small></div>
        <div className="fq-flow-node fq-flow-answer"><i className="fq-flow-handle fq-flow-input" /><span>RESULT</span><strong>By service</strong><small>12 rows returned</small></div>
      </div>
      <div className="fq-flow-controls" aria-label="Data flow zoom controls">
        <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.15, Math.round((value + 0.05) * 100) / 100))}><PlusIcon aria-hidden="true" /></button>
        <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.85, Math.round((value - 0.05) * 100) / 100))}><MinusIcon aria-hidden="true" /></button>
      </div>
      <span className="fq-flow-watermark">SAMPLE FLOW</span>
    </div>
  );
}

function ResultBody({ tab }) {
  if (tab === "Table") {
    return (
      <div className="fq-table-wrap">
        <table className="fq-table">
          <thead><tr><th>Service</th><th>Current</th><th>Change</th></tr></thead>
          <tbody>{costRows.map(([service, cost, change]) => (
            <tr key={service}><td>{service}</td><td>{cost}</td><td>{change}</td></tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  if (tab === "Semantic SQL") {
    return (
      <div className="fq-code-wrap">
        <div className="fq-code-heading"><span>Compiled query</span><span>READ ONLY</span></div>
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

  return <CostChart />;
}

function FinQueryPreview() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Chart");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={"fin-preview" + (visible ? " fin-preview-visible" : "")} ref={rootRef} aria-label="Interactive finQry sample workspace">
      <div className="fq-stage-head"><span>FINQRY / PRODUCT PREVIEW</span><span><i /> SAMPLE DATA</span></div>
      <div className="fq-window">
        <div className="fq-window-bar">
          <div className="fq-window-brand"><FinQueryMark /><strong>finQry</strong></div>
          <div className="fq-workspace-name">Platform workspace <span>⌄</span></div>
        </div>
        <div className="fq-window-body">
          <div className="fq-main">
            <div className="fq-main-top"><span>FINOPS QUERY</span><span>DEMO WORKSPACE</span></div>
            <div className="fq-question"><span>YOU ASKED</span><p>What changed in compute spend last month?</p></div>
            <div className="fq-answer-header"><span className="fq-answer-check"><CheckIcon aria-hidden="true" /></span><span>ANSWER GROUNDED IN AWS CUR</span></div>
            <div className="fq-answer"><strong>Compute spend rose 8.2%</strong><p>Amazon EC2 accounts for most of the increase.</p></div>
            <div className="fq-result-card">
              <div className="fq-result-tools"><div className="fq-tab-list" aria-label="Preview result views">{tabs.map((tab) => (
                <button type="button" key={tab} className={activeTab === tab ? "fq-tab fq-tab-active" : "fq-tab"} aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}</div>
              <button type="button" className={saved ? "fq-save fq-save-active" : "fq-save"} aria-pressed={saved} aria-label={saved ? "Remove from sample dashboard" : "Save to sample dashboard"} onClick={() => setSaved((value) => !value)}>{saved ? <CheckIcon aria-hidden="true" /> : <PlusIcon aria-hidden="true" />}{saved ? "Saved" : "Save"}</button></div>
              <div className="fq-result-meta"><strong>Amortized cost</strong><span>12 rows</span><span>AWS CUR 2.0</span></div>
              <div className="fq-result-body" aria-live="polite"><ResultBody tab={activeTab} /></div>
            </div>
            <div className="fq-evidence"><span className="fq-evidence-dot" /> Metric, source, and query are inspectable</div>
          </div>
        </div>
      </div>
      <div className="fq-stage-foot"><span>SAMPLE UI · NO LIVE QUERY OR SAVED DATA</span><span>01 / 01</span></div>
    </div>
  );
}

export { FinQueryPreview };
