import type { LexiconEntry } from "@/types/LexiconEntry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { motion } from "motion/react";

interface WordDetailDialogProps {
  entry: LexiconEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchWordDetailDialog({
  entry,
  isOpen,
  onClose,
}: WordDetailDialogProps) {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#050505] border-white/10 text-zinc-100 p-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden bg-white/[0.02]"
        >
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-6xl font-bold tracking-tight text-white">
                {entry.word}
              </DialogTitle>
            </div>
            <DialogDescription className="text-zinc-500">
              Veja a definição e exemplos para a palavra "{entry.word}".
            </DialogDescription>
          </DialogHeader>

          <div className="mt-10 space-y-6">
            <div className="inline-block px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Definição
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-cyan-400 font-bold w-6 shrink-0">1.</span>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {entry.definition}
                </p>
              </div>

              <div className="inline-block px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                Exemplo
              </div>

              {entry.example && (
                <div className="pl-6 border-l-2 border-cyan-400/30 ml-6">
                  <p className="text-zinc-500 italic text-lg">
                    "{entry.example}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
