export function Library() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-accent/10 flex items-center justify-center mb-6 border border-emerald-accent/20">
        <div className="w-8 h-8 text-emerald-accent">📚</div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Sua Biblioteca</h2>
      <p className="text-text-muted max-w-xs">
        Em breve você poderá salvar suas palavras favoritas aqui para estudar
        mais tarde.
      </p>
    </div>
  );
}
