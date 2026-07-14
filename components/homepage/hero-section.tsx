import { homepageContent, type Language, localize } from "../../data/homepage-content";

type HeroSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

function WritingLogo() {
  return (
    <div className="logo-stage" aria-label="METC">
      <img className="script-logo-image" src="/metc-script-logo.png" alt="METC handwritten logo" width="589" height="87" />
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
