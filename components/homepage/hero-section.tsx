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
      <svg className="hero-orbit" viewBox="0 0 900 520" aria-hidden="true">
        <path d="M42 364 C238 474 564 444 814 205" />
        <path d="M112 152 C338 42 683 101 862 330" />
        <circle cx="814" cy="205" r="8" />
        <circle cx="112" cy="152" r="5" />
      </svg>

      <div className="hero-inner">
        <p className="hero-eyebrow hero-enter hero-enter-1">{hero.eyebrow}</p>
        <div className="hero-context hero-enter hero-enter-1" aria-label="METC classroom context">
          <span>01 / LIVE LEARNING LAB</span><i aria-hidden="true" />
          <strong>{language === "zh" ? "学生共创实验课堂" : "Student-led classroom experiments"}</strong>
        </div>

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
