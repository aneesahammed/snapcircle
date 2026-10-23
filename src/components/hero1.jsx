import { ArrowRightIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";

function FinQueryPreview() {
  return (
    <div className="hero-art" role="img" aria-label="Illustrative preview of finQuery">
      <div className="hero-art-orbit" aria-hidden="true" />
      <div className="product-window">
        <div className="window-topbar">
          <div className="window-brand"><span className="window-brand-mark" />fin<span>Query</span></div>
          <span className="window-status"><i /> Workspace preview</span>
        </div>
        <div className="window-content">
          <span className="window-eyebrow">CLOUD COST INTELLIGENCE</span>
          <p className="window-question">What changed in our compute spend?</p>
          <div className="answer-block">
            <div className="answer-heading"><span>Evidence summary</span><span>Illustrative</span></div>
            <div className="chart" aria-hidden="true">
              {[40, 54, 44, 69, 58, 78, 66, 88, 76, 100].map((height, index) => (
                <span key={index} style={{ "--bar-height": `${height}%` }} />
              ))}
            </div>
            <div className="chart-caption"><span>Previous period</span><span>Current period</span></div>
          </div>
          <div className="evidence-line"><span className="evidence-mark"><ArrowRightIcon width={13} height={13} /></span>Reasoning connected to source data</div>
        </div>
      </div>
      <div className="art-caption"><span>FINANCIAL INTELLIGENCE</span><span>01 / 03</span></div>
    </div>
  );
}

function Hero1({ className = "" }) {
  return (
    <section className={`hero-block ${className}`} aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="eyebrow-mark" /> Independent software company <span className="eyebrow-divider">/</span> Dublin, Ireland</div>
        <h1 id="hero-title">Thoughtful software.<br /><span>Built for what’s next.</span></h1>
        <p className="hero-description">Snap Circle is an independent software company building considered products for complex work, from financial intelligence to useful everyday tools.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">Explore our work <ArrowRightIcon width={16} height={16} /></a>
          <a className="button button-text" href="#company">About Snap Circle <ArrowTopRightIcon width={15} height={15} /></a>
        </div>
        <p className="hero-footnote">A small company with a broad point of view.</p>
      </div>
      <FinQueryPreview />
    </section>
  );
}

export { Hero1 };
