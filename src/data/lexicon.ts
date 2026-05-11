export type LexiconEntry = {
  id: string;
  word: string;
  definition: string;
};

export const lexicon: LexiconEntry[] = [
  {
    id: "1",
    word: "Ephemeral",
    definition: "lasting for a very short time",
  },
  {
    id: "2",
    word: "Ephemera",
    definition: "things that exist or are enjoyed for only a short time",
  },
  {
    id: "3",
    word: "Ephemeris",
    definition: "a table giving the computed positions of a celestial body",
  },
  {
    id: "4",
    word: "Ephemerides",
    definition: "plural form of ephemeris",
  },
  {
    id: "5",
    word: "Ephemerovirus",
    definition: "a genus of viruses in the family Rhabdoviridae",
  },
  {
    id: "6",
    word: "Sycophant",
    definition: "a person who acts obsequiously towards someone important",
  },
  {
    id: "7",
    word: "Obfuscate",
    definition: "render obscure, unclear, or unintelligible",
  },
  {
    id: "8",
    word: "Petrichor",
    definition:
      "a pleasant smell that frequently accompanies the first rain after a long dry period",
  },
  {
    id: "9",
    word: "Mellifluous",
    definition: "sweet or musical; pleasant to hear",
  },
  {
    id: "10",
    word: "Serendipity",
    definition:
      "the occurrence and development of events by chance in a happy or beneficial way",
  },
  {
    id: "11",
    word: "Soliloquy",
    definition: "the act of talking to oneself, especially in a play",
  },
  {
    id: "12",
    word: "Loquacious",
    definition: "tending to talk a great deal; talkative",
  },
  {
    id: "13",
    word: "Defenestration",
    definition: "the action of throwing someone out of a window",
  },
  {
    id: "14",
    word: "Perspicacious",
    definition: "having a ready insight into things; shrewd",
  },
  {
    id: "15",
    word: "Tenacious",
    definition:
      "not readily relinquishing a position, principle, or course of action",
  },
  // German
  {
    id: "16",
    word: "Schadenfreude",
    definition: "Freude am Unglück anderer Menschen",
  },
  {
    id: "17",
    word: "Weltschmerz",
    definition: "Schmerz über den Zustand der Welt",
  },
  {
    id: "18",
    word: "Zeitgeist",
    definition: "der Geist oder das Klima einer bestimmten Epoche",
  },
  {
    id: "19",
    word: "Fernweh",
    definition: "Sehnsucht nach der Ferne, nach dem Reisen",
  },
  {
    id: "20",
    word: "Verschlimmbessern",
    definition: "etwas durch Verbesserungsversuche verschlechtern",
  },
  {
    id: "21",
    word: "Torschlusspanik",
    definition: "Panik angesichts einer sich schließenden Gelegenheit",
  },
  {
    id: "22",
    word: "Doppelgänger",
    definition: "jemandes Geist oder Doppelgänger in der Erscheinung",
  },
  {
    id: "23",
    word: "Angst",
    definition: "ein Gefühl der Angst, Besorgnis oder Unruhe",
  },
  {
    id: "24",
    word: "Gemütlichkeit",
    definition: "Behaglichkeit, Gemütlichkeit und Geselligkeit",
  },
  {
    id: "25",
    word: "Wanderlust",
    definition: "ein starkes Verlangen oder Impuls, die Welt zu bereisen",
  },
];

export function searchLexicon(query: string): LexiconEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return lexicon.filter((e) => e.word.toLowerCase().startsWith(q)).slice(0, 10);
}
