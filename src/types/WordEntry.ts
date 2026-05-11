export interface WordEntry {
  id: string;
  word: string;
  definition: string;
  pronunciation?: string;
  addedAt: number;
}

export type View = "home" | "saved";
