import { en } from "./en";
import type { HomepageCopy, Language } from "./types";
import { zh } from "./zh";

export const homepageCopy: Record<Language, HomepageCopy> = { zh, en };

export type { HomepageCopy, Language } from "./types";
