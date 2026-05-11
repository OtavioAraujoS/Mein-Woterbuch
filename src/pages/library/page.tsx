/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { WordEntry } from "@/types/WordEntry";
import WordCard from "@/components/WordCard";
import { supabase } from "@/lib/supabase";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { toast } from "sonner";
import { LibraryWordFormDialog } from "@/components/library/LibraryWordFormDialog";
import { Pagination } from "@/components/Pagination";

const PAGE_SIZE = 9;

export default function Library() {
  const [savedWords, setSavedWords] = useState<WordEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [editingWord, setEditingWord] = useState<WordEntry | null>(null);

  const fetchSavedWords = useCallback(async () => {
    setIsLoading(true);

    let query = supabase
      .from("words")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (searchQuery) {
      query = query.ilike("word", `%${searchQuery}%`);
    }

    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await query.range(from, to);

    if (!error && data) {
      setSavedWords(data);
      setTotalCount(count || 0);
    }
    setIsLoading(false);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchSavedWords();
  }, [fetchSavedWords]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const removeWord = async (id: string) => {
    const { error } = await supabase.from("words").delete().eq("id", id);

    if (!error) {
      toast.success("Palavra removida");
      fetchSavedWords();
    } else {
      toast.error("Erro ao deletar palavra");
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

          <LibraryWordFormDialog
            isOpen={!!editingWord}
            onClose={() => setEditingWord(null)}
            onSuccess={fetchSavedWords}
            showTrigger={false}
            initialData={
              editingWord
                ? {
                    word: editingWord.word,
                    definition: editingWord.definition,
                    example: editingWord.example || "",
                    id: editingWord.id,
                  }
                : undefined
            }
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              <p className="text-zinc-500">Conectando ao banco de dados...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {savedWords.map((word) => (
                    <WordCard
                      key={word.id}
                      entry={word}
                      onRemove={removeWord}
                      onEdit={setEditingWord}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                disabled={isLoading}
              />
            </>
          )}

          {!isLoading && savedWords.length === 0 && (
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
