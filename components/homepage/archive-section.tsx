import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type TeachingSectionProps = {
  language: Language;
  onLibraryEnter: () => void;
};

export function TeachingSection({ language, onLibraryEnter }: TeachingSectionProps) {
  const { teaching } = homepageCopy[language];

  return (
    <section className="teaching-section section-pad" id="teaching">
      <div className="section-shell">
        <div className="teaching-intro reveal">
          <p className="section-eyebrow">{teaching.eyebrow}</p>
          <h2 className="section-title">{teaching.title}</h2>
          <p className="section-body">{teaching.body}</p>
        </div>

        <button type="button" className="button button-coral teaching-library-entry reveal" onClick={onLibraryEnter}>
          {teaching.demoCta}<span>→</span>
        </button>

        <div className="course-manual reveal">
          <div className="manual-spine" aria-hidden="true" />
          <div className="manual-page manual-page-left">
            <div className="manual-meta"><span>{teaching.edition}</span><span>p. 08</span></div>
            <p className="manual-chapter">{teaching.chapter}</p>
            <h3>{teaching.question}</h3>
            <div className="objective-block">
              <span>{teaching.objective}</span>
              <p>{teaching.objectiveBody}</p>
            </div>
            <div className="rocket-sketch" aria-hidden="true">
              <svg viewBox="0 0 440 170">
                <path d="M181 31h78v23c0 8 18 15 18 35v36c0 15-11 25-25 25h-64c-14 0-25-10-25-25V89c0-20 18-27 18-35z" />
                <path d="M181 31h78v18h-78zM191 70h58M190 104h60" />
                <path className="sketch-liquid" d="M169 111h102v16c0 12-9 19-20 19h-62c-11 0-20-7-20-19z" />
                <path d="M197 150h46v10h-46z" />
                <path className="sketch-pressure" d="M220 160v-30M208 142l12-13 12 13" />
                <path className="sketch-bubble" d="M191 119c0-4 6-4 6 0s-6 4-6 0zm13-11c0-5 7-5 7 0s-7 5-7 0zm16 16c0-3 5-3 5 0s-5 3-5 0z" />
                <path className="sketch-trajectory" d="M303 123c32-17 61-43 79-79" />
                <path className="sketch-trajectory" d="m370 49 13-6-3 14" />
              </svg>
              <span>CO₂ pushes ↓</span>
            </div>
          </div>

          <div className="manual-page manual-page-right">
            <div className="manual-rule" />
            <div className="materials-list">
              <span>{teaching.materials}</span>
              <ul>{teaching.materialItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <ol className="lesson-timeline">
              {teaching.timeline.map((item, index) => (
                <li key={item.time}><i>{index + 1}</i><span>{item.time}</span><p>{item.label}</p></li>
              ))}
            </ol>
            <p className="manual-note">{teaching.note}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
import Link from "next/link";
