import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SearchHeader } from "./search/SearchHeader";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { SearchFooter } from "./search/SearchFooter";
import { SearchWordDetailDialog } from "./search/SearchWordDetailDialog";
import { useLexiconSearch } from "@/hooks/useLexiconSearch";

interface SearchPanelProps {
  initialQuery?: string;
}

export function SearchPanel({ initialQuery = "" }: SearchPanelProps) {
  const {
    query,
    setQuery,
    results,
    activeIdx,
    setActiveIdx,
    isLoading,
    isDebouncing,
    responseTime,
    selectedWord,
    setSelectedWord,
    clearSearch,
    handleWordClick,
  } = useLexiconSearch({ initialQuery });

  const [, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!query.trim() || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const entry = results[activeIdx];
        if (entry) {
          handleWordClick(entry);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [query, results, activeIdx, setActiveIdx, handleWordClick],
  );

  useEffect(() => {
    const active = listRef.current?.children[activeIdx] as HTMLElement;
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  return (
    <div className="w-full max-w-[600px]">
      <SearchHeader responseTime={responseTime} />

      <div className="border transition-all duration-300 border-emerald-accent/30 focus-within:border-emerald-accent/60 bg-surface/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
        <SearchInput
          query={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          onClear={clearSearch}
          inputRef={inputRef}
        />

        <AnimatePresence>
          {query.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-white/[0.02]"
            >
              <SearchResults
                results={results}
                activeIdx={activeIdx}
                onHover={setActiveIdx}
                onClick={(entry) => {
                  setQuery(entry.word);
                  setIsOpen(false);
                  handleWordClick(entry);
                }}
                listRef={listRef}
                query={query}
                isDebouncing={isDebouncing}
                isLoading={isLoading}
              />

              {results.length > 0 && <SearchFooter count={results.length} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchWordDetailDialog
        entry={selectedWord}
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
}
