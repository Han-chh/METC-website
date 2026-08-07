import type { Language } from "../types";

export const voicesPageCopy: Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  unopened: string;
  visited: string;
  reset: string;
  resetAria: string;
  open: string;
  opened: string;
  close: string;
  previous: string;
  next: string;
  archive: string;
  voice: string;
}> = {
  zh: {
    eyebrow: "STUDENT VOICES · METC MEMORIES",
    title: "每一句话，都留在这里发光",
    body: "那些写在纸上的感受、课堂后的留言和没有被忘记的瞬间，都成为这里的一片花瓣",
    unopened: "未读",
    visited: "已看过",
    reset: "重置已读状态",
    resetAria: "清除所有已查看的学生反馈状态",
    open: "打开这份留言",
    opened: "已查看",
    close: "关闭反馈",
    previous: "上一份反馈",
    next: "下一份反馈",
    archive: "反馈星海",
    voice: "学生反馈"
  },
  en: {
    eyebrow: "STUDENT VOICES · METC MEMORIES",
    title: "Every voice leaves a little light",
    body: "Notes written after class, small reflections, and moments worth remembering become petals in this archive",
    unopened: "Unread",
    visited: "Read",
    reset: "Reset viewed",
    resetAria: "Clear all viewed student feedback states",
    open: "Open this note",
    opened: "Visited",
    close: "Close feedback",
    previous: "Previous feedback",
    next: "Next feedback",
    archive: "VOICES CONSTELLATION",
    voice: "Student feedback"
  }
};
