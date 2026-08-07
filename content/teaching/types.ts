import type { Language } from "../types";

export type LocalizedText = Record<Language, string>;

export type CourseLesson = {
  id: string;
  number: string;
  title: LocalizedText;
  duration: string;
  description: LocalizedText;
  topics: LocalizedText[];
  challenge: LocalizedText;
};

export type MockSlide = {
  id: string;
  eyebrow?: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText;
  body?: LocalizedText;
  bullets?: LocalizedText[];
  quote?: LocalizedText;
  visual: "bridge" | "forces" | "triangles" | "brief" | "failure" | "coin" | "probability" | "tree" | "game";
};

export type LessonDeck = {
  id: string;
  lessonId: string;
  title: LocalizedText;
  description: LocalizedText;
  slideCount: number;
  slides: MockSlide[];
};

export type Course = {
  id: string;
  catalog: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  year: string;
  grades: string;
  duration: LocalizedText;
  color: "coral" | "blue";
  icon: "bridge" | "dice";
  objectives: LocalizedText[];
  lessons: CourseLesson[];
  decks: LessonDeck[];
};
