import type { Course } from "../../content/teaching";
import type { Language } from "../../content";

type CourseBookProps = { course: Course; language: Language; onOpen: (course: Course) => void };

export function CourseBook({ course, language, onOpen }: CourseBookProps) {
  const isBridge = course.icon === "bridge";
  return (
    <button className={`course-book course-book-${course.color}`} type="button" onClick={() => onOpen(course)} aria-label={`${language === "zh" ? "打开课程" : "Open course"}: ${course.title[language]}`}>
      <span className="course-book-pages" aria-hidden="true" />
      <span className="course-book-spine">
        <span className="course-book-catalog">{course.catalog}</span>
        <span className="course-book-icon" aria-hidden="true">
          {isBridge ? <svg viewBox="0 0 50 40"><path d="M3 35h44M7 35 16 14l10 21 10-21 10 21M16 14h20M7 35 26 14l10 21" /></svg> : <svg viewBox="0 0 50 40"><rect x="9" y="5" width="30" height="30" rx="4" /><circle cx="18" cy="14" r="2" /><circle cx="30" cy="15" r="2" /><circle cx="24" cy="25" r="2" /></svg>}
        </span>
        <strong>{course.shortTitle[language]}</strong>
        <span className="course-book-year">{course.year}</span>
        <span className="course-book-metc">METC</span>
      </span>
      <span className="course-book-cover-hint" aria-hidden="true"><b>{course.category[language]}</b><i>{language === "zh" ? "打开课程 →" : "Open course →"}</i></span>
      <span className="course-book-tip">{language === "zh" ? "打开课程 →" : "Open course →"}</span>
    </button>
  );
}
