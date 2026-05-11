import type { WordEntry } from "@/types/WordEntry";
import { Search } from "lucide-react";
import { LibraryWordFormDialog } from "./LibraryWordFormDialog";
import { useState } from "react";

export function LibraryHeader({
  savedWords,
  isLoading,
  searchQuery,
  setSearchQuery,
  onSuccess,
}: {
  savedWords: WordEntry[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSuccess?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap justify-between items-center gap-4 lg:gap-0">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Biblioteca de palavras
          </h2>
          <div className="flex items-center gap-2 text-sm text-cyan-400/80">
            <div className="w-2 h-2 rounded-full bg-cyan-400 glow-cyan animate-pulse" />
            <span>
              {isLoading
                ? "Sincronizando..."
                : `${savedWords.length} palavras sincronizadas`}
            </span>
          </div>
        </div>

        <LibraryWordFormDialog
          isOpen={isOpen}
          onClose={handleToggleDialog}
          onSuccess={onSuccess}
        />
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
    </div>
  );
}
