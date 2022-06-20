import { LOCALSTORE_KEY } from './config';

const storage = {
  get: (key) => window.localStorage.getItem(key),
  set: (key, value) => {
    window.localStorage.setItem(key, value);
  }
};

export function getQSParam(key) {
  return new URLSearchParams(window.location.search).get(key);
};

export function isThereAPreviousSession() {
  return !!storage.get(LOCALSTORE_KEY);
};

export const shouldGoThroughAuth = () => {
  return !!getQSParam('code') || isThereAPreviousSession();
};

export const getSavedSession = () => {
  return JSON.parse(storage.get(LOCALSTORE_KEY));
};

export const saveSession = (data) => {
  storage.set(LOCALSTORE_KEY, JSON.stringify(data));
};
