import { homepageContent, type Language, localize } from "../../data/homepage-content";

type SiteHeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function SiteHeader({ language, onToggleLanguage, onAnchorClick }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <a href="#top" className="mini-mark" aria-label="METC home" onClick={(event) => onAnchorClick(event, "#top")}>
        METC
      </a>
      <nav className="topnav" aria-label="Primary">
        {homepageContent.nav.map((item) => (
          <a key={item.href} href={item.href} onClick={(event) => onAnchorClick(event, item.href)}>
            {localize(item.label, language)}
          </a>
        ))}
      </nav>
      <button className="lang-toggle" type="button" aria-label="Switch language" onClick={onToggleLanguage}>
        <span className="lang-current">{language === "zh" ? "中" : "EN"}</span>
        <span className="lang-divider">/</span>
        <span>{language === "zh" ? "EN" : "中"}</span>
      </button>
    </header>
  );
}
