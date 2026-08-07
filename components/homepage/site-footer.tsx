import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type SiteFooterProps = { language: Language; onDemoClick: () => void };

export function SiteFooter({ language, onDemoClick }: SiteFooterProps) {
  const { footer } = homepageCopy[language];

  return (
    <footer className="site-footer">
      <div className="footer-line-art" aria-hidden="true">
        <svg viewBox="0 0 1200 190"><path d="M-10 153 C159 42 322 174 493 87 C649 8 789 151 947 79 C1057 29 1133 55 1212 20" /></svg>
      </div>
      <div className="footer-inner">
        <div className="footer-lead reveal">
          <p className="section-eyebrow">{footer.eyebrow}</p>
          <h2>{footer.title}</h2>
          <p className="preserve-lines">{footer.body}</p>
        </div>
        <div className="footer-nav reveal">
          <div><p>{footer.aboutLabel}</p>{footer.aboutLinks.map((link) => <button type="button" onClick={onDemoClick} key={link}>{link}</button>)}</div>
          <div><p>{footer.statementLabel}</p>{footer.statementLinks.map((link) => <button type="button" onClick={onDemoClick} key={link}>{link}</button>)}</div>
        </div>
        <div className="footer-bottom"><span>{footer.copyright}</span><span>{footer.demo}</span></div>
      </div>
    </footer>
  );
}
