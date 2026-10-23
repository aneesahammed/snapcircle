import { useEffect, useRef } from "react";
import { ArrowRightIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";

const heroVideoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

function Hero1() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return <section className="hero-section" aria-labelledby="hero-title">
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={heroVideoUrl} type="video/mp4" />
    </video>
    <div className="container hero-inner">
      <div className="hero-content">
        <h1 className="hero-title" id="hero-title">
          <span>Small studio.</span>
          <span className="hero-title-muted">Serious software.</span>
        </h1>
        <p className="hero-copy">We build focused software that makes complex work easier to understand, from cloud costs to customer questions.</p>
        <div className="hero-actions">
          <a href="#work" className="hero-cta liquid-glass">Explore our work <ArrowRightIcon aria-hidden="true" /></a>
          <a href="mailto:hello@snapcircle.io?subject=Hello%20Snap%20Circle" className="hero-cta hero-cta-secondary">Let’s talk <ArrowTopRightIcon aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}

export { Hero1 };
