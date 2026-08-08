import type { Language } from "../../content";
import { homepageCopy } from "../../content";
import { resourceAlbums } from "../../src/data/resources";

type ActivitySectionProps = {
  language: Language;
  onDemoClick: () => void;
  onGalleryEnter: () => void;
};

const BASE_PATH = "/METC-website";
const homepageFeaturePhoto = resourceAlbums
  .flatMap((album) => album.photos.filter((photo) => photo.id === album.homepageFeaturePhotoId))
  .at(0);

export function ActivitySection({ language, onDemoClick, onGalleryEnter }: ActivitySectionProps) {
  const { activities } = homepageCopy[language];
  const photoSrc = homepageFeaturePhoto?.src ?? `${BASE_PATH}/images/metc-classroom-workshop.png`;
  const photoAlt = language === "zh" ? "上步小学学生课堂活动" : "Students taking part in a Shangbu Primary School classroom activity";

  return (
    <section className="activity-section section-pad" id="activities">
      <div className="section-shell">
        <div className="activity-intro reveal">
          <p className="section-eyebrow">{activities.eyebrow}</p>
          <h2 className="section-title preserve-lines">{activities.title}</h2>
          <div className="section-action-copy">
            <p className="section-body">{activities.body}</p>
            <button type="button" className="button button-coral section-entry-button" onClick={onGalleryEnter}>
              {activities.demoCta}<span>↗</span>
            </button>
          </div>
        </div>

        <figure className="classroom-stage reveal">
          <div className="classroom-photo-wrap">
            <img src={photoSrc} alt={photoAlt} />
            <span className="photo-counter">01 / 04</span>
          </div>
          <figcaption>{activities.photoCaption}</figcaption>
          <div className="photo-note" aria-hidden="true">test → fail → discuss → rebuild</div>
          <svg className="photo-arrow" viewBox="0 0 170 90" aria-hidden="true"><path d="M7 72 C65 15 111 17 157 48 M143 35 L158 48 L143 59" /></svg>
        </figure>

        <div className="student-work-index reveal">
          <div className="work-index-heading">
            <p>{activities.projectLabel}</p>
          </div>
          <div className="project-rows">
            {activities.projects.map((project) => (
              <button type="button" onClick={onDemoClick} key={project.number}>
                <span className="project-letter">{project.number}</span>
                <small>{project.type}</small>
                <h3>{project.title}</h3>
                <p>{project.detail}</p>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
