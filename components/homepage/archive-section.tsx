import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type TeachingSectionProps = {
  language: Language;
  onDemoClick: () => void;
  onLibraryEnter: () => void;
};

export function TeachingSection({ language, onDemoClick, onLibraryEnter }: TeachingSectionProps) {
  const { teaching } = homepageCopy[language];

  return (
    <section className="teaching-section section-pad" id="teaching">
      <div className="section-shell">
        <div className="teaching-intro reveal">
          <p className="section-eyebrow">{teaching.eyebrow}</p>
          <h2 className="section-title">{teaching.title}</h2>
          <p className="section-body">{teaching.body}</p>
        </div>

        <div className="resource-index resource-index-top reveal">
          <div className="resource-list">
            {teaching.resources.map((resource, index) => (
              <button type="button" onClick={onDemoClick} key={resource.type}>
                <span className="resource-number">0{index + 1}</span>
                <span className="resource-type">{resource.type}</span>
                <strong>{resource.title}</strong>
                <small>{resource.detail}</small>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <button type="button" className="button button-coral" onClick={onLibraryEnter}>{teaching.demoCta}<span>→</span></button>
        </div>

        <div className="course-manual reveal">
          <div className="manual-spine" aria-hidden="true" />
          <div className="manual-page manual-page-left">
            <div className="manual-meta"><span>{teaching.edition}</span><span>p. 18</span></div>
            <p className="manual-chapter">{teaching.chapter}</p>
            <h3>{teaching.question}</h3>
            <div className="objective-block">
              <span>{teaching.objective}</span>
              <p>{teaching.objectiveBody}</p>
            </div>
            <div className="bridge-sketch" aria-hidden="true">
              <svg viewBox="0 0 440 150">
                <path d="M22 125 L104 52 L186 125 L268 52 L350 125 L420 66" />
                <path d="M22 125 H420 M104 52 L268 52 L420 66 M186 125 L350 125" />
                <path className="sketch-load" d="M220 6 V42 M208 30 L220 43 L232 30" />
              </svg>
              <span>load?</span>
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
