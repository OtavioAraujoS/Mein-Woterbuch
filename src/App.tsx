import { useState } from "react";
import { Search, History, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import "./index.css";
import { Sidebar } from "@/layout/Sidebar";
import { DiscoveryCard } from "@/components/DiscoveryCard";

type Language = "Inglês" | "Alemão";

export default function App() {
  const [language, setLanguage] = useState<Language>("Inglês");
  const [searchQuery, setSearchQuery] = useState("");

  const trending = ["Schadenfreude", "Weltschmerz", "Zeitgeist", "Petrichor"];

  return (
    <div className="min-h-screen flex text-text-primary font-sans overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-accent/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-surface/20 blur-[100px] pointer-events-none z-0" />

      <Sidebar />

      <main className="flex-1 md:ml-[240px] relative z-10 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-[600px] px-6 pt-12 md:pt-20 pb-24 md:pb-12 flex flex-col min-h-screen">
          <div className="bg-surface/30 backdrop-blur-md rounded-full p-1 inline-flex self-center mb-16 shadow-xl border border-white/5">
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

          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-2xl p-2 focus-within:shadow-[0_0_30px_rgba(0,100,102,0.15)] focus-within:border-emerald-accent/40 transition-all duration-500 flex items-center group mb-8"
            >
              <div className="px-4 text-text-muted group-focus-within:text-emerald-accent transition-colors">
                <Search size={32} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar palavras..."
                className="w-full bg-transparent border-none text-text-primary text-2xl md:text-3xl placeholder:text-text-muted/20 focus:ring-0 px-2 py-4 font-light"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              className="flex flex-col items-center gap-5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted">
                Pesquisas Populares
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {trending.map((term) => (
                  <button
                    key={term}
                    className="font-mono text-xs text-text-muted hover:text-text-primary px-4 py-2 glass-panel rounded-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 md:mt-24">
            <h2 className="text-xl font-semibold text-text-primary mb-8 tracking-tight">
              Explore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DiscoveryCard
                title="Palavra do dia"
                icon={<Sparkles size={24} />}
                highlight="Defenestração"
                description="O ato de jogar alguém pela janela."
                accent
              />

              <DiscoveryCard
                title="Pesquisadas Recentemente"
                icon={<History size={24} />}
                items={["Ephemeral", "Sycophant", "Obfuscate"]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
