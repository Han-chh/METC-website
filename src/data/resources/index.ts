import courseData from "./generated/courses.json";
import albumData from "./generated/albums.json";

export type ResourceDeck = {
  id: string;
  title: string;
  source: string;
  pdf: string | null;
  slideCount: number;
  slides: string[];
};

export type LocalizedCourseTitle = {
  zh: string;
  en: string;
};

export type LocalizedCourseItems = {
  zh: string[];
  en: string[];
};

export type LocalizedResourcePath = {
  zh: string | null;
  en: string | null;
};

export type ResourceCourse = {
  id: string;
  catalog: string;
  title: LocalizedCourseTitle;
  school: string;
  category: LocalizedCourseTitle;
  color: "coral" | "blue" | "mint";
  icon: "market" | "light" | "spark";
  summary: LocalizedCourseTitle;
  contains: LocalizedCourseItems;
  hasSyllabus: boolean;
  syllabus: LocalizedResourcePath;
  syllabusSource: LocalizedResourcePath;
  lessons: ResourceDeck[];
};

export type ResourcePhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  size: "wide" | "portrait" | "standard";
};

export type ResourceAlbum = {
  id: string;
  school: string;
  title: string;
  subtitle: string;
  description: string;
  accent: "coral" | "sky" | "mint";
  photos: ResourcePhoto[];
};

export const resourceCourses = courseData as ResourceCourse[];
export const resourceAlbums = albumData as ResourceAlbum[];
