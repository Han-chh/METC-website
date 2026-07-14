"use client";

import { useEffect, useRef, useState } from "react";
import { homepageContent, type Language, localize } from "../../data/homepage-content";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const LOGO_PATH =
  "M2 70 C20 31,43 4,70 5 C91 6,91 47,102 66 C113 85,140 83,153 59 C171 24,180 4,208 4 C237 4,238 47,249 67 C263 90,285 80,298 59 C313 35,331 18,365 18 C390 18,408 23,425 29 C398 29,360 28,329 31 C294 35,276 45,288 56 C304 70,348 61,384 56 C413 52,427 59,411 68 C390 80,348 76,315 79 C285 82,280 86,307 86 C347 86,395 78,441 71 C462 68,473 60,470 45 C467 27,459 15,456 5 C435 5,415 6,394 7 C368 8,367 -1,394 -2 C448 -4,503 -3,558 -2 C584 -1,585 16,558 18 C535 20,513 18,490 17 C494 48,500 73,509 83 C520 96,536 85,545 69 C555 49,554 28,569 18 C584 8,601 17,589 30 C576 43,536 43,519 52 C501 62,514 78,540 79 C570 80,597 62,588 44 C580 28,549 27,534 42 C518 58,527 74,548 77 C573 81,594 67,606 55 C625 36,653 39,664 52 C674 65,657 78,633 80";

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
      <svg className="script-logo-svg" viewBox="0 -8 680 110" role="img" aria-labelledby="logoTitle">
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
        <circle ref={glowRef} className="logo-sun-glow" cx="2" cy="70" r="24" />

        <g ref={beamRef} className="logo-sun-laser" transform="translate(2 70)">
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
              cx="2"
              cy="70"
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
