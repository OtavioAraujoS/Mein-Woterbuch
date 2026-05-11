import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { WordEntry } from "@/types/WordEntry";
import WordCard from "@/components/WordCard";

export default function Library() {
  const [savedWords, setSavedWords] = useState<WordEntry[]>(() => {
    const local = localStorage.getItem("midnight_slate_words");
    return local ? JSON.parse(local) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("midnight_slate_words", JSON.stringify(savedWords));
  }, [savedWords]);

  const filteredSavedWords = useMemo(() => {
    return savedWords.filter((w) =>
      w.word.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [savedWords, searchQuery]);

  const removeWord = (id: string) => {
    setSavedWords((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <main className="flex-1 min-h-screen p-8 lg:p-16 w-full text-zinc-100 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key="saved-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-10"
        >
          <header className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Biblioteca de palavras
            </h2>
            <div className="flex items-center gap-2 text-sm text-cyan-400/80">
              <div className="w-2 h-2 rounded-full bg-cyan-400 glow-cyan animate-pulse" />
              <span>{savedWords.length} palavras sincronizadas</span>
            </div>
          </header>

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Procure por uma palavra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-sm py-4 pl-12 pr-4 outline-none focus:border-cyan-500/50 glow-cyan focus:ring-0 transition-all text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredSavedWords.map((word) => (
                <WordCard key={word.id} entry={word} onRemove={removeWord} />
              ))}
            </AnimatePresence>
          </div>

          {filteredSavedWords.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <Search className="w-12 h-12 text-zinc-800 mx-auto" />
              <p className="text-zinc-500 italic">
                Nenhuma palavra encontrada para "{searchQuery}"
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
