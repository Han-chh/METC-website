import { homepageContent, type Language, localize } from "../../data/homepage-content";

type AboutSectionProps = {
  language: Language;
};

export function AboutSection({ language }: AboutSectionProps) {
  const { about } = homepageContent;

  return (
    <section className="about-school reveal">
      <div className="notebook-page">
        <span className="binder-hole one" />
        <span className="binder-hole two" />
        <span className="binder-hole three" />
        <p className="eyebrow">{localize(about.eyebrow, language)}</p>
        <h2>{localize(about.title, language)}</h2>
        <p>{localize(about.body, language)}</p>
        <div className="margin-note">{localize(about.note, language)}</div>
      </div>

      <div className="blackboard">
        <div className="chalk-title">{localize(about.boardTitle, language)}</div>
        <div className="chalk-question">{localize(about.boardQuestion, language)}</div>
        <div className="chalk-line" />
        <div className="chalk-bits" aria-hidden="true">
          <span>△</span>
          <span>↗</span>
          <span>∑</span>
          <span>?</span>
          <span>◎</span>
        </div>
      </div>
    </section>
  );
}
