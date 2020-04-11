export default class SpotifyApi {
  constructor() {
    this._baseUrl = 'https://api.spotify.com/v1/';
    this._token = '';
    this._playerName = 'Lecker';
    this._playerID = '';
    this._player = {};
  }

  setToken(newToken, updateCallback) {
    this._token = newToken;

    this._player = new Spotify.Player({
      name: 'Lecker',
      getOAuthToken: (cb) => { cb(this._token); }
    });

    this._player.addListener('ready', ({ device_id }) => {
      this._playerID = device_id;
    });

    if (typeof updateCallback === 'function') {
      this._player.addListener('player_state_changed', ({ position, track_window: { current_track: { id, uri } } }) => {
        updateCallback({ position, id, uri });
      });
    }

    this._player.connect();
  }

  request(endpoint, qs = {}, options = {}) {
    if (this._token === '') {
      return Promise.reject();
    }
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._token}`
    };

    const url = new URL(endpoint, this._baseUrl);
    url.search = new URLSearchParams(qs).toString();

    return fetch(url, options).then(response => {
      if (response.status === 204) return '';
      return response.json();
    });
  }

  getMe() {
    return this.request('me');
  }

  getMyAlbums() {
    return this.request('me/albums');
  }

  getMyPlaylists() {
    return this.request('me/playlists');
  }

  search(searchTerm) {
    return this.request('search', {
      q: searchTerm,
      type: 'album',
      limit: 8
    });
  }

  getAlbumSongs(id) {
    return this.request(`albums/${id}/tracks`).then((tracks) => {
      return this.request(`me/tracks/contains`, {
        ids: tracks.items.map((track) => track.id).join(',')
      }).then((liked) => {
        return tracks.items.map((track, index) => ({
          ...track,
          liked: liked[index]
        }));
      });
    });
  }

  play(albumUri, trackUri) {
    let body = {};
    if (albumUri) {
      body.context_uri = albumUri;
    }
    if (trackUri) {
      body.offset = { 'uri': trackUri };
    }
    this.request('me/player/play', { device_id: this._playerID }, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  pause() {
    this.request('me/player/pause', { device_id: this._playerID }, {
      method: 'PUT'
    });
  }
}
