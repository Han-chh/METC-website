import type { Language } from "../types";

export type LocalizedText = Record<Language, string>;

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  position?: string;
  size: "featured" | "wide" | "portrait" | "standard";
};

export type ActivityAlbum = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  year: string;
  category: LocalizedText;
  coverPhotoId: string;
  accent: "coral" | "sky" | "mint";
  photos: GalleryPhoto[];
};
