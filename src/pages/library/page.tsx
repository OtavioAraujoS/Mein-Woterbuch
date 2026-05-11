/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { WordEntry } from "@/types/WordEntry";
import WordCard from "@/components/WordCard";
import { supabase } from "@/lib/supabase";
import { LibraryHeader } from "@/components/library/LibraryHeader";

export default function Library() {
  const [savedWords, setSavedWords] = useState<WordEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedWords = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSavedWords(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSavedWords();
  }, [fetchSavedWords]);

  const filteredSavedWords = useMemo(() => {
    return savedWords.filter((w) =>
      w.word.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [savedWords, searchQuery]);

  const removeWord = async (id: string) => {
    const { error } = await supabase.from("words").delete().eq("id", id);

    if (!error) {
      setSavedWords((prev) => prev.filter((w) => w.id !== id));
    } else {
      console.error("Erro ao deletar:", error.message);
    }
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
          <LibraryHeader
            savedWords={savedWords}
            isLoading={isLoading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSuccess={fetchSavedWords}
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              <p className="text-zinc-500">Conectando ao banco de dados...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredSavedWords.map((word) => (
                  <WordCard key={word.id} entry={word} onRemove={removeWord} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredSavedWords.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <Search className="w-12 h-12 text-zinc-800 mx-auto" />
              <p className="text-zinc-500 italic">
                {searchQuery
                  ? `Nenhuma palavra encontrada para "${searchQuery}"`
                  : "Sua biblioteca está vazia."}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
