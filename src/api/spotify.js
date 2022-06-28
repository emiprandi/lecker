import { get } from 'svelte/store';
import { auth, device } from '../stores';

const req = async (endpoint, qs = {}, options = {}) => {
  const BASE_URL = 'https://api.spotify.com/v1/';
  const authFromStore = get(auth);

  options.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authFromStore.access_token}`
  };

  const url = new URL(endpoint, BASE_URL);
  url.search = new URLSearchParams(qs).toString();

  const response = await fetch(url, options);
  if (response.status === 202 || response.status === 204) {
    return '';
  }
  return await response.json();
};

export const search = async (query) => {
  return await req('search', {
    q: query,
    type: 'album',
    limit: 5
  });
};

export const play = async (albumUri) => {
  const deviceFromStore = get(device);

  return await req('me/player/play', { device_id: deviceFromStore }, {
    method: 'PUT',
    body: JSON.stringify({
      context_uri: albumUri,
      offset: {
        position: 0
      },
      position_ms: 0
    })
  });
};
