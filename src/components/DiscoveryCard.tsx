import { motion } from "motion/react";

export function DiscoveryCard({
  title,
  icon,
  highlight,
  description,
  items,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  highlight?: string;
  description?: string;
  items?: string[];
  accent?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-emerald-accent/20 transition-all cursor-pointer ${
        accent ? "bg-gradient-to-br from-emerald-accent/5 to-transparent" : ""
      }`}
    >
      <div
        className={`absolute top-4 right-4 transition-all duration-500 opacity-20 group-hover:opacity-100 ${accent ? "text-emerald-accent" : "text-text-muted"}`}
      >
        {icon}
      </div>
      <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted mb-3">
        {title}
      </h3>

      {highlight && (
        <>
          <p className="text-2xl font-bold text-text-primary mb-2 tracking-tight">
            {highlight}
          </p>
          <p className="font-mono text-[11px] text-text-muted leading-relaxed max-w-[80%]">
            {description}
          </p>
        </>
      )}

      {items && (
        <ul className="font-mono text-xs text-text-primary space-y-2 mt-2">
          {items.map((item, idx) => (
            <li
              key={item}
              className={`flex items-center gap-2 group/item transition-colors hover:text-emerald-accent ${idx === items.length - 1 ? "text-text-muted" : ""}`}
            >
              <span className="w-1 h-1 rounded-full bg-emerald-accent/40 group-hover/item:bg-emerald-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
