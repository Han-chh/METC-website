export type Language = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type ExploreCard = {
  id: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  kicker?: string;
  kind:
    | "activities"
    | "courses"
    | "works"
    | "voices"
    | "schools"
    | "archive"
    | "spirit"
    | "team";
};

export type WorkItem = {
  key: string;
  category: LocalizedText;
  title: LocalizedText;
  quote: LocalizedText;
  action: LocalizedText;
  artClass: "kaleidoscope" | "telescope" | "market" | "circuit";
};

export type ArchiveItem = {
  key: string;
  tab: string;
  title: LocalizedText;
  detail: LocalizedText;
  folderClass: string;
  photoClass: string;
  symbol: string;
};

export type VoiceItem = {
  key: string;
  quote: LocalizedText;
  detail: LocalizedText;
  noteClass: "yellow" | "pink" | "blue";
  topDecoration: "tape" | "pin";
};

export type SpiritLine = {
  number: string;
  title: string;
  text: LocalizedText;
};

export const missingSectionIds = new Set(["courses", "schools", "archive", "team"]);

export const homepageContent = {
  nav: [
    { href: "#explore", label: { zh: "探索 METC", en: "Explore METC" } },
    { href: "#works", label: { zh: "学生作品", en: "Student Works" } },
    { href: "#spirit", label: { zh: "社团灵魂", en: "Our Spirit" } }
  ],
  hero: {
    eyebrow: {
      zh: "动态品牌开场",
      en: "Dynamic brand opening"
    },
    lead: {
      zh: "把数学、工程与课堂现场写成一个可以被看见、被翻开、被继续探索的世界。",
      en: "Write mathematics, engineering, and live classrooms into a world that can be seen, opened, and explored."
    },
    body: {
      zh: "METC 的首页不再从一座卡通学校开始，而是从品牌本身开始：一支笔、一次真实书写、一道延伸到课程与作品现场的轨迹。",
      en: "The homepage no longer begins with a cartoon school. It begins with the brand itself: a pen, a real act of writing, and a trail that extends into courses, projects, and student work."
    },
    fullName: {
      zh: "Maths and Engineering Teaching Club",
      en: "Maths and Engineering Teaching Club"
    },
    slogan: {
      zh: "先有问题，再让课堂发生。",
      en: "Questions first. Then let the class happen."
    },
    primaryCta: {
      zh: "进入成果展览空间",
      en: "Enter the exhibition space"
    },
    secondaryCta: {
      zh: "查看首页模型",
      en: "Review the homepage model"
    },
    ribbonNotes: [
      { zh: "Curiosity", en: "Curiosity" },
      { zh: "Build", en: "Build" },
      { zh: "Teach", en: "Teach" }
    ],
    sideNotes: [
      { zh: "实验轨迹", en: "Experiment trail" },
      { zh: "课堂温度", en: "Classroom energy" },
      { zh: "学生作品", en: "Student works" }
    ]
  },
  about: {
    eyebrow: { zh: "不是先给答案", en: "Not answers first" },
    title: {
      zh: "先让学生去问、去做、去发现。",
      en: "First, let students ask, make, and discover."
    },
    body: {
      zh: "METC 把数学、物理、经济与工程带进真实课堂。我们设计问题、实验与作品，让每一个学生都留下可以被看见的参与痕迹。",
      en: "METC brings mathematics, physics, economics, and engineering into real classrooms. We design questions, experiments, and things to build, so every student leaves a visible trace of participation."
    },
    note: {
      zh: "课堂不是讲完，是发生。",
      en: "A class is not delivered. It happens."
    },
    boardTitle: {
      zh: "今天的黑板",
      en: "Today's blackboard"
    },
    boardQuestion: {
      zh: "如果光可以转弯，影子会去哪？",
      en: "If light could bend, where would the shadow go?"
    }
  },
  explore: {
    eyebrow: { zh: "探索这所社团", en: "Explore the club" },
    title: {
      zh: "每一个物件，都是一个内容入口。",
      en: "Every object is a content entrance."
    },
    body: {
      zh: "学校元素不再统治首屏，但仍然保留在中下部，作为课程、活动、作品与反馈的真实容器。",
      en: "School objects no longer dominate the hero, but they remain below as real containers for courses, activities, works, and feedback."
    },
    cards: [
      {
        id: "activities",
        href: "#activities",
        title: { zh: "活动与项目", en: "Activities" },
        description: { zh: "推开档案门，查看真实课堂项目。", en: "Open the archive and inspect real classroom projects." },
        kind: "activities"
      },
      {
        id: "courses",
        href: "#courses",
        title: { zh: "课程表", en: "Courses" },
        description: { zh: "教案、PPT、实验记录与课程结构。", en: "Lesson plans, slides, experiments, and course structure." },
        kicker: "MON - FRI",
        kind: "courses"
      },
      {
        id: "works",
        href: "#works",
        title: { zh: "学生作品", en: "Student Works" },
        description: { zh: "看他们亲手做出了什么。", en: "See what students actually built." },
        kind: "works"
      },
      {
        id: "voices",
        href: "#voices",
        title: { zh: "学生声音", en: "Student Voices" },
        description: { zh: "真实反馈，比 testimonial 更有力量。", en: "Real feedback, stronger than any testimonial." },
        kind: "voices"
      },
      {
        id: "schools",
        href: "#schools",
        title: { zh: "合作学校", en: "Partner Schools" },
        description: { zh: "路线、校牌和我们去过的地方。", en: "Routes, school markers, and the places we've been." },
        kind: "schools"
      },
      {
        id: "archive",
        href: "#archive",
        title: { zh: "社团档案", en: "Club Archive" },
        description: { zh: "把每次教学留下的材料收好。", en: "Store the materials each round of teaching leaves behind." },
        kind: "archive"
      },
      {
        id: "spirit",
        href: "#spirit",
        title: { zh: "社团灵魂", en: "Our Spirit" },
        description: { zh: "翻开这页，读 METC 的课堂原则。", en: "Turn the page and read the classroom principles behind METC." },
        kind: "spirit"
      },
      {
        id: "team",
        href: "#team",
        title: { zh: "团队", en: "Team" },
        description: { zh: "站在课堂另一边的人。", en: "The people on the other side of the classroom." },
        kind: "team"
      }
    ] satisfies ExploreCard[]
  },
  works: {
    eyebrow: { zh: "学生作品展", en: "Student Works Exhibition" },
    title: {
      zh: "比“听懂了”更重要的，是做出来了。",
      en: "Better than “I understood” is: “I made it.”"
    },
    items: [
      {
        key: "kaleidoscope",
        category: { zh: "光学 · 七年级", en: "Optics · Grade 7" },
        title: { zh: "会“变形”的万花筒", en: "A kaleidoscope that changes shape" },
        quote: { zh: "“我转了一下，里面像多了一个宇宙。”", en: "“I turned it once and there was a whole universe inside.”" },
        action: { zh: "查看制作过程 ↗", en: "See how it was made ↗" },
        artClass: "kaleidoscope"
      },
      {
        key: "telescope",
        category: { zh: "工程 · 八年级", en: "Engineering · Grade 8" },
        title: { zh: "纸筒望远镜", en: "Cardboard telescope" },
        quote: { zh: "“第一次发现，失败的模型也可以继续改。”", en: "“I learned a failed model can still be improved.”" },
        action: { zh: "查看制作过程 ↗", en: "See how it was made ↗" },
        artClass: "telescope"
      },
      {
        key: "market",
        category: { zh: "经济学 · 八年级", en: "Economics · Grade 8" },
        title: { zh: "我们的第一家公司", en: "Our first company" },
        quote: { zh: "“价格不是越低越好，我们差点把自己卖亏了。”", en: "“Cheaper wasn't always better — we almost sold at a loss.”" },
        action: { zh: "打开项目档案 ↗", en: "Open project file ↗" },
        artClass: "market"
      },
      {
        key: "circuit",
        category: { zh: "物理 · 七年级", en: "Physics · Grade 7" },
        title: { zh: "让灯真正亮起来", en: "Make the light actually turn on" },
        quote: { zh: "“我们三次都接错了，第四次它突然亮了。”", en: "“We wired it wrong three times. The fourth time, it lit up.”" },
        action: { zh: "查看实验记录 ↗", en: "See experiment notes ↗" },
        artClass: "circuit"
      }
    ] satisfies WorkItem[]
  },
  archive: {
    eyebrow: { zh: "活动成果", en: "Activity Archive" },
    title: {
      zh: "每次活动，都留下一本可以再次打开的档案。",
      en: "Every activity leaves a file we can open again."
    },
    items: [
      {
        key: "optics",
        tab: "OPTICS / 2026",
        title: { zh: "光学：从影子到万花筒", en: "Optics: From shadows to kaleidoscopes" },
        detail: { zh: "8 课时 · 42 名学生 · 67 件作品", en: "8 lessons · 42 students · 67 works" },
        folderClass: "folder-yellow",
        photoClass: "prism-photo",
        symbol: "△"
      },
      {
        key: "econ",
        tab: "ECON / 2026",
        title: { zh: "微观经济学：开一家小公司", en: "Microeconomics: Build a small company" },
        detail: { zh: "8 课时 · 模拟市场 · 学生路演", en: "8 lessons · simulation · student pitches" },
        folderClass: "folder-red",
        photoClass: "econ-photo",
        symbol: "¥"
      },
      {
        key: "online",
        tab: "ONLINE / 2025",
        title: { zh: "在线课堂：把互动送到另一间教室", en: "Online classrooms: Send interaction across distance" },
        detail: { zh: "跨校协作 · 实时挑战 · 课后作品", en: "Cross-school collaboration · live challenges · after-class works" },
        folderClass: "folder-blue",
        photoClass: "online-photo",
        symbol: "◫"
      }
    ] satisfies ArchiveItem[]
  },
  voices: {
    eyebrow: { zh: "学生声音", en: "Student Voices" },
    title: {
      zh: "最好的反馈，不像 testimonial。",
      en: "The best feedback doesn't sound like a testimonial."
    },
    items: [
      {
        key: "voice-a",
        quote: { zh: "“我本来不想举手，但我们组的模型坏了，只能去问。”", en: "“I didn't want to raise my hand, but our model broke, so I had to ask.”" },
        detail: { zh: "七年级学生 · 光学课程", en: "Grade 7 student · Optics" },
        noteClass: "yellow",
        topDecoration: "tape"
      },
      {
        key: "voice-b",
        quote: { zh: "“我以前觉得经济就是赚钱，后来发现亏钱也有很多理由。”", en: "“I thought economics was just about making money. Then I learned there are many ways to lose it.”" },
        detail: { zh: "八年级学生 · 微观经济学", en: "Grade 8 student · Microeconomics" },
        noteClass: "pink",
        topDecoration: "pin"
      },
      {
        key: "voice-c",
        quote: { zh: "“老师说没有标准答案，所以我们真的做了四种不一样的。”", en: "“They said there was no standard answer, so we really made four different versions.”" },
        detail: { zh: "学生小组 · 工程活动", en: "Student team · Engineering activity" },
        noteClass: "blue",
        topDecoration: "tape"
      }
    ] satisfies VoiceItem[]
  },
  spirit: {
    eyebrow: { zh: "社团灵魂", en: "The Spirit of METC" },
    closing: { zh: "下次，做得更好。", en: "Next time, better." },
    lines: [
      {
        number: "01",
        title: "Curiosity before answers.",
        text: { zh: "先有问题，再有讲解。", en: "Questions come before explanations." }
      },
      {
        number: "02",
        title: "Learning by doing.",
        text: { zh: "能亲手做，就不要只在屏幕上看。", en: "If it can be built, don't only show it on a screen." }
      },
      {
        number: "03",
        title: "Every student participates.",
        text: { zh: "不是只有最先举手的人在上课。", en: "Class belongs to more than the first hand raised." }
      },
      {
        number: "04",
        title: "Teaching is also learning.",
        text: { zh: "每一堂课，也在重新教育我们。", en: "Every class teaches us, too." }
      }
    ] satisfies SpiritLine[]
  },
  footer: {
    eyebrow: { zh: "今天的课结束了", en: "Class is over for today" },
    title: { zh: "但问题还没有。", en: "The questions aren't." },
    body: {
      zh: "继续探索 METC 的活动、课程、学生作品与故事。",
      en: "Keep exploring METC's activities, courses, student works, and stories."
    },
    links: [
      { href: "#explore", label: { zh: "探索 METC", en: "Explore METC" } },
      { href: "mailto:hello@example.com", label: { zh: "联系我们", en: "Contact" } },
      { href: "#top", label: { zh: "回到顶部 ↑", en: "Back to top ↑" } }
    ]
  }
} as const;

export function localize(text: LocalizedText, language: Language) {
  return text[language];
}
