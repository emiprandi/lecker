<script>
  import { onDestroy } from 'svelte';
  import { auth, device, searchResults, nowPlaying, progressBar } from '../stores';
  import { play } from '../api/spotify';
  import { getSongProgressPorcentage } from '../utils';

  import Header from '../components/Header.svelte';
  import SearchResults from '../components/SearchResults.svelte';
  import NowPlaying from '../components/NowPlaying.svelte';
  import Context from '../components/Context.svelte';
  import Shortcut from '../components/Shortcut.svelte';

  let player;
  let searchInput;
  let progressInterval;

  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
      name: 'Lecker',
      getOAuthToken: cb => { cb($auth.access_token); },
      volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
      $device = device_id;

      progressInterval = setInterval(async () => {
        const state = await player.getCurrentState();
        if (state) {
          $progressBar = getSongProgressPorcentage(state.position, state.duration);
        }
      }, 1000);
    });

    player.addListener('player_state_changed', async (state) => {
      if (state && state.track_window && state.track_window.current_track) {
        $progressBar = getSongProgressPorcentage(state.position, state.duration);
        $nowPlaying = {
          context: state.context.metadata,
          track: state.track_window.current_track
        };
      }
    });

    player.connect();
  };

  const playSearchResult = (searchResultIndex) => {
    if ($searchResults.length > 0) {
      play($searchResults[searchResultIndex].uri);
    }
  };

  const handleKeystrokes = (e) => {
    switch (e.code) {
      case 'KeyS':
        e.preventDefault();
        searchInput.focus();
        break;

      case 'Space':
        e.preventDefault();
        player.togglePlay();
        break;

      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          player.previousTrack();
        } else {
          player.nextTrack();
        }
        break;

      case 'Digit1':
        e.preventDefault();
        playSearchResult(0);
        break;

      case 'Digit2':
        e.preventDefault();
        playSearchResult(1);
        break;

      case 'Digit3':
        e.preventDefault();
        playSearchResult(2);
        break;

      case 'Digit4':
        e.preventDefault();
        playSearchResult(3);
        break;

      case 'Digit5':
        e.preventDefault();
        playSearchResult(4);
        break;
    }
  };

  onDestroy(() => {
    clearInterval(progressInterval);
  });
</script>

<svelte:window on:keydown={handleKeystrokes}/>

<svelte:head>
  <title>{$nowPlaying ? `${$nowPlaying.track.name} • ` : ''}Lecker</title>
  <script src="https://sdk.scdn.co/spotify-player.js"></script>
</svelte:head>

<div class="container">
  <div class="header">
    <Header bind:this={searchInput} />
  </div>
  <div class="search-results">
    {#if $searchResults}
      <SearchResults />
    {/if}
  </div>
  <div class="now-playing">
    {#if $nowPlaying}
      <NowPlaying />
    {/if}
  </div>
  <div class="context-info">
    {#if $nowPlaying}
      <Context />
    {/if}
  </div>
  <div class="help">
    <span class="tip">
      <Shortcut key='SPACE' />
      <span>Toggle Pause</span>
    </span>
    <span class="tip">
      <Shortcut key='TAB' />
      <span>Next song</span>
    </span>
    <span class="tip">
      <Shortcut key='⇧+TAB' />
      <span>Previous song</span>
    </span>
  </div>
</div>

<style>
  /* LAYOUT */
  .container {
    display: grid;
    grid-template-columns: 500px 400px 1fr;
    grid-template-rows: 100px 1fr 70px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    height: 100vh;
  }
  .header {
    grid-area: 1 / 1 / 2 / 4;
    border-bottom: 1px solid #372A8E;
    display: flex;
    align-items: center;
    padding: 30px 50px;
  }
  .search-results {
    grid-area: 2 / 1 / 4 / 2;
    border-right: 1px solid #372A8E;
    padding: 50px;
    overflow: auto;
  }
  .now-playing {
    grid-area: 2 / 2 / 3 / 3;
    padding: 50px;
  }
  .context-info {
    grid-area: 2 / 3 / 3 / 4;
    padding: 50px 50px 50px 0;
    overflow: auto;
  }
  .help {
    grid-area: 3 / 2 / 4 / 4;
    border-top: 1px solid #372A8E;
    padding: 25px 50px;
    display: flex;
    justify-content: space-between;
  }
  /* END LAYOUT */

  .tip {
    margin-right: 30px;
  }
  .tip > span {
    margin-left: 5px;
    text-transform: uppercase;
    font-size: 14px;
    color: #695ACA;
  }
</style>
