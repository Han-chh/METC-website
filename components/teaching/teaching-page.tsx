"use client";

import { useEffect, useState } from "react";
import type { Language } from "../../content";
import { resourceCourses, type ResourceCourse, type ResourceDeck } from "../../src/data/resources";
import { SiteFooter } from "../homepage/site-footer";
import { SiteHeader } from "../homepage/site-header";
import { Bookshelf } from "./bookshelf";
import { LibraryHero } from "./library-hero";
import { OpenBook } from "./open-book";
import { PptPreview } from "./ppt-preview";

const LANGUAGE_STORAGE_KEY = "metc-language";

export function TeachingPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [course, setCourse] = useState<ResourceCourse | null>(null);
  const [bookPhase, setBookPhase] = useState<"opening" | "open" | "closing">("opening");
  const [deck, setDeck] = useState<ResourceDeck | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "zh" || saved === "en") setLanguage(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = language === "zh" ? "zh-CN" : "en"; window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language); }, [language]);
  useEffect(() => {
    if (!deck) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDeck(null);
      if (event.key === "ArrowRight") setSlideIndex((index) => Math.min(index + 1, deck.slides.length - 1));
      if (event.key === "ArrowLeft") setSlideIndex((index) => Math.max(index - 1, 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deck]);

  function openCourse(next: ResourceCourse) { setDeck(null); setCourse(next); setBookPhase("opening"); window.setTimeout(() => setBookPhase("open"), 760); }
  function closeCourse() { setDeck(null); setBookPhase("closing"); window.setTimeout(() => setCourse(null), 620); }
  function openDeck(next: ResourceDeck) { setSlideIndex(0); setDeck(next); }

  return <>
    <SiteHeader language={language} onToggleLanguage={() => setLanguage((current) => current === "zh" ? "en" : "zh")} variant="secondary" activePage="teaching" />
    <main className={`teaching-page${course ? " course-is-open" : ""}`}><LibraryHero language={language} /><Bookshelf courses={resourceCourses} language={language} onOpen={openCourse} /></main>
    {course && <OpenBook course={course} language={language} phase={bookPhase} isDeckOpen={Boolean(deck)} onClose={closeCourse} onOpenDeck={openDeck} />}
    {deck && course && <PptPreview deck={deck} language={language} color={course.color} currentSlide={slideIndex} onPrevious={() => setSlideIndex((index) => Math.max(index - 1, 0))} onNext={() => setSlideIndex((index) => Math.min(index + 1, deck.slides.length - 1))} onSelect={setSlideIndex} onClose={() => setDeck(null)} />}
    <SiteFooter language={language} />
  </>;
}
