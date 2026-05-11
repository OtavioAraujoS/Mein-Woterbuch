/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { debounce } from "@/utils/debounce";
import type { LexiconEntry } from "@/types/LexiconEntry";

interface UseLexiconSearchProps {
  initialQuery?: string;
}

export function useLexiconSearch({ initialQuery = "" }: UseLexiconSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<LexiconEntry[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<LexiconEntry | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    const start = performance.now();

    const { data, error } = await supabase
      .from("words")
      .select("*")
      .ilike("word", `%${searchQuery}%`)
      .limit(10);

    const elapsed = Math.round(performance.now() - start);

    if (!error && data) {
      setResults(data as LexiconEntry[]);
    }

    setResponseTime(elapsed);
    setIsDebouncing(false);
    setIsLoading(false);
  }, []);

  const executeSearch = useMemo(
    () => debounce(performSearch, 500),
    [performSearch],
  );

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

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
    setSelectedWord(null);
  }, []);

  const handleWordClick = useCallback((entry: LexiconEntry) => {
    setQuery(entry.word);
    setSelectedWord(entry);
  }, []);

  return {
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
  };
}
