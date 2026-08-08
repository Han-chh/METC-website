"use client";

import { useEffect, useState } from "react";
import type { Language } from "../../content";
import type { ResourceCourse } from "../../src/data/resources";

type Props = { course: ResourceCourse; language: Language };

export function CourseSyllabus({ course, language }: Props) {
  const title = course.title[language];
  const [syllabus, setSyllabus] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    setSyllabus(""); setLoadFailed(false);
    if (!course.syllabus) return;
    fetch(course.syllabus).then((response) => response.ok ? response.text() : Promise.reject()).then(setSyllabus).catch(() => setLoadFailed(true));
  }, [course.syllabus]);
  const copy = language === "zh" ? { archive: "课程档案", school: "授课学校", category: "课程领域", about: "课程介绍", contains: "包含课程", syllabus: "课程大纲预览", loading: "正在打开课程大纲…", unavailable: "课程大纲暂时无法加载。" } : { archive: "Course archive", school: "School", category: "Subject", about: "About this course", contains: "Included topics", syllabus: "Syllabus preview", loading: "Opening the syllabus…", unavailable: "The syllabus preview is unavailable." };
  return <div className="book-left-content" tabIndex={0} aria-label={copy.archive}>
    <div className="book-page-meta"><span>{copy.archive}</span><span>{course.catalog}</span></div><p className="book-course-category">{course.category}</p><h2>{title}</h2><p className="book-subtitle">{course.summary}</p>
    <dl className="book-metadata"><div><dt>{copy.school}</dt><dd>{course.school}</dd></div><div><dt>{copy.category}</dt><dd>{course.category}</dd></div><div><dt>{language === "zh" ? "课件" : "Decks"}</dt><dd>{course.lessons.length}</dd></div></dl>
    <section className="book-copy-section"><h3>{copy.about}</h3><p>{course.summary}</p></section>
    <section className="book-copy-section book-objectives"><h3>{copy.contains}</h3><ol>{course.contains.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></li>)}</ol></section>
    {course.hasSyllabus && <section className="book-copy-section rendered-syllabus"><h3>{copy.syllabus}</h3>{syllabus ? <div className="syllabus-preview" dangerouslySetInnerHTML={{ __html: syllabus }} /> : <p className="syllabus-loading">{loadFailed ? copy.unavailable : copy.loading}</p>}</section>}
  </div>;
}
