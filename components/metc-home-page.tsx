"use client";

import { useEffect, useState } from "react";
import { missingSectionIds, type Language } from "../data/homepage-content";
import { AboutSection } from "./homepage/about-section";
import { ArchiveSection } from "./homepage/archive-section";
import { ExploreSection } from "./homepage/explore-section";
import { HeroSection } from "./homepage/hero-section";
import { SiteFooter } from "./homepage/site-footer";
import { SiteHeader } from "./homepage/site-header";
import { SpiritSection } from "./homepage/spirit-section";
import { VoicesSection } from "./homepage/voices-section";
import { WorksSection } from "./homepage/works-section";

const LANGUAGE_STORAGE_KEY = "metc-language";

export function MetcHomePage() {
  const [language, setLanguage] = useState<Language>("zh");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    setLanguage(browserLanguage.startsWith("zh") ? "zh" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const nodes = document.querySelectorAll(".reveal");
    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-enabled");
    };
  }, []);

  useEffect(() => {
    if (!toastVisible) {
      return;
    }

    const timer = window.setTimeout(() => setToastVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  useEffect(() => {
    const interactiveNodes = document.querySelectorAll(".campus-object, .work-card");

    const cleanup = Array.from(interactiveNodes).map((node) => {
      const onMove = (event: Event) => {
        if (window.innerWidth < 720 || !(event instanceof MouseEvent)) {
          return;
        }

        const element = node as HTMLElement;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        element.style.setProperty("--mx", `${x}px`);
        element.style.setProperty("--my", `${y}px`);
      };

      const reset = () => {
        const element = node as HTMLElement;
        element.style.removeProperty("--mx");
        element.style.removeProperty("--my");
      };

      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseleave", reset);
      return () => {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseleave", reset);
      };
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
    };
  }, []);

  function toggleLanguage() {
    setLanguage((current) => (current === "zh" ? "en" : "zh"));
  }

  function showPrototypeToast() {
    setToastMessage(
      language === "zh"
        ? "这是首页原型：该入口将在后续子页面中实现。"
        : "Homepage prototype: this doorway will open in a future page."
    );
    setToastVisible(true);
  }

  function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) {
      return;
    }

    const targetId = href.slice(1);
    if (missingSectionIds.has(targetId)) {
      event.preventDefault();
      showPrototypeToast();
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <SiteHeader language={language} onToggleLanguage={toggleLanguage} onAnchorClick={handleAnchorClick} />

      <main id="top" className="page-shell">
        <HeroSection language={language} onAnchorClick={handleAnchorClick} />
        <AboutSection language={language} />
        <ExploreSection language={language} onAnchorClick={handleAnchorClick} />
        <WorksSection language={language} />
        <ArchiveSection language={language} />
        <VoicesSection language={language} />
        <SpiritSection language={language} />
        <SiteFooter language={language} onAnchorClick={handleAnchorClick} />
      </main>

      <div className={`prototype-toast${toastVisible ? " show" : ""}`} id="prototypeToast" role="status" aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
}
