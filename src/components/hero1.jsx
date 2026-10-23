import { ArrowDownIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";

function Hero1() {
  return <section className="hero-section" aria-labelledby="hero-title">
    <div className="container hero-inner">
      <div className="hero-topline"><span><i /> INDEPENDENT SOFTWARE STUDIO</span><span>DUBLIN, IRELAND · INDEPENDENT BY DESIGN</span></div>
      <div className="hero-statement"><h1 id="hero-title">Small studio.<br /><span className="accent-word">Serious</span> software<span>.</span></h1></div>
      <div className="hero-lower"><div className="hero-description"><p>We build focused software for complex work. From understanding cloud costs to answering customer questions, every product starts with a useful problem.</p><a href="#work" className="hero-cta">Explore our work <ArrowTopRightIcon aria-hidden="true" /></a></div><div className="hero-scroll"><span>SCROLL TO DISCOVER</span><ArrowDownIcon aria-hidden="true" /></div></div>
    </div>
    <div className="hero-rule" aria-hidden="true"><span>SNAP CIRCLE</span><span>INDEPENDENT BY DESIGN</span><span>01 — 03</span></div>
  </section>;
}

export { Hero1 };
