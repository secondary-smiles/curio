import { writable } from 'svelte/store';

// Firebase auth state
const loadedAuthStore = writable(false);

const authStore = writable(false);

const verifiedStore = writable(false);

// Holds id of last article for pagination
const wordPaginationIndexStore = writable(0);
const paginatedAllWordsStore = writable(false);

export {
  loadedAuthStore,
  authStore,
  verifiedStore,
  wordPaginationIndexStore,
  paginatedAllWordsStore,
}
