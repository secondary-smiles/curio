import sanitizeHtml from 'sanitize-html';

import { CensorSensor } from "censor-sensor";

import type { Word } from "./word";

function isXSS(html: string) {
  const cleaned = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });

  if (cleaned != html) {
    return true;
  }
  return false;
}

function isValidLength(data: Word) {
  if (data.word.length > 45 || data.word.length < 3) {
    return false;
  }

  if (data.def.length > 2000 || data.def.split(" ").length < 3) {
    return false;
  }

  return true;
}

function isClean(data: string) {
  const censor = new CensorSensor();

  censor.disableTier(5);
  censor.disableTier(4);
  censor.disableTier(3);

  if (censor.isProfaneIsh(data)) {
    return false;
  }
  return true;
}

function isValidChars(data: string) {
  let returnWord = '';
  for (let i = 0; i < data.length; i++) {
    let code = data.charCodeAt(i);

    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) && // lower alpha (a-z)
      !(code == 45) // hyphen
    ) {
      // discard char

      if (code == 32) {
        // replace space with hyphen
        returnWord += '-';
      }
    } else {
      returnWord += data[i];
    }
  }

  if (returnWord != data) {
    return false;
  }

  return true
}

export { isXSS, isValidLength, isClean, isValidChars }
