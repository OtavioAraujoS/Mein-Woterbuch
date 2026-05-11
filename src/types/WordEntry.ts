export interface WordEntry {
  id: string;
  word: string;
  definition: string;
  pronunciation?: string;
  example?: string;
  addedAt: number;
}

export type View = "home" | "saved";
