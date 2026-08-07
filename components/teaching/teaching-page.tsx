"use client";

import { useEffect, useState } from "react";
import type { Language } from "../../content";
import { courses, type Course, type LessonDeck } from "../../content/teaching";
import { SiteFooter } from "../homepage/site-footer";
import { SiteHeader } from "../homepage/site-header";
import { Bookshelf } from "./bookshelf";
import { LibraryHero } from "./library-hero";
import { OpenBook } from "./open-book";
import { PptPreview } from "./ppt-preview";

const LANGUAGE_STORAGE_KEY = "metc-language";

export function TeachingPage() {
  const [language, setLanguage] = useState<Language>("zh");
  const [languageReady, setLanguageReady] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [bookPhase, setBookPhase] = useState<"opening" | "open" | "closing">("opening");
  const [deck, setDeck] = useState<LessonDeck | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showEntryFlash, setShowEntryFlash] = useState(false);

  useEffect(() => { const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY); setLanguage(saved === "zh" || saved === "en" ? saved : (window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en")); setLanguageReady(true); }, []);
  useEffect(() => {
    if (window.sessionStorage.getItem("metc-library-entry") !== "flash") return;
    window.sessionStorage.removeItem("metc-library-entry");
    setShowEntryFlash(true);
    const timer = window.setTimeout(() => setShowEntryFlash(false), 760);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (!languageReady) return; document.documentElement.lang = language === "zh" ? "zh-CN" : "en"; window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language); }, [language, languageReady]);
  useEffect(() => { if (!deck) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setDeck(null); } else if (event.key === "ArrowRight") { setSlideIndex((index) => Math.min(index + 1, deck.slides.length - 1)); } else if (event.key === "ArrowLeft") { setSlideIndex((index) => Math.max(index - 1, 0)); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [deck]);

  function openCourse(nextCourse: Course) { setDeck(null); setCourse(nextCourse); setBookPhase("opening"); window.setTimeout(() => setBookPhase("open"), 760); }
  function closeCourse() { setDeck(null); setBookPhase("closing"); window.setTimeout(() => setCourse(null), 620); }
  function openDeck(nextDeck: LessonDeck) { setSlideIndex(0); setDeck(nextDeck); }
  function closeDeck() { setDeck(null); }

  return <>{showEntryFlash && <div className="teaching-entry-flash" aria-hidden="true" />}<SiteHeader language={language} onToggleLanguage={() => setLanguage((current) => current === "zh" ? "en" : "zh")} variant="secondary" /><main className={`teaching-page${course ? " course-is-open" : ""}`}><LibraryHero language={language} /><Bookshelf courses={courses} language={language} onOpen={openCourse} /></main>{course && <OpenBook course={course} language={language} phase={bookPhase} onClose={closeCourse} onOpenDeck={openDeck} />}{deck && course && <PptPreview deck={deck} language={language} color={course.color} currentSlide={slideIndex} onPrevious={() => setSlideIndex((index) => Math.max(index - 1, 0))} onNext={() => setSlideIndex((index) => Math.min(index + 1, deck.slides.length - 1))} onSelect={setSlideIndex} onClose={closeDeck} />}<SiteFooter language={language} onDemoClick={() => undefined} /></>;
}
