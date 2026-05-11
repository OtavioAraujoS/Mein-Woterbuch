/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { searchLexicon, type LexiconEntry } from "@/data/lexicon";
import { SearchHeader } from "./search/SearchHeader";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { SearchFooter } from "./search/SearchFooter";
import { debounce } from "@/utils/debounce";

interface SearchPanelProps {
  initialQuery?: string;
}

export function SearchPanel({ initialQuery = "" }: SearchPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeIdx, setActiveIdx] = useState(0);
  const [, setIsOpen] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [results, setResults] = useState<LexiconEntry[]>([]);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const performSearch = useCallback((searchQuery: string) => {
    const start = performance.now();
    const found = searchLexicon(searchQuery);
    const elapsed = Math.round(performance.now() - start);

    setResults(found);
    setResponseTime(elapsed);
    setIsDebouncing(false);
  }, []);

  const executeSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch],
  );

  useEffect(() => {
    if (!query.trim()) {
      executeSearch.cancel();
      setResults([]);
      setResponseTime(null);
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    executeSearch(query);

    return () => {
      executeSearch.cancel();
    };
  }, [query, executeSearch]);

  useEffect(() => {
    setActiveIdx(0);
  }, [results]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setIsOpen(false);
    setActiveIdx(0);
    setResponseTime(null);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        clearSearch();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIdx]) {
        setQuery(results[activeIdx].word);
        setIsOpen(false);
      }
    },
    [results, activeIdx, clearSearch],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.children[activeIdx] as HTMLElement | undefined;
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
                }}
                listRef={listRef}
                query={query}
                isDebouncing={isDebouncing}
              />

              {results.length > 0 && <SearchFooter count={results.length} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
