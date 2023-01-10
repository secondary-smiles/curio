interface Word {
  word: string;
  type: "n" | "v" | "adj" | "adv" | "prep" | "ideo" | "interj" | "quant" | "pn" | "ord" | "error"
  def: string;
  query: string;
}

export type { Word }
