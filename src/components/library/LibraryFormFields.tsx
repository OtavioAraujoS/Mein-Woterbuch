import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, PlusCircle } from "lucide-react";

const wordSchema = z.object({
  word: z.string().min(1, "A palavra é obrigatória").max(50),
  definition: z.string().min(5, "A definição deve ter pelo menos 5 caracteres"),
  example: z.string().min(5, "O exemplo deve ter pelo menos 5 caracteres"),
});

export type WordFormData = z.infer<typeof wordSchema>;

interface LibraryFormProps {
  onSubmit: (data: WordFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function LibraryForm({ onSubmit, isSubmitting }: LibraryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<WordFormData>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: "",
      definition: "",
      example: "",
    },
  });

  const handleFormSubmit = async (data: WordFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">
          Palavra
        </label>
        <input
          {...register("word")}
          placeholder="Ex: Ephemeral"
          className={`w-full bg-[#050505] border ${
            errors.word ? "border-red-500/50" : "border-white/10"
          } rounded-lg py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-white`}
        />
        {errors.word && (
          <span className="text-xs text-red-400 ml-1">
            {errors.word.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">
          Definição
        </label>
        <textarea
          {...register("definition")}
          placeholder="O que esta palavra significa?"
          rows={3}
          className={`w-full bg-[#050505] border ${
            errors.definition ? "border-red-500/50" : "border-white/10"
          } rounded-lg py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-white resize-none`}
        />
        {errors.definition && (
          <span className="text-xs text-red-400 ml-1">
            {errors.definition.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">
          Exemplo de uso
        </label>
        <input
          {...register("example")}
          placeholder="Aplique em uma frase..."
          className={`w-full bg-[#050505] border ${
            errors.example ? "border-red-500/50" : "border-white/10"
          } rounded-lg py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-white`}
        />
        {errors.example && (
          <span className="text-xs text-red-400 ml-1">
            {errors.example.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isFormSubmitting}
        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-cyan-900/20"
      >
        {isSubmitting || isFormSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <PlusCircle size={20} />
            Salvar na Biblioteca
          </>
        )}
      </button>
    </form>
  );
}
