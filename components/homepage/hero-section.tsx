"use client";

import { useEffect, useRef, useState } from "react";
import { homepageContent, type Language, localize } from "../../data/homepage-content";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const LOGO_PATH =
  "M38 184 C56 126,78 88,108 88 C132 89,132 148,149 178 C171 127,195 88,226 90 C255 92,254 151,279 180 C307 112,344 89,394 92 C429 94,451 106,480 101 C499 97,498 82,478 79 C444 75,400 78,369 96 C341 113,335 136,362 148 C393 161,443 151,476 151 C500 151,502 169,478 178 C441 190,391 181,357 191 C332 199,343 212,378 210 C426 207,486 195,535 188 C553 185,563 179,563 166 C564 139,555 111,551 85 C526 85,502 85,478 86 C456 87,456 67,481 66 C543 65,608 66,670 66 C696 66,697 88,671 88 C645 88,621 87,599 87 C606 121,614 157,622 184 C628 204,650 205,664 189 C679 172,683 139,704 116 C732 86,777 82,811 101 C778 97,746 107,727 130 C704 158,717 188,752 195 C786 202,822 184,841 157 C856 136,842 117,814 120 C789 123,779 142,790 155 C805 170,837 164,862 151 C884 140,905 132,925 139 C948 147,942 170,921 178";

function WritingLogo() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const beamRef = useRef<SVGGElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);
  const particleRefs = useRef<SVGCircleElement[]>([]);
  const [phase, setPhase] = useState<"idle" | "writing" | "settled">("idle");

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

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = media.matches;

    const placePenAt = (progress: number) => {
      const currentLength = Math.max(0, Math.min(totalLength, totalLength * progress));
      const point = path.getPointAtLength(currentLength);
      const nextPoint = path.getPointAtLength(Math.min(totalLength, currentLength + 2));
      const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;
      beam.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      glow.setAttribute("cx", `${point.x}`);
      glow.setAttribute("cy", `${point.y}`);
      path.style.strokeDashoffset = `${totalLength - currentLength}`;

      particles.forEach((particle, index) => {
        const spread = 6 + index * 4;
        const offsetX = -Math.cos((angle * Math.PI) / 180) * spread + (index % 2 === 0 ? -1 : 1) * (index + 2);
        const offsetY = -Math.sin((angle * Math.PI) / 180) * spread + (index - 2) * 2.6;
        particle.setAttribute("cx", `${point.x + offsetX}`);
        particle.setAttribute("cy", `${point.y + offsetY}`);
        particle.setAttribute("r", `${Math.max(1.6, 4.2 - index * 0.45)}`);
        particle.style.opacity = `${Math.max(0.15, 0.9 - index * 0.14)}`;
      });
    };

    if (prefersReducedMotion) {
      placePenAt(1);
      setPhase("settled");
      return;
    }

    let raf = 0;
    let settledTimer = 0;
    const startDelay = 300;
    const duration = 8200;
    const startTime = performance.now() + startDelay;

    setPhase("writing");
    placePenAt(0);

    const tick = (time: number) => {
      if (time < startTime) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      const raw = (time - startTime) / duration;
      const progress = raw >= 1 ? 1 : 1 - Math.pow(1 - raw, 4);
      placePenAt(progress);

      if (raw < 1) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      settledTimer = window.setTimeout(() => setPhase("settled"), 220);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(settledTimer);
    };
  }, []);

  return (
    <div className={`logo-stage ${phase === "settled" ? "is-settled" : ""}`} aria-label="METC">
      <svg className="line-logo" viewBox="0 0 1320 280" role="img" aria-labelledby="logoTitle">
        <title id="logoTitle">METC handwritten logo</title>
        <defs>
          <radialGradient id="laserGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,253,240,0.9)" />
            <stop offset="45%" stopColor="rgba(248,237,194,0.48)" />
            <stop offset="100%" stopColor="rgba(248,237,194,0)" />
          </radialGradient>
          <linearGradient id="logoChalkInk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fffdf1" />
            <stop offset="46%" stopColor="#f6f0da" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="chalkTexture" x="-12%" y="-32%" width="124%" height="164%">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" />
          </filter>
        </defs>

        <g className="logo-script" transform="translate(8 28) skewX(-8) scale(1.4 1)">
          <path className="logo-guide" d={LOGO_PATH} />
          <path ref={pathRef} className="logo-draw" d={LOGO_PATH} />

          <circle ref={glowRef} className="logo-laser-glow" cx="42" cy="166" r="24" />

          <g ref={beamRef} className="logo-laser" transform="translate(42 166)">
            <circle cx="0" cy="0" r="13" className="sun-laser-shell" />
            <circle cx="0" cy="0" r="5" className="laser-point-core" />
          </g>

          <g className="logo-particles">
            {Array.from({ length: 5 }).map((_, index) => (
              <circle
                key={index}
                ref={(node) => {
                  if (node) {
                    particleRefs.current[index] = node;
                  }
                }}
                className="logo-particle"
                cx="42"
                cy="166"
                r="3"
              />
            ))}
          </g>
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
