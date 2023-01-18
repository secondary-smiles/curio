import { writable } from 'svelte/store';

// Firebase auth state
const loadedAuthStore = writable(false);

const authStore = writable(false);

const verifiedStore = writable(false);

export {
  loadedAuthStore,
  authStore,
  verifiedStore,
}
