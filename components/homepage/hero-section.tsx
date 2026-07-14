"use client";

import { useEffect, useRef, useState } from "react";
import { homepageContent, type Language, localize } from "../../data/homepage-content";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const LOGO_PATH =
  "M15 79 C35 48,53 27,76 23 C95 20,99 45,107 64 C116 85,141 87,157 71 C171 57,181 33,196 27 C213 20,222 30,226 51 C229 66,231 80,241 86 C252 93,272 91,288 84 L382 84 C391 84,398 78,400 67 C403 52,406 37,419 29 L296 29 L419 29 L296 29 L296 53 L367 53 L296 53 L296 84 L396 84 C414 84,421 74,426 62 C437 42,452 34,472 29 C497 23,534 22,556 34 C574 44,570 64,552 69 C536 73,525 65,524 55 C523 45,514 39,498 38 C475 37,456 47,452 62 C447 79,468 91,501 91 C534 91,565 79,592 66 C603 61,611 52,607 50 C601 51,590 61,579 64 C580 54,578 44,572 37 C561 25,539 21,516 21 C484 21,459 31,441 47 C426 60,418 82,403 87";

function WritingLogo() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const beamRef = useRef<SVGGElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);
  const particleRefs = useRef<SVGCircleElement[]>([]);
  const [phase, setPhase] = useState<"writing" | "settled">("writing");

  useEffect(() => {
    const path = pathRef.current;
    const beam = beamRef.current;
    const glow = glowRef.current;
    const particles = particleRefs.current;

    if (!path || !beam || !glow || particles.length === 0) {
      return;
    }

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const placeLaserAt = (progress: number) => {
      const currentLength = Math.max(0, Math.min(totalLength, totalLength * progress));
      const point = path.getPointAtLength(currentLength);
      const nextPoint = path.getPointAtLength(Math.min(totalLength, currentLength + 2));
      const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

      path.style.strokeDashoffset = `${totalLength - currentLength}`;
      beam.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      glow.setAttribute("cx", `${point.x}`);
      glow.setAttribute("cy", `${point.y}`);

      particles.forEach((particle, index) => {
        const radians = ((angle + index * 31) * Math.PI) / 180;
        const distance = 7 + index * 2.8;
        particle.setAttribute("cx", `${point.x - Math.cos(radians) * distance}`);
        particle.setAttribute("cy", `${point.y - Math.sin(radians) * distance}`);
        particle.setAttribute("r", `${Math.max(1.2, 4 - index * 0.42)}`);
        particle.style.opacity = `${Math.max(0.16, 0.82 - index * 0.1)}`;
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      placeLaserAt(1);
      setPhase("settled");
      return;
    }

    let raf = 0;
    let settleTimer = 0;
    const startDelay = 240;
    const duration = 5600;
    const startTime = performance.now() + startDelay;

    setPhase("writing");
    placeLaserAt(0);

    const tick = (time: number) => {
      if (time < startTime) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      const rawProgress = Math.min(1, (time - startTime) / duration);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 4.8);
      placeLaserAt(easedProgress);

      if (rawProgress < 1) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      settleTimer = window.setTimeout(() => setPhase("settled"), 260);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className={`logo-stage ${phase === "settled" ? "is-settled" : ""}`} aria-label="METC">
      <svg className="script-logo-svg" viewBox="0 0 708 116" role="img" aria-labelledby="logoTitle">
        <title id="logoTitle">METC handwritten logo</title>
        <defs>
          <radialGradient id="logoSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,246,0.95)" />
            <stop offset="42%" stopColor="rgba(255,232,139,0.5)" />
            <stop offset="100%" stopColor="rgba(255,181,83,0)" />
          </radialGradient>
          <linearGradient id="logoSolarInk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fffef4" />
            <stop offset="52%" stopColor="#fff7d1" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="logoHandTexture" x="-8%" y="-42%" width="116%" height="184%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" seed="11" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.85" />
          </filter>
        </defs>

        <path className="logo-guide" d={LOGO_PATH} />
        <path ref={pathRef} className="logo-draw" d={LOGO_PATH} />
        <circle ref={glowRef} className="logo-sun-glow" cx="15" cy="79" r="24" />

        <g ref={beamRef} className="logo-sun-laser" transform="translate(15 79)">
          <circle className="logo-sun-halo" cx="0" cy="0" r="13" />
          <circle className="logo-sun-core" cx="0" cy="0" r="5.5" />
        </g>

        <g className="logo-sparks">
          {Array.from({ length: 7 }).map((_, index) => (
            <circle
              key={index}
              ref={(node) => {
                if (node) {
                  particleRefs.current[index] = node;
                }
              }}
              className="logo-spark"
              cx="15"
              cy="79"
              r="2"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function HeroSection({ language, onAnchorClick }: HeroSectionProps) {
  const { hero } = homepageContent;

  return (
    <section className="hero hero-brand" id="hero">
      <div className="hero-wash hero-wash-a" aria-hidden="true" />
      <div className="hero-wash hero-wash-b" aria-hidden="true" />
      <div className="hero-rule hero-rule-a" aria-hidden="true" />
      <div className="hero-rule hero-rule-b" aria-hidden="true" />

      <div className="hero-content hero-content-brand">
        <div className="hero-copy-stack">
          <WritingLogo />
          <p className="club-fullname">{localize(hero.fullName, language)}</p>
          <h1>{localize(hero.lead, language)}</h1>
          <div className="hero-actions">
            <a className="hero-cta hero-cta-primary" href="#explore" onClick={(event) => onAnchorClick(event, "#explore")}>
              {localize(hero.primaryCta, language)}
            </a>
            <a className="hero-cta hero-cta-secondary" href="#activities" onClick={(event) => onAnchorClick(event, "#activities")}>
              {localize(hero.secondaryCta, language)}
            </a>
          </div>
        </div>

        <div className="hero-studio" aria-hidden="true">
          <div className="chalk-orbit" />
          <div className="hero-blackboard">
            <span>{localize(hero.ribbonNotes[0], language)}</span>
            <span>{localize(hero.ribbonNotes[1], language)}</span>
            <span>{localize(hero.ribbonNotes[2], language)}</span>
          </div>
          <div className="hero-paper-stack">
            <span className="paper-line paper-line-a" />
            <span className="paper-line paper-line-b" />
            <span className="paper-line paper-line-c" />
          </div>
          <div className="hero-pencil">
            <span className="pencil-tip" />
          </div>
        </div>
      </div>

      <div className="hero-floor" aria-hidden="true">
        <div className="hero-floor-line" />
        <p className="hero-slogan">{localize(hero.slogan, language)}</p>
      </div>
    </section>
  );
}
