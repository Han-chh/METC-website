"use client";

import { useEffect, useState } from "react";
import { homepageCopy, type Language } from "../content";
import { TeachingSection } from "./homepage/archive-section";
import { ExploreSection } from "./homepage/explore-section";
import { HeroSection } from "./homepage/hero-section";
import { SiteFooter } from "./homepage/site-footer";
import { SiteHeader } from "./homepage/site-header";
import { VoicesSection } from "./homepage/voices-section";
import { ActivitySection } from "./homepage/works-section";

const LANGUAGE_STORAGE_KEY = "metc-language";

export function MetcHomePage() {
  const [language, setLanguage] = useState<Language>("zh");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      return;
    }
    setLanguage(window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
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
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6%" }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-enabled");
    };
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 2300);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="site-atmosphere" aria-hidden="true">
        <i className="atmosphere-snow snow-1" /><i className="atmosphere-snow snow-2" /><i className="atmosphere-snow snow-3" /><i className="atmosphere-snow snow-4" />
        <i className="atmosphere-snow snow-5" /><i className="atmosphere-snow snow-6" /><i className="atmosphere-snow snow-7" />
        <i className="atmosphere-rain rain-1" /><i className="atmosphere-rain rain-2" /><i className="atmosphere-rain rain-3" /><i className="atmosphere-rain rain-4" />
        <i className="atmosphere-rain rain-5" /><i className="atmosphere-rain rain-6" /><i className="atmosphere-rain rain-7" />
        <i className="atmosphere-meteor meteor-1" /><i className="atmosphere-meteor meteor-2" /><i className="atmosphere-meteor meteor-3" />
      </div>
      <SiteHeader
        language={language}
        onToggleLanguage={() => setLanguage((current) => current === "zh" ? "en" : "zh")}
        onAnchorClick={handleAnchorClick}
      />
      <main className="page-shell">
        <HeroSection language={language} onAnchorClick={handleAnchorClick} />
        <ExploreSection language={language} />
        <TeachingSection language={language} onDemoClick={() => setToastVisible(true)} />
        <ActivitySection language={language} onDemoClick={() => setToastVisible(true)} />
        <VoicesSection language={language} />
      </main>
      <SiteFooter language={language} onDemoClick={() => setToastVisible(true)} />
      <div className={`prototype-toast${toastVisible ? " show" : ""}`} role="status" aria-live="polite">
        {homepageCopy[language].demoMessage}
      </div>
    </>
  );
}
