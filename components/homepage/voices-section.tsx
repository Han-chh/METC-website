import type { Language } from "../../content";
import { homepageCopy } from "../../content";

type VoicesSectionProps = { language: Language };

export function VoicesSection({ language }: VoicesSectionProps) {
  const { voices } = homepageCopy[language];

  return (
    <section className="voices-section section-pad" id="voices">
      <div className="section-shell">
        <div className="voices-heading reveal">
          <p className="section-eyebrow">{voices.eyebrow}</p>
          <h2 className="section-title preserve-lines">{voices.title}</h2>
        </div>

        <div className="editorial-quote reveal">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>{voices.leadQuote}</blockquote>
          <p><strong>{voices.leadName}</strong><span>{voices.leadGrade}</span></p>
          <svg className="quote-underline" viewBox="0 0 540 38" aria-hidden="true"><path d="M8 27 C124 5 337 33 529 13" /></svg>
        </div>

        <div className="voice-margins reveal">
          {voices.sideStories.map((story, index) => (
            <article key={story.name}>
              <span>0{index + 2}</span>
              <blockquote>“{story.quote}”</blockquote>
              <p>{story.name} · {story.grade}</p>
            </article>
          ))}
        </div>

        <p className="voices-closing reveal">{voices.closing}</p>
      </div>
    </section>
  );
}
