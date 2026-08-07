import type { Course, LessonDeck } from "../../content/teaching";
import type { Language } from "../../content";

type PptArchiveProps = { course: Course; language: Language; onOpenDeck: (deck: LessonDeck) => void };

export function PptArchive({ course, language, onOpenDeck }: PptArchiveProps) {
  const copy = language === "zh" ? { title: "课堂幻灯片", count: "4 份课件", open: "预览" } : { title: "Lesson slides", count: "4 lesson decks", open: "Preview" };
  return <div className="ppt-archive"><div className="book-page-meta"><span>{copy.title}</span><span>{copy.count}</span></div><div className="ppt-archive-heading"><h2>{copy.title}</h2><p>{course.shortTitle[language]}</p></div><div className="ppt-deck-list">{course.decks.map((deck, index) => <button type="button" key={deck.id} onClick={() => onOpenDeck(deck)} className={`ppt-deck-card ppt-deck-${course.color}`}><span className="deck-number">{String(index + 1).padStart(2, "0")}</span><span className="deck-visual" aria-hidden="true">{course.icon === "bridge" ? "⌁" : "⚄"}</span><strong>{deck.title[language]}</strong><small>{deck.description[language]}</small><footer><span>{deck.slideCount} {language === "zh" ? "页" : "slides"}</span><b>{copy.open} →</b></footer></button>)}</div><p className="ppt-margin-note" aria-hidden="true">{language === "zh" ? "每一课都从一个问题开始。" : "Every lesson begins with a question."}</p></div>;
}
