import type { Language } from "../../content";
import type { ResourceCourse } from "../../src/data/resources";
import { CourseBook } from "./course-book";

type Props = { courses: ResourceCourse[]; language: Language; onOpen: (course: ResourceCourse) => void };

export function Bookshelf({ courses, language, onOpen }: Props) {
  const copy = language === "zh" ? { eyebrow: "METC Curriculum Library", title: "从书架上选一门课程", body: "课程大纲、课堂实验与每一课的教学幻灯片，都收藏在这里。", shelf: "课程档案 · 2025—2026", fiction: "更多课程正在整理中" } : { eyebrow: "METC Curriculum Library", title: "Choose a course from the shelf", body: "Syllabi, classroom experiments, and lesson slides are kept here.", shelf: "Curriculum archive · 2025—2026", fiction: "More courses are being catalogued" };
  return <section className="course-library" id="course-library" aria-labelledby="course-library-title">
    <div className="course-library-intro"><p className="library-eyebrow">{copy.eyebrow}</p><h2 id="course-library-title">{copy.title}</h2><p>{copy.body}</p></div>
    <div className="bookshelf-wall"><span className="library-stamp" aria-hidden="true">METC<br />ARCHIVE</span><span className="shelf-note" aria-hidden="true">{copy.fiction}</span><div className="bookshelf-books"><span className="decorative-book decorative-book-mint" aria-hidden="true">IDEAS</span>{courses.map((course) => <CourseBook course={course} language={language} onOpen={onOpen} key={course.id} />)}<span className="decorative-book decorative-book-paper" aria-hidden="true">01</span></div><div className="bookshelf-wood" aria-hidden="true"><i /><span>{copy.shelf}</span></div></div>
  </section>;
}
