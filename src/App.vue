<template>
  <div>
    <div class="logged-in-area" v-if="loggedIn">
      <div class="header">
        <div class="search-box">
          <search
            @user-is-typing="toggleUserTyping"
            @search-for="search"
            @clear="clearResults"
          />
        </div>
        <div class="logo">LECKER</div>
      </div>

      <div class="content">
        <div class="aside">
          <search-results
            :results="currentSearchResults"
            @result-selected="resultSelected"
          />
        </div>
        <div class="player" v-if="currentAlbum.name">
          <div class="album">
            <div
              class="artwork"
              :style="{ backgroundImage: `url(${currentAlbum.images[0].url})` }"
            ></div>
            <h1>{{ currentAlbum.name }}</h1>
            <p>{{ listArtists(currentAlbum.artists) }}</p>
          </div>
          <div class="track-list">
            <a
              :class="{ 'playing': currentTrack === track.uri }"
              href="#"
              v-for="track in currentAlbum.tracks"
              :key="track.id"
              @click.prevent="play(currentAlbum.uri, track.uri)"
            >
              <div class="liked"><liked-icon v-if="track.liked" /></div>
              <div class="info">
                <div class="info-primary">{{track.name}}</div>
                <div class="info-secondary">
                  <div class="artists">{{ listArtists(track.artists) }}</div>
                  <div class="key">&nbsp;</div>
                  <div class="duration">{{ msToSeconds(track.duration_ms) }}</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="please-log-in-area" v-if="!loggedIn">
      <div class="card">
        <p>Login with:</p>
        <a
          href="https://accounts.spotify.com/authorize?response_type=token&client_id=6619b58643b74163b1fbfbc49f2b81b4&scope=streaming%20user-read-email%20user-read-private%20user-read-recently-played&redirect_uri=http://localhost:8080"
        ><img src="./assets/logo-spotify.png" width="150" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyApi from './services/SpotifyApi.js';
import Search from './components/Search.vue';
import SearchResults from './components/SearchResults.vue';
import playerStatuses from './constants/playerStatuses.js';
import LikedIcon from './assets/heart.svg';

export default {
  name: 'Lecker',
  components: {
    'search': Search,
    'search-results': SearchResults,
    'liked-icon': LikedIcon
  },
  data() {
    return {
      loggedIn: false,
      userIsTyping: false,
      currentSearchResults: [],
      currentAlbum: {},
      currentTrack: '',
      playerStatus: playerStatuses.IDLE,
    };
  },
  mounted() {
    // change this!
    if (window.location.hash) {
      const token = document.location.hash.substring(1).split('&')[0].substring(13);

      this.api = new SpotifyApi();
      this.api.setToken(token, this.onUpdateCallback);

      this.loggedIn = true;

      window.addEventListener('keydown', this.setPlayerListener);
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.setPlayerListener);
  },
  computed: {
    isPaused: function() {
      return this.playerStatus === playerStatuses.PAUSED;
    }
  },
  methods: {
    onUpdateCallback: function(update) {
      this.currentTrack = update.uri;
    },
    setPlayerListener: function(event) {
      // listen for the `spacebar` shortcut to stop/resume playing
      if (!this.userIsTyping && this.playerStatus !== playerStatuses.IDLE && event.keyCode === 32) {
        event.preventDefault();
        switch (this.playerStatus) {
          case playerStatuses.PLAYING:
            this.pause();
            break;
          case playerStatuses.PAUSED:
            this.resume();
            break;
        }
      }
    },
    toggleUserTyping: function(value) {
      this.userIsTyping = value;
    },
    search: function(term) {
      this.api.search(term).then((results) => {
        this.currentSearchResults = results.albums.items;
      });
    },
    clearResults: function() {
      this.currentSearchResults = [];
    },
    resultSelected: function(result) {
      this.play(result.uri);

      this.api.getAlbumSongs(result.id).then((tracks) => {
        this.currentAlbum = {
          ...result,
          tracks: tracks
        };
        this.currentTrack = tracks[0].uri;
      });
    },
    listArtists: function(artists) {
      return artists.map((artist) => artist.name).join(', ');
    },
    msToSeconds: function(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    play: function(albumUri, trackUri) {
      this.api.play(albumUri, trackUri);
      this.currentTrack = trackUri;
      this.playerStatus = playerStatuses.PLAYING;
    },
    pause: function() {
      this.api.pause();
      this.playerStatus = playerStatuses.PAUSED;
    },
    resume: function() {
      this.api.play();
      this.playerStatus = playerStatuses.PLAYING;
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  body {
    background: #1A0E6A;
    color: #E8B3F0;
    font-family: 'Quicksand', sans-serif;
    height: 100vh;
  }
  .please-log-in-area {
    height: 100vh;
    position: relative;
  }
  .please-log-in-area .card {
    display: block;
    width: 200px;
    position: absolute;
    text-align: center;
    left: calc(50% - 100px);
    top: calc(50% - 100px);
  }
  .please-log-in-area .card p {
    text-transform: uppercase;
  }

  .header {
    border-bottom: 1px solid #372A8E;
    padding: 30px 50px;
    display: flex;
    justify-content: space-between;
  }
  .header .search-box {
    flex: 1 0 auto;
  }
  .header .logo {
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;
    color: #372A8E;
  }

  .content {
    display: flex;
    height: calc(100vh - 101px);
  }
  .content .aside {
    padding: 50px;
    flex: 0 0 420px;
    overflow: auto;
  }
  .content .player {
    border-left: 1px solid #372A8E;
    padding: 50px;
    flex: 1;
    overflow: auto;
    display: flex;
  }
  .content .player .album {
    flex: 0 0 300px;
    margin-right: 50px;
    text-align: center;
  }
  .content .player .album .artwork {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.25) inset;
    box-sizing: border-box;
  }
  .content .player .album h1 {
    margin: 30px 0 10px;
    font-size: 24px;
    line-height: 30px;
    text-transform: uppercase;
  }
  .content .player .album p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #695ACA;
    text-transform: uppercase;
  }
  .content .player .track-list {
    flex: 1;
  }
  .content .player .track-list a {
    color: #695ACA;
    display: flex;
    align-items: flex-start;
    min-height: 45px;
    line-height: 20px;
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 20px;
  }
  .content .player .track-list .liked {
    flex: 0 0 12px;
    margin-right: 20px;
  }
  .content .player .track-list .info {
    flex: 1 1 auto;
  }
  .content .player .track-list .info .info-primary {
    font-size: 16px;
    font-weight: 500;
    color: #E8B3F0;
    margin-bottom: 5px;
    transition: color 1s;
  }
  .content .player .track-list a.playing .info .info-primary {
    color: #FFEF66;
  }
  .content .player .track-list .info .info-secondary {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .content .player .track-list .info .info-secondary .artists {
    flex: 1 1 auto;
    margin-right: 20px;
  }
  .content .player .track-list .info .info-secondary .key {
    margin-right: 40px;
  }
  .content .player .track-list .info .info-secondary .duration {
    flex: 0 0 40px;
    text-align: right;
  }
</style>
