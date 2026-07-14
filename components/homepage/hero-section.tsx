"use client";

import { useEffect, useRef, useState } from "react";
import { homepageContent, type Language, localize } from "../../data/homepage-content";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const LOGO_PATH =
  "M40 186 C58 136,78 101,108 96 C132 92,135 133,146 166 C157 198,182 195,196 164 C214 124,225 95,251 94 C278 93,281 134,291 166 C302 199,327 193,342 163 C358 130,381 104,421 104 C451 104,468 113,487 122 C462 121,418 120,384 126 C344 133,324 148,338 164 C355 184,414 171,453 161 C482 154,499 164,483 178 C462 197,411 188,366 193 C326 198,318 211,355 210 C406 208,468 195,528 187 C555 183,571 171,568 150 C565 126,555 101,551 80 C525 80,498 82,471 83 C444 84,442 65,472 62 C530 58,593 60,657 61 C686 62,686 82,657 84 C631 85,606 84,581 83 C586 119,593 154,601 181 C607 202,631 205,646 185 C664 161,669 127,696 107 C727 84,772 87,800 108 C769 102,729 111,713 136 C696 162,717 190,752 192 C789 194,818 172,812 147 C808 131,786 129,770 140 C754 151,758 167,775 172 C800 179,833 158,860 145 C885 133,918 129,936 142 C953 155,940 174,914 180";

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
