import { SearchPanel } from "@/components/SearchPanel";
import { useState } from "react";

export type Language = "Inglês" | "Alemão";

export function SearchPage() {
  const [language, setLanguage] = useState<Language>("Inglês");

  return (
    <>
      <div className="bg-surface/30 backdrop-blur-md rounded-full p-1 inline-flex self-center mb-10 md:mb-16 shadow-xl border border-white/5">
        {(["Inglês", "Alemão"] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              language === lang
                ? "bg-surface/60 text-emerald-accent shadow-[0_0_15px_rgba(0,100,102,0.2)] border border-emerald-accent/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="w-full">
        <SearchPanel language={language} />
      </div>
    </>
  );
}
