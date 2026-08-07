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
        <svg className="hero-illustration hero-note-strip" viewBox="0 0 246 76">
          <path className="note-dash" d="M7 65h232" />
          <path className="note-paper note-paper-blue" d="M16 14h56v38H16z" />
          <circle className="note-pin" cx="28" cy="20" r="3.5" />
          <path className="note-star" d="m44 27 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" />
          <path className="note-paper note-paper-sun" d="M91 8h56v43H91z" />
          <path className="note-check" d="m105 29 6 6 12-15M105 43h27" />
          <path className="note-paper note-paper-coral" d="M166 17h55v35h-55z" />
          <path className="note-orbit" d="M178 34c8-11 22-11 30 0-8 11-22 11-30 0zM193 24v20M181 34h24" />
          <text className="note-text" x="31" y="62">OBSERVE</text>
          <text className="note-text" x="104" y="62">TRY</text>
          <text className="note-text" x="179" y="62">SHARE</text>
        </svg>
        <svg className="hero-illustration hero-books" viewBox="0 0 300 190">
          <path className="school-shadow" d="M39 153c41 10 178 11 222 0" />
          <path className="book-cover book-cover-blue" d="M37 63c34-7 68-2 93 16v68c-28-17-60-22-93-14z" />
          <path className="book-cover book-cover-coral" d="M130 79c27-18 61-23 95-16v70c-34-8-67-3-95 14z" />
          <path className="book-page" d="M48 70c28-4 54 1 76 16v51c-23-12-49-16-76-11z" />
          <path className="book-page" d="M136 86c22-15 49-20 77-16v56c-28-5-54 0-77 12z" />
          <path className="page-line" d="M61 91h45M61 105h50M61 119h37M151 106h42M151 120h48" />
          <path className="book-spine" d="M130 79v68" />
          <path className="bookmark" d="M181 65v29l10-7 10 7V61" />
          <g className="pencil">
            <path className="pencil-body" d="m195 35 63 39-12 19-63-39z" />
            <path className="pencil-band" d="m241 64 12-19 12 8-12 19z" />
            <path className="pencil-tip" d="m183 54-13-18 25-1z" />
          </g>
          <circle className="school-dot school-dot-sun" cx="79" cy="35" r="8" />
          <path className="school-spark" d="M276 109v16M268 117h16" />
          <path className="school-spark school-spark-small" d="M31 113v11M25 119h12" />
        </svg>
        <svg className="hero-illustration hero-optics" viewBox="0 0 200 112">
          <path className="school-shadow" d="M22 98c33 7 119 7 155 0" />
          <circle className="optics-sun" cx="27" cy="28" r="12" />
          <path className="sun-ray" d="M27 7v-5M8 28H3M14 15l-4-4M40 15l4-4M40 39l5 4" />
          <path className="light-ray light-ray-in" d="M45 33 105 57" />
          <path className="mirror" d="m108 33 21 49" />
          <path className="mirror-stripe" d="m112 39 12 29M117 34l12 29M108 50l12 29" />
          <path className="light-ray light-ray-reflect" d="m121 62 48-29" />
          <path className="water-fill" d="M18 75h165v19c-41 7-122 7-165 0z" />
          <path className="water-line" d="M18 75h165" />
          <path className="light-ray light-ray-refract" d="m105 57 24 18" />
          <circle className="school-dot school-dot-coral" cx="170" cy="32" r="5" />
        </svg>
        <svg className="hero-illustration hero-economy" viewBox="0 0 220 104">
          <path className="school-shadow" d="M23 91c41 8 135 8 174 0" />
          <path className="economy-arrow" d="M57 40c11-20 39-28 60-17" />
          <path className="economy-arrow" d="M130 30c23 0 42 16 46 37" />
          <path className="economy-arrow" d="M165 78c-24 16-60 15-82-2" />
          <path className="economy-arrowhead" d="m111 21 8 3-4 7M176 61l1 9-8 1M89 82l-7-5 5-6" />
          <circle className="economy-node economy-node-blue" cx="50" cy="53" r="19" />
          <path className="student-icon" d="M50 43a7 7 0 1 0 0 .1M38 65c3-9 20-9 24 0" />
          <circle className="economy-node economy-node-sun" cx="125" cy="27" r="18" />
          <path className="coin-icon" d="M125 14v26M130 20c-3-3-11-3-11 1 0 5 11 4 11 9 0 5-9 6-12 1" />
          <circle className="economy-node economy-node-coral" cx="172" cy="72" r="19" />
          <path className="shop-icon" d="M160 72h24v10h-24zM158 67h28l-3-7h-22zM166 82v-7h7v7" />
          <circle className="school-dot school-dot-mint" cx="31" cy="23" r="5" />
          <text className="economy-caption" x="27" y="103">INCOME LOOP</text>
          <text className="economy-label" x="31" y="84">HOME</text>
          <text className="economy-label" x="111" y="55">PAY</text>
          <text className="economy-label" x="153" y="103">MARKET</text>
        </svg>
        <svg className="hero-illustration hero-supplies" viewBox="0 0 300 76">
          <path className="supply-rule" d="M15 45 154 14l5 22-139 31z" />
          <path className="supply-tick" d="m36 43 4 16m20-21 4 16m20-21 4 16m20-21 4 16m20-21 4 16m20-21 4 16" />
          <path className="supply-paperclip" d="M207 25c8-9 22-1 16 9l-20 27c-8 10-23 1-16-9l19-26c3-4 9 0 6 4l-18 25" />
          <path className="supply-spark" d="M260 30v17M252 38h17" />
          <circle className="school-dot school-dot-coral" cx="285" cy="52" r="5" />
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
