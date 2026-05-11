import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";

export function SearchHeader({
  responseTime,
}: {
  responseTime: number | null;
}) {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted font-semibold">
        Busca Global de Palavras
      </span>
      {responseTime !== null && (
        <AnimatePresence>
          <motion.span
            key={responseTime}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[10px] text-emerald-accent flex items-center gap-1"
          >
            <Zap size={10} />
            {responseTime}ms response
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
}
