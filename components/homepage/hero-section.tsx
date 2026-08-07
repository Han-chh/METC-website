import type { Language } from "../../content";
import { homepageCopy } from "../../content";
import { MetcScriptLogo } from "./metc-script-logo";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function HeroSection({ language, onAnchorClick }: HeroSectionProps) {
  const { hero } = homepageCopy[language];

  return (
    <section className="hero-section" id="top">
      <div className="hero-color-wash" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-particle-field" aria-hidden="true">
        <i className="hero-particle particle-a" /><i className="hero-particle particle-b" />
        <i className="hero-particle particle-c" /><i className="hero-particle particle-d" />
        <i className="hero-particle particle-e" /><i className="hero-particle particle-f" />
        <i className="hero-particle particle-g" /><i className="hero-particle particle-h" />
        <i className="hero-particle particle-i" /><i className="hero-particle particle-j" />
        <i className="hero-particle particle-k" /><i className="hero-particle particle-l" />
        <i className="hero-particle particle-m" /><i className="hero-particle particle-n" />
        <i className="shooting-star star-one" /><i className="shooting-star star-two" />
        <i className="shooting-star star-three" />
      </div>
      <div className="hero-graphic-set" aria-hidden="true">
        <svg className="hero-graphic hero-graphic-a" viewBox="0 0 310 188">
          <path d="M38 121 L90 32 L142 121 Z" />
          <circle cx="224" cy="55" r="28" />
          <rect x="186" y="110" width="74" height="44" rx="8" />
          <circle className="hero-graphic-node" cx="38" cy="121" r="5" />
          <circle className="hero-graphic-node" cx="142" cy="121" r="5" />
        </svg>
        <svg className="hero-graphic hero-graphic-b" viewBox="0 0 180 84">
          <path d="M8 48 C32 10 56 10 80 48 S128 86 172 31" />
          <circle className="hero-graphic-node" cx="8" cy="48" r="4" />
          <circle className="hero-graphic-node" cx="172" cy="31" r="4" />
        </svg>
        <svg className="hero-graphic hero-graphic-c" viewBox="0 0 210 56">
          <path d="M12 28 H198" />
          <circle className="hero-graphic-node" cx="38" cy="28" r="6" />
          <circle className="hero-graphic-node" cx="105" cy="28" r="4" />
          <circle className="hero-graphic-node" cx="172" cy="28" r="6" />
        </svg>
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow hero-enter hero-enter-1">{hero.eyebrow}</p>

        <div className="hero-logo-stage hero-enter hero-enter-2">
          <MetcScriptLogo />
          <span className="logo-note logo-note-left">signal / inquiry</span>
          <span className="logo-note logo-note-right">ask -&gt; teach -&gt; make</span>
        </div>

        <div className="hero-lower hero-enter hero-enter-3">
          <div className="hero-title-wrap">
            <h1>
              {hero.title}
              <span>{hero.titleAccent}</span>
            </h1>
            <div className="hero-topic-tags" aria-label="Learning approach">
              {(language === "zh" ? ["真实问题", "动手制作", "同伴讨论"] : ["Real questions", "Build together", "Peer discussion"]).map((label) => <span key={label}>{label}</span>)}
            </div>
          </div>
          <div className="hero-intro">
            <p>{hero.body}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#explore" onClick={(event) => onAnchorClick(event, "#explore")}>
                {hero.primaryCta}<span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href="#teaching" onClick={(event) => onAnchorClick(event, "#teaching")}>
                {hero.secondaryCta}<span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#explore" onClick={(event) => onAnchorClick(event, "#explore")}>
        <span>{hero.scroll}</span><i aria-hidden="true" />
      </a>
    </section>
  );
}
