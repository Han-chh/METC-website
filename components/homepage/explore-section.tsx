import { homepageContent, type Language, localize } from "../../data/homepage-content";

type ExploreSectionProps = {
  language: Language;
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function ExploreSection({ language, onAnchorClick }: ExploreSectionProps) {
  const { explore } = homepageContent;

  return (
    <section className="explore-section" id="explore">
      <div className="section-heading reveal">
        <p className="eyebrow">{localize(explore.eyebrow, language)}</p>
        <h2>{localize(explore.title, language)}</h2>
        <p>{localize(explore.body, language)}</p>
      </div>

      <div className="campus-map reveal">
        {explore.cards.map((card) => (
          <a
            key={card.id}
            className={`campus-object ${card.kind}-object`}
            href={card.href}
            onClick={(event) => onAnchorClick(event, card.href)}
            aria-label={localize(card.title, language)}
          >
            {card.kicker ? <span className="object-kicker">{card.kicker}</span> : null}

            {card.kind === "activities" ? (
              <>
                <span className="door-knob" />
                <span className="door-window">01</span>
              </>
            ) : null}

            {card.kind === "courses" ? (
              <>
                <span className="tape tape-a" />
                <span className="rule" />
              </>
            ) : null}

            {card.kind === "works" ? (
              <>
                <span className="photo photo-1" />
                <span className="photo photo-2" />
                <span className="photo photo-3" />
              </>
            ) : null}

            {card.kind === "voices" ? <span className="pin" /> : null}

            {card.kind === "schools" ? (
              <div className="school-shelf" aria-hidden="true">
                <span className="school-card school-card-a" />
                <span className="school-card school-card-b" />
                <span className="school-card school-card-c" />
              </div>
            ) : null}

            {card.kind === "archive" ? (
              <>
                <span className="locker-slits" />
                <span className="locker-number">M-24</span>
              </>
            ) : null}

            {card.kind === "spirit" ? (
              <>
                <span className="paper-corner" />
                <span className="handline">Curiosity before answers.</span>
                <span className="handline">Learning by doing.</span>
                <span className="handline">Every student participates.</span>
              </>
            ) : null}

            {card.kind === "team" ? (
              <>
                <span className="portrait p1">M</span>
                <span className="portrait p2">E</span>
                <span className="portrait p3">T</span>
                <span className="portrait p4">C</span>
              </>
            ) : null}

            <span className="object-label">
              <b>{localize(card.title, language)}</b>
              <small>{localize(card.description, language)}</small>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
