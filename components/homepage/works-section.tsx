"use client";

import { useRef, useState } from "react";
import type { Language } from "../../content";
import { homepageCopy } from "../../content";
import { resourceAlbums } from "../../src/data/resources";

type ActivitySectionProps = {
  language: Language;
  onNotice: () => void;
  onGalleryEnter: () => void;
};

const BASE_PATH = "/METC-website";
const homepageFeaturePhotos = resourceAlbums.flatMap((album) => {
  const photo = album.photos.find((item) => item.id === album.homepageFeaturePhotoId);
  return photo ? [{ ...photo, school: album.school }] : [];
});

const fallbackFeaturePhoto = {
  src: `${BASE_PATH}/images/metc-classroom-workshop.png`,
  alt: "METC classroom activity",
  school: "METC"
};

export function ActivitySection({ language, onNotice, onGalleryEnter }: ActivitySectionProps) {
  const { activities } = homepageCopy[language];
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const featurePhotos = homepageFeaturePhotos.length ? homepageFeaturePhotos : [fallbackFeaturePhoto];
  const activePhoto = featurePhotos[activePhotoIndex] ?? featurePhotos[0];
  const totalPhotos = featurePhotos.length;
  const photoSource = language === "zh" ? `${activePhoto.school} · 课堂活动` : `${activePhoto.school} · Classroom activity`;
  const previousPhoto = () => setActivePhotoIndex((index) => (index - 1 + totalPhotos) % totalPhotos);
  const nextPhoto = () => setActivePhotoIndex((index) => (index + 1) % totalPhotos);

  const finishSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const offset = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(offset) < 36) return;
    offset > 0 ? previousPhoto() : nextPhoto();
  };

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

        <figure className="classroom-stage reveal" aria-roledescription="carousel" aria-label={language === "zh" ? "课堂活动精选照片" : "Featured classroom photographs"}>
          <div
            className="classroom-photo-wrap"
            tabIndex={0}
            onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
            onTouchEnd={finishSwipe}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") previousPhoto();
              if (event.key === "ArrowRight") nextPhoto();
            }}
          >
            <img key={activePhoto.src} src={activePhoto.src} alt={activePhoto.alt} />
            <span className="photo-counter">{String(activePhotoIndex + 1).padStart(2, "0")} / {String(totalPhotos).padStart(2, "0")}</span>
            {totalPhotos > 1 ? <>
              <button className="classroom-carousel-control classroom-carousel-previous" type="button" onClick={previousPhoto} aria-label={language === "zh" ? "上一张照片" : "Previous photo"}>←</button>
              <button className="classroom-carousel-control classroom-carousel-next" type="button" onClick={nextPhoto} aria-label={language === "zh" ? "下一张照片" : "Next photo"}>→</button>
            </> : null}
          </div>
          <figcaption>{photoSource}</figcaption>
          <div className="photo-note" aria-hidden="true">test → fail → discuss → rebuild</div>
          <svg className="photo-arrow" viewBox="0 0 170 90" aria-hidden="true"><path d="M7 72 C65 15 111 17 157 48 M143 35 L158 48 L143 59" /></svg>
        </figure>

        <div className="student-work-index reveal">
          <div className="work-index-heading">
            <p>{activities.projectLabel}</p>
          </div>
          <div className="project-rows">
            {activities.projects.map((project) => (
              <button type="button" onClick={onNotice} key={project.number}>
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
