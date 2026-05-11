import type { WordEntry } from "@/types/WordEntry";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface WordCardProps {
  entry: WordEntry;
  onRemove: (id: string) => void;
  onEdit: (entry: WordEntry) => void;
}

export default function WordCard({ entry, onRemove, onEdit }: WordCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative group bg-[#0A0A0A] border border-white/5 rounded-sm p-5 hover:border-cyan-500/30 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          onClick={() => onEdit(entry)}
          className="text-lg font-bold text-white tracking-tight leading-tight pr-8 cursor-pointer hover:text-cyan-400 transition-colors"
        >
          {entry.word}
        </h3>
        <button
          onClick={() => onRemove(entry.id)}
          className="absolute top-4 right-4 text-zinc-600 hover:text-pink-500 transition-colors"
          aria-label="Remove word"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-zinc-500 text-base leading-relaxed italic w-full">
        {entry.definition}
      </p>
      <div className="pl-4 border-l-2 border-cyan-400/30 mt-4">
        <p className="text-zinc-500 italic text-lg">
          Exemplo: "{entry.example}"
        </p>
      </div>
    </motion.div>
  );
}
