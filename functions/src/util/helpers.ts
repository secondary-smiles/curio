import sanitizeHtml from 'sanitize-html';

import type { Word } from "./word";

function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function validateWord(data: Word) {
  if (data.word.length > 45 || data.word.length < 3) {
    throw new Error("incorrect word length");
  }

  if (data.def.length > 2000 || data.def.split(" ").length < 3) {
    throw new Error("incorrect def length");
  }
}

export { sanitize, validateWord }
