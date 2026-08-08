import type { Language } from "../../content";
import type { ResourceCourse, ResourceDeck } from "../../src/data/resources";
import { CourseSyllabus } from "./course-syllabus";
import { PptArchive } from "./ppt-archive";

type Props = { course: ResourceCourse; language: Language; phase: "opening" | "open" | "closing"; onClose: () => void; onOpenDeck: (deck: ResourceDeck) => void };

export function OpenBook({ course, language, phase, onClose, onOpenDeck }: Props) {
  const back = language === "zh" ? "返回图书馆" : "Back to Library";
  const title = course.title[language];
  return <section className={`open-book-layer open-book-${phase}`} role="dialog" aria-modal="true" aria-label={`${title} ${language === "zh" ? "课程手册" : "course manual"}`}><div className="open-book-backdrop" onClick={onClose} aria-hidden="true" /><button className="book-back-button" type="button" onClick={onClose}>← {back}</button><div className={`open-book open-book-${course.color}`}><div className="open-book-cover" aria-hidden="true"><span>{course.catalog}</span><strong>{title}</strong><i>METC</i></div><div className="open-book-spread"><article className="book-page book-page-left"><CourseSyllabus course={course} language={language} /></article><article className="book-page book-page-right"><PptArchive course={course} language={language} onOpenDeck={onOpenDeck} /></article><div className="open-book-spine" aria-hidden="true" /></div></div></section>;
}
