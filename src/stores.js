import { writable } from 'svelte/store';
import { saveSession } from './utils';

export const appState = writable('');

export const auth = writable();
auth.subscribe((value) => {
  if (value) {
    saveSession(value);
  }
});

export const device = writable('');

export const searchResults = writable([]);

export const nowPlaying = writable();

export const progressBar = writable(0);
