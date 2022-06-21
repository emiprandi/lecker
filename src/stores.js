import { writable } from 'svelte/store';
import { saveSession } from './utils';

export const appState = writable('init');

export const auth = writable();
auth.subscribe((value) => {
  if (value) {
    saveSession(value);
  }
});

export const user = writable({});

export const device = writable('');
