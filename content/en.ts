import type { HomepageCopy } from "./types";

export const en: HomepageCopy = {
  nav: [
    { id: "explore", en: "Explore METC", zh: "探索 METC" },
    { id: "teaching", en: "Teaching Design", zh: "教学设计" },
    { id: "activities", en: "Classroom Activities", zh: "课堂活动" },
    { id: "voices", en: "Student Voices", zh: "听 TA 们说" }
  ],
  hero: {
    eyebrow: "Math and Engineering Teaching Club",
    title: "Bring questions into class.",
    titleAccent: "Let curiosity get its hands dirty.",
    body: "A student-created, student-centered math and engineering teaching club. We turn abstract ideas into things students can touch, discuss, and question again.",
    primaryCta: "Start exploring",
    secondaryCta: "See teaching design",
    scroll: "Turn the page"
  },
  explore: {
    eyebrow: "01 — Explore METC / 探索 METC",
    title: "We do not finish the answer.\nWe hand over the question.",
    body: "METC was started by high-school student educators. We believe learning happens not by watching a perfect demonstration, but by moving through guesses, making, failure, and explanation.",
    missionLabel: "Teaching Mission",
    mission: "Help more students see that their ideas carry weight in mathematics and engineering.",
    philosophyLabel: "Educational Philosophy",
    philosophy: "Students design classes for students: real questions connect knowledge, and what we make becomes evidence of learning.",
    principle: "Curiosity becomes a question. A question becomes something we can build.",
    steps: [
      { number: "01", title: "Curiosity", detail: "Begin with a phenomenon worth asking about" },
      { number: "02", title: "Discovery", detail: "Make room for guesses, failure, and another look" },
      { number: "03", title: "Teaching", detail: "Turn understanding into something shareable" },
      { number: "04", title: "Connection", detail: "Bring peers, disciplines, and the real world together" }
    ]
  },
  teaching: {
    eyebrow: "02 — Teaching Design / 教学设计",
    title: "A class is first designed with care on paper.",
    body: "From syllabus to slides to the materials in each student's hands, every page is shaped around one question: where will a real discovery happen?",
    edition: "METC COURSE NOTES · 2026",
    chapter: "UNIT 03 / STRUCTURE",
    question: "How much weight can one sheet of paper hold?",
    objective: "Learning objective",
    objectiveBody: "Understand structural forces through the stability of triangles, then test the idea through iterative models.",
    materials: "Materials",
    materialItems: ["A4 paper × 6", "paper tape", "ruler", "test weights"],
    timeline: [
      { time: "08 min", label: "Observe & predict" },
      { time: "18 min", label: "First build" },
      { time: "12 min", label: "Load test" },
      { time: "10 min", label: "Reflect & rebuild" }
    ],
    resources: [
      { type: "SYLLABUS", title: "Structure & Load", detail: "4 lessons · PDF" },
      { type: "SLIDES", title: "Why doesn't a bridge fall?", detail: "32 pages · PPT" },
      { type: "MATERIALS", title: "Classroom kit", detail: "6 printables · ZIP" }
    ],
    note: "Margin note: do not tell them triangles are strongest. Let the first collapse do the talking.",
    demoCta: "Preview course resources"
  },
  activities: {
    eyebrow: "03 — Classroom Activities / 课堂活动",
    title: "Knowledge is not displayed.\nIt happens on the table.",
    body: "Teachers and students gather around the same table. Every conversation, tilted model, and round of retesting is part of the real class.",
    photoCaption: "Bridge Lab · Structural design workshop · 2026",
    projectLabel: "Student Works / 学生作品",
    projects: [
      { number: "A", type: "ENGINEERING DESIGN", title: "Paper bridge load model", detail: "From 120g to 2.4kg — version four finally held." },
      { number: "B", type: "MATH EXPLORATION", title: "Curves & shortest paths", detail: "Thread, pins, and one accidental detour made optimization visible." },
      { number: "C", type: "PROJECT", title: "Light that turns a corner", detail: "Lenses, cardboard, and a blueprint covered in revisions." }
    ],
    demoCta: "Enter the exhibition"
  },
  voices: {
    eyebrow: "04 — Student Voices / 听 TA 们说",
    title: "After one class,\nwhat stays with them?",
    leadQuote: "I used to think engineering meant making the correct answer. Then I learned that when the model falls, that is when we really start thinking.",
    leadName: "Lin",
    leadGrade: "Grade 8 · Bridge Lab",
    sideStories: [
      { quote: "It was the first time someone really asked me: why did you predict that?", name: "Zhou", grade: "Grade 7 · Math Exploration" },
      { quote: "When I could explain it to my group, I realized I actually understood it.", name: "Chen", grade: "Grade 9 · Student TA" }
    ],
    closing: "Learning leaves a voice. / 学习会留下声音。"
  },
  footer: {
    eyebrow: "Keep the question open.",
    title: "The next class begins with a good question.",
    body: "METC · Math and Engineering Teaching Club\nStudent-created. Student-centered.",
    aboutLabel: "About METC",
    statementLabel: "Statements",
    aboutLinks: ["Club introduction", "Contact", "Join us"],
    statementLinks: ["Privacy", "Copyright", "Website statement"],
    copyright: "© 2026 METC. All classroom stories shown are prototype content.",
    demo: "Frontend visual demo · No backend connected"
  },
  demoMessage: "This is a frontend visual demo. The doorway will open in a future content phase."
};
