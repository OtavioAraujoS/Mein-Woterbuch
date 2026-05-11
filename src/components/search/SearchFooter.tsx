interface SearchFooterProps {
  count: number;
}

export function SearchFooter({ count }: SearchFooterProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-emerald-accent/20 bg-surface/20">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest flex items-center gap-1">
          <kbd className="bg-surface border border-white/10 rounded px-1 text-[9px] text-text-primary">
            ↑
          </kbd>
          <kbd className="bg-surface border border-white/10 rounded px-1 text-[9px] text-text-primary">
            ↓
          </kbd>
          Navegar
        </span>
        <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest flex items-center gap-1">
          <kbd className="bg-surface border border-white/10 rounded px-1 text-[9px] text-text-primary">
            ⏎
          </kbd>
          Selecionar
        </span>
      </div>
      <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">
        {count} resultados
      </span>
    </div>
  );
}
