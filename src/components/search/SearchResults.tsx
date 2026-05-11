import type { LexiconEntry } from "@/types/LexiconEntry";
import { Search, ArrowRight, AlertCircle } from "lucide-react";
import type { RefObject } from "react";

interface SearchResultsProps {
  results: LexiconEntry[];
  activeIdx: number;
  onHover: (idx: number) => void;
  onClick: (entry: LexiconEntry) => void;
  listRef: RefObject<HTMLUListElement>;
  query: string;
  isDebouncing: boolean;
}

export function SearchResults({
  results,
  activeIdx,
  onHover,
  onClick,
  listRef,
  query,
  isDebouncing,
}: SearchResultsProps) {
  if (!query.trim()) return null;

  if (!isDebouncing && results.length === 0) {
    return (
      <div className="border-t border-emerald-accent/20 px-4 py-10 flex flex-col items-center justify-center gap-3 bg-surface/10">
        <AlertCircle size={24} className="text-emerald-accent/40" />
        <p className="font-mono text-sm text-text-muted">
          Nenhuma palavra encontrada para "
          <span className="text-text-primary">{query}</span>"
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-emerald-accent/20">
      <ul
        ref={listRef}
        className="max-h-[320px] overflow-y-auto custom-scrollbar"
      >
        {results.map((entry, idx) => {
          const isActive = idx === activeIdx;
          return (
            <li key={entry.id}>
              <button
                onMouseEnter={() => onHover(idx)}
                onClick={() => onClick(entry)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors group ${
                  isActive ? "bg-emerald-accent/20" : "hover:bg-surface/30"
                } ${idx === results.length - 1 ? "" : "border-b border-white/5"}`}
              >
                <span
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-emerald-accent" : "text-text-muted"
                  }`}
                >
                  {isActive ? <Search size={12} /> : <ArrowRight size={12} />}
                </span>
                <span
                  className={`font-mono text-sm font-bold flex-shrink-0 min-w-[140px] transition-colors ${
                    isActive ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {entry.word}
                </span>
                <span className="font-mono text-[11px] text-text-muted truncate">
                  {entry.definition}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
