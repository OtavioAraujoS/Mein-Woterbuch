import { Search } from "lucide-react";
import type { RefObject } from "react";

interface SearchInputProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClear: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  query,
  onChange,
  onKeyDown,
  onFocus,
  onClear,
  inputRef,
}: SearchInputProps) {
  return (
    <div className="flex items-center px-4 py-3 gap-3">
      <Search
        size={16}
        className={`flex-shrink-0 transition-colors ${
          query ? "text-emerald-accent" : "text-text-muted"
        }`}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder="Pesquisar palavras..."
        className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-base placeholder:text-text-muted/30 caret-emerald-accent"
      />
      {query && (
        <button
          onClick={onClear}
          className="font-mono text-[10px] uppercase tracking-widest text-text-muted border border-surface/60 rounded px-2 py-0.5 hover:text-text-primary hover:border-white/20 transition-all flex-shrink-0"
        >
          ESC para limpar
        </button>
      )}
    </div>
  );
}
