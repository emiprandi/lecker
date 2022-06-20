import { get } from 'svelte/store';
import { auth } from '../stores';

const req = async (endpoint, qs = {}, options = {}) => {
  const BASE_URL = 'https://api.spotify.com/v1/';
  const authStore = get(auth);

  options.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.access_token}`
  };

  const url = new URL(endpoint, BASE_URL);
  url.search = new URLSearchParams(qs).toString();

  const data = await fetch(url, options);
  const response = await data.json();

  return response;
};


export const getMe = async () => {
  return await req('me');
};
