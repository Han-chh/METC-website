import { homepageContent, type Language, localize } from "../../data/homepage-content";

type WorksSectionProps = {
  language: Language;
};

export function WorksSection({ language }: WorksSectionProps) {
  const { works } = homepageContent;

  return (
    <section className="works-section" id="works">
      <div className="section-heading light reveal">
        <p className="eyebrow">{localize(works.eyebrow, language)}</p>
        <h2>{localize(works.title, language)}</h2>
      </div>

      <div className="work-rail">
        {works.items.map((work, index) => (
          <article
            className={`work-card reveal ${index === 0 ? "tilt-a" : index === 1 ? "tilt-b" : index === 2 ? "tilt-c" : "tilt-d"}`}
            key={work.key}
            tabIndex={0}
          >
            <div className={`work-art ${work.artClass}`} aria-hidden="true">
              {work.artClass === "kaleidoscope" ? (
                <>
                  <span className="glass-chip chip-a" />
                  <span className="glass-chip chip-b" />
                  <span className="glass-chip chip-c" />
                  <span className="glass-chip chip-d" />
                </>
              ) : null}
              {work.artClass === "telescope" ? (
                <>
                  <span className="scope-body" />
                  <span className="scope-lens" />
                  <span className="scope-label" />
                  <span className="scope-shadow" />
                </>
              ) : null}
              {work.artClass === "market" ? (
                <>
                  <span className="market-receipt receipt-a" />
                  <span className="market-receipt receipt-b" />
                  <span className="market-coin coin-a" />
                  <span className="market-coin coin-b" />
                </>
              ) : null}
              {work.artClass === "circuit" ? (
                <>
                  <span className="battery-pack" />
                  <span className="light-bulb" />
                  <span className="copper-tape tape-left" />
                  <span className="copper-tape tape-right" />
                </>
              ) : null}
            </div>
            <div className="work-meta">
              <small>{localize(work.category, language)}</small>
              <h3>{localize(work.title, language)}</h3>
              <p>{localize(work.quote, language)}</p>
            </div>
            <span className="work-action">{localize(work.action, language)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
