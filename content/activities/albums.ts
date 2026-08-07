import type { ActivityAlbum, GalleryPhoto, LocalizedText } from "./types";

const image = "/METC-website/images/metc-classroom-workshop.png";
const sharedAlt: LocalizedText = {
  zh: "METC 课堂工作坊中的学生与教学者",
  en: "Students and educators during a METC classroom workshop"
};

function photos(prefix: string, count: number, captions: Array<LocalizedText | undefined>, positions: string[]): GalleryPhoto[] {
  const sizes: GalleryPhoto["size"][] = ["featured", "portrait", "wide", "standard", "standard", "wide", "portrait", "standard", "wide"];
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    src: image,
    alt: sharedAlt,
    caption: captions[index],
    position: positions[index % positions.length],
    size: sizes[index]
  }));
}

export const albums: ActivityAlbum[] = [
  {
    id: "bridge-building-day",
    title: { zh: "桥梁搭建挑战", en: "Bridge Building Challenge" },
    subtitle: { zh: "工程结构课程 · 2026", en: "Engineering Structures · 2026" },
    description: { zh: "从纸张与有限材料开始，学生们设计、搭建并测试自己的桥梁结构。", en: "Starting with paper and limited materials, students designed, built, and load-tested their own bridge structures." },
    year: "2026",
    category: { zh: "工程", en: "Engineering" },
    coverPhotoId: "bridge-building-day-1",
    accent: "coral",
    photos: photos("bridge-building-day", 8, [
      { zh: "第一次测试纸桥承重", en: "The first paper-bridge load test" },
      { zh: "学生比较不同桁架结构", en: "Comparing different truss structures" },
      { zh: "加载砝码前的最终检查", en: "Final checks before adding load" },
      { zh: "桥梁失效后的重新设计", en: "Redesigning after structural failure" }
    ], ["48% 50%", "28% 44%", "66% 38%", "77% 56%"])
  },
  {
    id: "probability-lab",
    title: { zh: "概率实验室", en: "Probability Lab" },
    subtitle: { zh: "概率与随机 · 2026", en: "Probability & Randomness · 2026" },
    description: { zh: "硬币、骰子和一次又一次实验，把抽象概率变成可以亲手观察的数据。", en: "Coins, dice, and repeated experiments turned abstract probability into something students could observe for themselves." },
    year: "2026",
    category: { zh: "数学", en: "Mathematics" },
    coverPhotoId: "probability-lab-1",
    accent: "sky",
    photos: photos("probability-lab", 7, [
      { zh: "记录第一轮硬币实验", en: "Recording the first coin-toss trial" },
      { zh: "比较理论概率与实验结果", en: "Comparing theoretical probability and results" },
      { zh: "学生设计自己的概率游戏", en: "Students design their own probability game" }
    ], ["37% 46%", "60% 50%", "78% 40%", "18% 58%"])
  },
  {
    id: "creative-engineering-workshop",
    title: { zh: "创意工程工作坊", en: "Creative Engineering Workshop" },
    subtitle: { zh: "设计 · 搭建 · 测试", en: "Design · Build · Test" },
    description: { zh: "学生从一个开放问题出发，在讨论、制作与不断修改中完成自己的工程作品。", en: "Students began with an open-ended problem and developed their engineering ideas through discussion, making, testing, and revision." },
    year: "2026",
    category: { zh: "工作坊", en: "Workshop" },
    coverPhotoId: "creative-engineering-workshop-1",
    accent: "mint",
    photos: photos("creative-engineering-workshop", 9, [
      { zh: "从草图开始", en: "Starting from a sketch" },
      { zh: "第一次原型制作", en: "The first prototype" },
      { zh: "小组测试不同设计", en: "Groups testing different designs" },
      { zh: "修改后的最终作品", en: "The final work after revisions" }
    ], ["54% 48%", "22% 45%", "70% 55%", "83% 34%"])
  }
];
