import type { Language } from "../types";

export type LocalizedText = Record<Language, string>;

export type FeedbackVisualVariant = "petal" | "star" | "flower" | "glow";
export type FeedbackAccent = "coral" | "sun" | "sky" | "mint" | "rose" | "lavender";

export type StudentFeedback = {
  id: string;
  imageSrc: string;
  imageAlt: LocalizedText;
  year: string;
  grade?: LocalizedText;
  accent: FeedbackAccent;
  variant: FeedbackVisualVariant;
};
