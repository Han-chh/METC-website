"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Language } from "../../content";
import type { ResourceCourse, ResourceDeck } from "../../src/data/resources";
import { CourseSyllabus } from "./course-syllabus";
import { PptArchive } from "./ppt-archive";

type Props = { course: ResourceCourse; language: Language; phase: "opening" | "open" | "closing"; isDeckOpen: boolean; onClose: () => void; onOpenDeck: (deck: ResourceDeck) => void };

export function OpenBook({ course, language, phase, isDeckOpen, onClose, onOpenDeck }: Props) {
  const back = language === "zh" ? "返回图书馆" : "Back to Library";
  const title = course.title[language];
  const [isMobile, setIsMobile] = useState(false);
  const [lessonSlidesOpen, setLessonSlidesOpen] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const syncViewport = (matches: boolean) => {
      setIsMobile(matches);
      setLessonSlidesOpen(!matches);
    };
    syncViewport(media.matches);
    const handleChange = (event: MediaQueryListEvent) => syncViewport(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);
  const panelId = `course-${course.id}-lesson-slides-panel`;
  const buttonId = `course-${course.id}-lesson-slides-toggle`;
  function toggleLessonSlides() {
    setLessonSlidesOpen((open) => {
      if (isMobile && open) {
        window.requestAnimationFrame(() => document.getElementById(buttonId)?.focus());
      }
      return !open;
    });
  }
  return <section className={`open-book-layer open-book-${phase}`} role="dialog" aria-modal="true" aria-label={`${title} ${language === "zh" ? "课程手册" : "course manual"}`}><div className="open-book-backdrop" onClick={onClose} aria-hidden="true" /><button className="book-back-button" type="button" onClick={onClose}>← {back}</button>{isMobile && lessonSlidesOpen && !isDeckOpen && typeof document !== "undefined" ? createPortal(<button className="book-disclosure-floating-trigger" type="button" aria-expanded="true" aria-controls={panelId} onClick={toggleLessonSlides}><span>{language === "zh" ? "课堂幻灯片" : "Lesson slides"}</span><b aria-hidden="true">−</b></button>, document.body) : null}<div className={`open-book open-book-${course.color}`}><div className="open-book-cover" aria-hidden="true"><span>{course.catalog}</span><strong>{title}</strong><i>METC</i></div><div className="open-book-spread"><article className="book-page book-page-left"><CourseSyllabus course={course} language={language} /></article><article className="book-page book-page-right"><section className="book-disclosure book-disclosure-lesson-slides" data-open={lessonSlidesOpen}><button className="book-disclosure-trigger book-disclosure-trigger-inline" type="button" id={buttonId} aria-expanded={isMobile ? lessonSlidesOpen : true} aria-controls={panelId} onClick={toggleLessonSlides}><span>{language === "zh" ? "课堂幻灯片" : "Lesson slides"}</span><b aria-hidden="true">{lessonSlidesOpen ? "−" : "+"}</b></button><div className="book-disclosure-panel" id={panelId} aria-labelledby={buttonId} hidden={isMobile && !lessonSlidesOpen}><PptArchive course={course} language={language} onOpenDeck={onOpenDeck} /></div></section></article><div className="open-book-spine" aria-hidden="true" /></div></div></section>;
}
