import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-6 pt-10">
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={disabled || currentPage === 0}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-cyan-400">{currentPage + 1}</span>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-500">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={disabled || currentPage === totalPages - 1}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
