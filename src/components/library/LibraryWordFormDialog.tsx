import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { motion } from "motion/react";
import { LibraryForm, type WordFormData } from "./LibraryFormFields";
import { supabase } from "@/lib/supabase";

interface WordFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: WordFormData & { id?: string };
  showTrigger?: boolean;
}

export function LibraryWordFormDialog({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  showTrigger = true,
}: WordFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const handleAddWord = async (newData: WordFormData) => {
    setLoading(true);

    const { error } = isEditing
      ? await supabase
          .from("words")
          .update(newData)
          .eq("id", initialData.id)
      : await supabase.from("words").insert([
          {
            ...newData,
            addedAt: Date.now(),
          },
        ]);

    if (error) {
      toast.error("Erro ao salvar palavra");
    } else {
      toast.success("Palavra adicionada!");
      onSuccess?.();
      onClose();
    }
    setLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {showTrigger && !isEditing && (
        <DialogTrigger asChild>
          <Button className="w-full h-10 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black glow-cyan font-semibold">
            Cadastrar Palavra
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] bg-[#050505] border-white/10 text-zinc-100 p-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg lg:text-4xl font-bold tracking-tight text-white">
              {isEditing ? "Editar palavra" : "Cadastrar palavra"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-md lg:text-base">
              {isEditing
                ? "Altere os detalhes da palavra selecionada."
                : "Preencha os campos abaixo para adicionar uma palavra à sua biblioteca."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-10 space-y-8">
            <LibraryForm
              onSubmit={handleAddWord}
              isSubmitting={loading}
              initialData={initialData}
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
