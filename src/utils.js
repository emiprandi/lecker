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

export const msToMinutes = (ms) => {
  const date = new Date(ms);
  return `${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

export const getImageUrlBySize = (images, size) => {
  return images.find((image) => image.width === size).url;
};

export const getSongProgressPorcentage = (currentPosition, totalDuration) => {
  const progress = currentPosition * 100 / totalDuration;

  return progress > 100 ? 100 : progress;
};
