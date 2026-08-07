import Link from "next/link";
import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type SiteHeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
  onAnchorClick?: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  variant?: "home" | "secondary";
};

export function SiteHeader({ language, onToggleLanguage, onAnchorClick, variant = "home" }: SiteHeaderProps) {
  const { nav } = homepageCopy[language];
  const isSecondary = variant === "secondary";

  return (
    <header className="site-header">
      <div className="header-inner">
        {isSecondary ? <Link className="header-brand" href="/" aria-label="METC home">
          <span className="header-brand-emblem" aria-hidden="true">
            <img src="/METC-website/images/metc-graduation-logo.jpg" alt="" />
          </span>
          <span className="header-brand-mark">METC</span>
          <span className="header-brand-dot" aria-hidden="true" />
        </Link> : <a className="header-brand" href="#top" onClick={(event) => onAnchorClick?.(event, "#top")} aria-label="METC home">
          <span className="header-brand-emblem" aria-hidden="true"><img src="/METC-website/images/metc-graduation-logo.jpg" alt="" /></span><span className="header-brand-mark">METC</span><span className="header-brand-dot" aria-hidden="true" />
        </a>}

        <nav className="primary-nav" aria-label="Primary navigation">
          {nav.map((item) => isSecondary ? (
            item.id === "teaching" ? <Link className="nav-current" key={item.id} href="/teaching"><span>{language === "zh" ? item.zh : item.en}</span></Link> : <Link key={item.id} href={`/#${item.id}`}><span>{language === "zh" ? item.zh : item.en}</span></Link>
          ) : (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => onAnchorClick?.(event, `#${item.id}`)}>
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
