import type { Timestamp } from "firebase/firestore";

type WordType = "n" | "v" | "adj" | "adv" | "prep" | "ideo" | "interj" | "quant" | "pn" | "ord" | "error";

interface Word {
  word: string;
  type: WordType;
  def: string;
  query: string;
  time: Timestamp;
  uid: string;
}

export type { Word, WordType }
