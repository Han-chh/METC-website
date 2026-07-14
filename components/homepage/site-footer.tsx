import { homepageContent, type Language, localize } from "../../data/homepage-content";

type SiteFooterProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function SiteFooter({ language, onAnchorClick }: SiteFooterProps) {
  const { footer } = homepageContent;

  return (
    <footer className="dusk-footer">
      <div className="sunset-disc" aria-hidden="true" />
      <div className="paper-plane" aria-hidden="true">
        ➤
      </div>
      <div className="footer-school" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="footer-copy reveal">
        <p className="eyebrow">{localize(footer.eyebrow, language)}</p>
        <h2>{localize(footer.title, language)}</h2>
        <p>{localize(footer.body, language)}</p>
      </div>

      <div className="footer-links">
        {footer.links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={item.href.startsWith("#") ? (event) => onAnchorClick(event, item.href) : undefined}
          >
            {localize(item.label, language)}
          </a>
        ))}
      </div>

      <div className="footer-bottom">
        <span>METC — Maths and Engineering Teaching Club</span>
        <span>Phase 2-4 homepage model</span>
      </div>
    </footer>
  );
}
