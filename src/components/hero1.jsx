import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import heroLandscape from "@/assets/hero-utopian-valley.webp";

function Hero1() {
  return <section className="hero-section" aria-labelledby="hero-title">
    <img className="hero-landscape" src={heroLandscape} alt="" aria-hidden="true" fetchPriority="high" />
    <div className="container hero-inner">
      <div className="hero-topline"><span><i /> INDEPENDENT SOFTWARE STUDIO</span><span>DUBLIN, IRELAND · INDEPENDENT BY DESIGN</span></div>
      <div className="hero-statement"><h1 id="hero-title">Small studio.<br /><span className="accent-word">Serious</span> software<span>.</span></h1></div>
      <div className="hero-lower"><div className="hero-description"><p>We build focused software for complex work. From understanding cloud costs to answering customer questions, every product starts with a useful problem.</p><a href="#work" className="hero-cta">Explore our work <ArrowTopRightIcon aria-hidden="true" /></a></div></div>
    </div>
  </section>;
}

export { Hero1 };
