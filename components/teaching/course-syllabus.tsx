import type { Course } from "../../content/teaching";
import type { Language } from "../../content";

type CourseSyllabusProps = { course: Course; language: Language };

export function CourseSyllabus({ course, language }: CourseSyllabusProps) {
  const copy = language === "zh"
    ? { about: "关于这门课", objectives: "学习目标", syllabus: "课程大纲", explore: "我们会探索", challenge: "课堂挑战", page: "课程档案" }
    : { about: "About this course", objectives: "Learning objectives", syllabus: "Course syllabus", explore: "What we explore", challenge: "Class challenge", page: "Course archive" };
  return (
    <div className="book-left-content" tabIndex={0} aria-label={language === "zh" ? "课程介绍与大纲，可独立滚动" : "Course introduction and syllabus, independently scrollable"}>
      <div className="book-page-meta"><span>{copy.page}</span><span>{course.catalog}</span></div>
      <p className="book-course-category">{course.category[language]} · {course.year}</p>
      <h2>{course.title[language]}</h2>
      <p className="book-subtitle">{course.subtitle[language]}</p>
      <dl className="book-metadata"><div><dt>{language === "zh" ? "学科" : "Subject"}</dt><dd>{course.category[language]}</dd></div><div><dt>{language === "zh" ? "年级" : "Grades"}</dt><dd>{course.grades}</dd></div><div><dt>{language === "zh" ? "时长" : "Duration"}</dt><dd>{course.duration[language]}</dd></div></dl>
      <section className="book-copy-section"><h3>{copy.about}</h3><p>{course.description[language]}</p></section>
      <section className="book-copy-section book-objectives"><h3>{copy.objectives}</h3><ol>{course.objectives.map((objective, index) => <li key={objective[language]}><b>{String(index + 1).padStart(2, "0")}</b><span>{objective[language]}</span></li>)}</ol></section>
      <section className="book-copy-section course-syllabus"><h3>{copy.syllabus}</h3>{course.lessons.map((lesson) => <article key={lesson.id}><span className="lesson-number">{lesson.number}</span><div><p className="lesson-time">{lesson.duration}</p><h4>{lesson.title[language]}</h4><p>{lesson.description[language]}</p><strong>{copy.explore}</strong><ul>{lesson.topics.map((topic) => <li key={topic[language]}>{topic[language]}</li>)}</ul><aside><span>{copy.challenge}</span><q>{lesson.challenge[language]}</q></aside></div></article>)}</section>
    </div>
  );
}
