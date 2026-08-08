import type { Language } from "../../content";
import type { ResourceCourse } from "../../src/data/resources";

type Props = { course: ResourceCourse; language: Language; onOpen: (course: ResourceCourse) => void };

function BookIcon({ icon }: Pick<ResourceCourse, "icon">) {
  if (icon === "market") return <svg viewBox="0 0 50 40"><path d="M4 34h42M8 34V18l17-12 17 12v16M16 34V22h18v12M5 18h40M10 13h30" /></svg>;
  if (icon === "light") return <svg viewBox="0 0 50 40"><path d="M25 6v5m0 18v5M9 20h6m20 0h6M14 10l4 4m14 12 4 4M36 10l-4 4M18 26l-4 4" /><circle cx="25" cy="20" r="8" /></svg>;
  return <svg viewBox="0 0 50 40"><path d="m25 5 3 10 10 3-10 3-3 10-3-10-10-3 10-3zM40 8l1 4 4 1-4 1-1 4-1-4-4-1 4-1z" /></svg>;
}

export function CourseBook({ course, language, onOpen }: Props) {
  const title = course.title[language];
  return <button className={`course-book course-book-${course.color}`} type="button" onClick={() => onOpen(course)} aria-label={`${language === "zh" ? "打开课程" : "Open course"}: ${title}`}>
    <span className="course-book-pages" aria-hidden="true" /><span className="course-book-spine"><span className="course-book-catalog">{course.catalog}</span><span className="course-book-icon" aria-hidden="true"><BookIcon icon={course.icon} /></span><strong>{title}</strong><span className="course-book-year">2025–2026</span><span className="course-book-metc">METC</span></span><span className="course-book-cover-hint" aria-hidden="true"><b>{course.category[language]}</b><i>{language === "zh" ? "打开课程 →" : "Open course →"}</i></span><span className="course-book-tip">{language === "zh" ? "打开课程 →" : "Open course →"}</span>
  </button>;
}
