import { useEffect, useRef } from "react";
import type { LessonDeck, MockSlide } from "../../content/teaching";
import type { Language } from "../../content";

type PptPreviewProps = { deck: LessonDeck; language: Language; color: "coral" | "blue"; currentSlide: number; onPrevious: () => void; onNext: () => void; onSelect: (index: number) => void; onClose: () => void };

function SlideVisual({ visual }: { visual: MockSlide["visual"] }) {
  if (visual === "bridge" || visual === "forces" || visual === "triangles" || visual === "brief" || visual === "failure") return <svg className={`slide-visual slide-visual-${visual}`} viewBox="0 0 330 210" aria-hidden="true"><path className="slide-ground" d="M22 180h286" />{visual === "triangles" ? <><path d="M52 164 163 46l112 118zM52 164h223M108 104h111M108 104l55 60 55-60" /><circle cx="163" cy="46" r="10" /></> : visual === "brief" ? <><rect x="55" y="38" width="218" height="132" rx="5" /><path d="M80 76h116M80 96h160M80 116h133M80 136h77" /><path className="slide-arrow" d="m230 58 18 14-18 14" /></> : visual === "failure" ? <><path d="M46 156 109 83l54 73 58-73 62 73M46 156h237M163 156V77" /><path className="slide-dash" d="M163 77 192 43M163 77l-29-34" /><path className="slide-cross" d="m199 34 28 28m0-28-28 28" /></> : <><path d="M30 164h270M49 164l66-82 59 82 58-82 67 82M115 82h117M49 164l125-82 58 82" /><circle cx="174" cy="39" r="16" />{visual === "forces" && <><path className="slide-arrow" d="M174 57v48m-12-15 12 15 12-15M115 83l-39 37m5-18-5 18 18-5M232 83l38 37m-18-5 18 5-5-18" /></>}</>}</svg>;
  if (visual === "tree") return <svg className="slide-visual slide-visual-tree" viewBox="0 0 330 210" aria-hidden="true"><circle cx="56" cy="105" r="19" /><path d="M75 105h63M138 105 212 58M138 105l74 47M212 58h70M212 152h70" /><circle cx="215" cy="58" r="16" /><circle cx="215" cy="152" r="16" /><text x="49" y="110">?</text><text x="208" y="63">A</text><text x="208" y="157">B</text></svg>;
  if (visual === "game") return <svg className="slide-visual slide-visual-game" viewBox="0 0 330 210" aria-hidden="true"><path d="M61 165c0-63 58-117 130-117 38 0 64 13 83 38" /><path d="m260 67 13 20-24 2" /><circle cx="89" cy="138" r="18" /><circle cx="157" cy="72" r="18" /><circle cx="227" cy="125" r="18" /><path d="M107 132l34-46m33 4 37 26" /></svg>;
  return <svg className="slide-visual slide-visual-coin" viewBox="0 0 330 210" aria-hidden="true"><circle cx="115" cy="108" r="57" /><circle cx="215" cy="108" r="57" /><text x="94" y="123">H</text><text x="195" y="123">T</text><path d="M46 36h238M46 180h238" /></svg>;
}

export function PptPreview({ deck, language, color, currentSlide, onPrevious, onNext, onSelect, onClose }: PptPreviewProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const slide = deck.slides[currentSlide];
  const copy = language === "zh" ? { previous: "上一页", next: "下一页", close: "关闭课件预览", slides: "张幻灯片" } : { previous: "Previous slide", next: "Next slide", close: "Close slide preview", slides: "slides" };
  useEffect(() => { previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; closeRef.current?.focus(); return () => previousFocusRef.current?.focus(); }, []);
  function trapFocus(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !viewerRef.current) return;
    const focusable = Array.from(viewerRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return <div className="ppt-modal" role="dialog" aria-modal="true" aria-label={`${deck.title[language]} ${language === "zh" ? "课件预览" : "slide preview"}`}><div className="ppt-modal-backdrop" onClick={onClose} aria-hidden="true" /><section ref={viewerRef} onKeyDown={trapFocus} className={`ppt-viewer ppt-viewer-${color}`}><header><div><p>{deck.title[language]}</p><span>{deck.slideCount} {copy.slides}</span></div><button ref={closeRef} type="button" onClick={onClose} aria-label={copy.close}>×</button></header><div className="ppt-stage"><span className="ppt-slide-number">{String(currentSlide + 1).padStart(2, "0")}</span><div className="ppt-slide-copy">{slide.eyebrow && <p className="ppt-eyebrow">{slide.eyebrow[language]}</p>}<h2>{slide.title[language]}</h2>{slide.subtitle && <p className="ppt-subtitle">{slide.subtitle[language]}</p>}{slide.body && <p className="ppt-body">{slide.body[language]}</p>}{slide.bullets && <ul>{slide.bullets.map((bullet) => <li key={bullet[language]}>{bullet[language]}</li>)}</ul>}{slide.quote && <blockquote>{slide.quote[language]}</blockquote>}</div><SlideVisual visual={slide.visual} /></div><footer className="ppt-controls"><button type="button" onClick={onPrevious} disabled={currentSlide === 0} aria-label={copy.previous}>←</button><div><span>{currentSlide + 1} / {deck.slides.length}</span><div className="ppt-thumbnails">{deck.slides.map((item, index) => <button type="button" aria-label={`${language === "zh" ? "前往第" : "Go to"} ${index + 1} ${language === "zh" ? "页" : "slide"}`} onClick={() => onSelect(index)} className={index === currentSlide ? "active" : ""} key={item.id}>{index + 1}</button>)}</div></div><button type="button" onClick={onNext} disabled={currentSlide === deck.slides.length - 1} aria-label={copy.next}>→</button></footer></section></div>;
}
