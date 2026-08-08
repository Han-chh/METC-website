import type { Language } from "../../content";
import type { ResourceCourse, ResourceDeck } from "../../src/data/resources";

type Props = { course: ResourceCourse; language: Language; onOpenDeck: (deck: ResourceDeck) => void };

export function PptArchive({ course, language, onOpenDeck }: Props) {
  const title = course.title[language];
  const copy = language === "zh" ? { title: "课堂幻灯片", open: "预览", slides: "页", none: "本课程暂未添加课件。" } : { title: "Lesson slides", open: "Preview", slides: "slides", none: "No lesson decks have been added yet." };
  return <div className="ppt-archive"><div className="book-page-meta"><span>{copy.title}</span><span>{course.lessons.length} {language === "zh" ? "份课件" : "decks"}</span></div><div className="ppt-archive-heading"><h2>{copy.title}</h2><p>{title}</p></div><div className="ppt-deck-list">{course.lessons.map((deck, index) => <button type="button" key={deck.id} onClick={() => onOpenDeck(deck)} className={`ppt-deck-card ppt-deck-${course.color}`}><span className="deck-number">{String(index + 1).padStart(2, "0")}</span><span className="deck-visual" aria-hidden="true">▧</span><strong>{deck.title}</strong><small>{deck.source}</small><footer><span>{deck.slideCount} {copy.slides}</span><b>{copy.open} →</b></footer></button>)}</div>{course.lessons.length === 0 && <p className="ppt-margin-note">{copy.none}</p>}<p className="ppt-margin-note" aria-hidden="true">{language === "zh" ? "每一课都从一个问题开始。" : "Every lesson begins with a question."}</p></div>;
}
