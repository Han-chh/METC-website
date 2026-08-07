import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type SiteHeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function SiteHeader({ language, onToggleLanguage, onAnchorClick }: SiteHeaderProps) {
  const { nav } = homepageCopy[language];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="header-brand" href="#top" onClick={(event) => onAnchorClick(event, "#top")} aria-label="METC home">
          <span className="header-brand-mark">METC</span>
          <span className="header-brand-dot" aria-hidden="true" />
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => onAnchorClick(event, `#${item.id}`)}>
              <span>{language === "zh" ? item.zh : item.en}</span>
            </a>
          ))}
        </nav>

        <button className="language-toggle" type="button" onClick={onToggleLanguage} aria-label="Switch Chinese and English">
          <span className={language === "zh" ? "active" : ""}>中</span>
          <i aria-hidden="true" />
          <span className={language === "en" ? "active" : ""}>EN</span>
        </button>
      </div>
    </header>
  );
}
