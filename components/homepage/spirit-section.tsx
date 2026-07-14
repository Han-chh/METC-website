import { homepageContent, type Language, localize } from "../../data/homepage-content";

type SpiritSectionProps = {
  language: Language;
};

export function SpiritSection({ language }: SpiritSectionProps) {
  const { spirit } = homepageContent;

  return (
    <section className="spirit-section" id="spirit">
      <div className="spirit-blackboard reveal">
        <div className="board-top">
          <span>{localize(spirit.eyebrow, language)}</span>
          <span className="chalk-date">20—26</span>
        </div>
        <div className="spirit-lines">
          {spirit.lines.map((item) => (
            <div className="spirit-line" key={item.number}>
              <span className="chalk-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{localize(item.text, language)}</p>
            </div>
          ))}
        </div>
        <div className="chalk-arrow" aria-hidden="true">
          ↙
        </div>
        <div className="chalk-note">{localize(spirit.closing, language)}</div>
      </div>
    </section>
  );
}
