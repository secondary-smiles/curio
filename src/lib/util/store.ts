import { writable } from 'svelte/store';

import type { Word } from '$lib/util/word';

// Loaded words
// Typedef
const wordList: Word[] = [];

const wordsLoadedStore = writable(wordList);
const wordsDisplayStore = writable(wordList);

export {
  wordsLoadedStore,
  wordsDisplayStore
}
