import { homepageContent, type Language, localize } from "../../data/homepage-content";

type VoicesSectionProps = {
  language: Language;
};

export function VoicesSection({ language }: VoicesSectionProps) {
  const { voices } = homepageContent;

  return (
    <section className="voices-section" id="voices">
      <div className="section-heading reveal">
        <p className="eyebrow">{localize(voices.eyebrow, language)}</p>
        <h2>{localize(voices.title, language)}</h2>
      </div>

      <div className="noticeboard reveal">
        {voices.items.map((voice) => (
          <article className={`voice-note ${voice.noteClass}`} key={voice.key}>
            {voice.topDecoration === "tape" ? <span className="tape" /> : <span className="pin" />}
            <p>{localize(voice.quote, language)}</p>
            <small>{localize(voice.detail, language)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
