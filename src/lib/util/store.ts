import { writable } from 'svelte/store';

import type { Word } from '$lib/util/word';

// Loaded words
// Typedef
const wordList: Word[] = [];

const wordsLoadedStore = writable(wordList);
const wordsDisplayStore = writable(wordList);

// Firebase auth state
const authStore = writable(false);

const verifiedStore = writable(false);

export {
  wordsLoadedStore,
  wordsDisplayStore,
  authStore,
  verifiedStore,
}
