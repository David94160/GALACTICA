import { useState, useEffect } from "react";
import { translations, type Language } from "../i18n/translations";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("sirius-lang") as Language;
    if (saved && (saved === "fr" || saved === "en")) {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("sirius-lang", newLang);
  };

  const t = translations[lang];

  return { lang, setLang, toggleLang, t };
}
