export function MobileNavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? "text-emerald-accent" : "text-text-muted"
      }`}
    >
      {icon}
      <span className="font-mono text-[8px] uppercase tracking-widest font-bold">
        {label}
      </span>
    </button>
  );
}
