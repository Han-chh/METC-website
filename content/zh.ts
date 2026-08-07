import type { HomepageCopy } from "./types";

export const zh: HomepageCopy = {
  nav: [
    { id: "explore", en: "Explore METC", zh: "探索 METC" },
    { id: "teaching", en: "Teaching Design", zh: "教学设计" },
    { id: "activities", en: "Classroom Activities", zh: "课堂活动" },
    { id: "voices", en: "Student Voices", zh: "听 TA 们说" }
  ],
  hero: {
    eyebrow: "Math and Engineering Teaching Club",
    title: "把问题带进课堂，",
    titleAccent: "让好奇心动手发生",
    body: "由学生创造、面向学生的数学与工程教学社团，我们把抽象概念变成能触摸、能讨论、能继续追问的课堂现场",
    primaryCta: "开始探索",
    secondaryCta: "查看教学设计",
    scroll: "向下翻开课堂"
  },
  explore: {
    eyebrow: "01 — 探索 METC",
    title: "不是把答案讲完，而是把问题交给学生",
    body: "METC 由高中生教学者共同发起。我们相信，最好的学习不是旁观一次正确示范，而是亲手经历猜想、制作、失败和重新解释。",
    missionLabel: "Teaching Mission",
    mission: "让更多学生在数学与工程里，看见自己的想法有重量。",
    philosophyLabel: "Educational Philosophy",
    philosophy: "学生为学生设计课堂：用真实问题连接知识，用作品留下学习的证据。",
    principle: "Curiosity becomes a question. A question becomes something we can build.",
    steps: [
      { number: "01", title: "Curiosity", detail: "从一个值得追问的现象开始" },
      { number: "02", title: "Discovery", detail: "允许猜测、试错与重新观察" },
      { number: "03", title: "Teaching", detail: "把理解转化为能分享的表达" },
      { number: "04", title: "Connection", detail: "让同伴、学科与真实世界相遇" }
    ]
  },
  teaching: {
    eyebrow: "02 — 教学设计",
    title: "一堂课，先在纸上被认真设计",
    body: "从 syllabus 到课堂 PPT，再到学生手里的材料包，每一页都围绕同一个问题组织：学生会在哪里产生真正的发现？",
    edition: "METC COURSE NOTES · 2026",
    chapter: "UNIT 03 / STRUCTURE",
    question: "一张纸，能承受多大的重量？",
    objective: "Learning objective",
    objectiveBody: "用三角形稳定性理解结构受力，并通过迭代模型验证设计。",
    materials: "Materials",
    materialItems: ["A4 paper × 6", "paper tape", "ruler", "test weights"],
    timeline: [
      { time: "08 min", label: "观察与猜想" },
      { time: "18 min", label: "第一次搭建" },
      { time: "12 min", label: "压力测试" },
      { time: "10 min", label: "复盘与重做" }
    ],
    resources: [
      { type: "SYLLABUS", title: "结构与承重", detail: "4 lessons · PDF" },
      { type: "SLIDES", title: "为什么桥不会倒？", detail: "32 pages · PPT" },
      { type: "MATERIALS", title: "课堂材料包", detail: "6 printables · ZIP" }
    ],
    note: "批注：不要先告诉他们三角形最稳定。让第一次倒塌替我们说话。",
    demoCta: "进入课程大纲图书馆"
  },
  activities: {
    eyebrow: "03 — 课堂活动",
    title: "知识不是被展示，而是在桌面上发生",
    body: "教学者和学生围在同一张桌子边。每一次讨论、每一个歪掉的模型、每一轮重新测试，都是课堂真正的内容。",
    photoCaption: "Bridge Lab · 结构设计工作坊 · 2026",
    projectLabel: "Student Works / 学生作品",
    projects: [
      { number: "A", type: "ENGINEERING DESIGN", title: "纸桥承重模型", detail: "从 120g 到 2.4kg，第四版终于撑住。" },
      { number: "B", type: "MATH EXPLORATION", title: "曲线与最短路径", detail: "用细线、图钉和一次意外绕路理解优化。" },
      { number: "C", type: "PROJECT", title: "会转弯的光", detail: "镜片、纸盒和一张写满修改的设计图。" }
    ],
    demoCta: "进入成果展览"
  },
  voices: {
    eyebrow: "04 — 听 TA 们说",
    title: "一次课堂以后，他们把什么带走？",
    leadQuote: "我以前觉得工程就是把正确答案做出来。后来才发现，模型倒下去的时候，我们才真的开始思考。",
    leadName: "林同学",
    leadGrade: "八年级 · Bridge Lab",
    sideStories: [
      { quote: "第一次有人认真问我：你为什么这样猜？", name: "周同学", grade: "七年级 · 数学探索" },
      { quote: "当我向同组的人解释清楚时，我才发现自己真的懂了。", name: "陈同学", grade: "九年级 · 学生助教" }
    ],
    closing: "Learning leaves a voice. / 学习会留下声音。",
    demoCta: "进入反馈"
  },
  footer: {
    eyebrow: "Keep the question open.",
    title: "下一堂课，从一个好问题开始",
    body: "METC · Math and Engineering Teaching Club\nStudent-created. Student-centered.",
    aboutLabel: "About METC",
    statementLabel: "Statements",
    aboutLinks: ["社团介绍", "联系我们", "加入我们"],
    statementLinks: ["隐私声明", "版权信息", "网站声明"],
    copyright: "© 2026 METC. All classroom stories shown are prototype content.",
    demo: "Frontend visual demo · No backend connected"
  },
  demoMessage: "这是前端视觉 Demo，该入口将在后续内容阶段开放。"
};
