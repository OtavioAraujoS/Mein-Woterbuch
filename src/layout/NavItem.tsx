import { motion } from "motion/react";

export function NavItem({
  id,
  icon,
  label,
  active,
  onClick,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`group relative h-12 flex items-center px-6 transition-all duration-300 rounded-r-lg ${
        active
          ? "bg-surface/40 text-text-primary"
          : "text-text-muted hover:text-text-primary hover:bg-surface/20"
      }`}
    >
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-accent shadow-[0_0_15px_rgba(0,100,102,0.5)]"
        />
      )}
      <div
        className={`mr-4 ${active ? "text-emerald-accent" : "text-text-muted group-hover:text-text-primary"}`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}
