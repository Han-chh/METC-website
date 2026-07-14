import { homepageContent, type Language, localize } from "../../data/homepage-content";

type ArchiveSectionProps = {
  language: Language;
};

export function ArchiveSection({ language }: ArchiveSectionProps) {
  const { archive } = homepageContent;

  return (
    <section className="activities-section" id="activities">
      <div className="archive-desk reveal">
        <div className="archive-title">
          <span className="rubber-stamp">ARCHIVE</span>
          <p className="eyebrow">{localize(archive.eyebrow, language)}</p>
          <h2>{localize(archive.title, language)}</h2>
        </div>

        <div className="folder-stack">
          {archive.items.map((item) => (
            <article className={`folder ${item.folderClass}`} key={item.key}>
              <span className="folder-tab">{item.tab}</span>
              <div className={`folder-photo ${item.photoClass}`}>{item.symbol}</div>
              <h3>{localize(item.title, language)}</h3>
              <p>{localize(item.detail, language)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
