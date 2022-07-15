<script>
  import { onMount, onDestroy } from 'svelte';
  import { auth, device, searchResults, searchPaginationCurrentPage, nowPlaying, progressBar } from '../stores';
  import { play } from '../api/spotify';
  import { refreshToken } from '../api/lecker';
  import { getSongProgressPorcentage } from '../utils';

  import Header from '../components/Header.svelte';
  import SearchResults from '../components/SearchResults.svelte';
  import NowPlaying from '../components/NowPlaying.svelte';
  import Context from '../components/Context.svelte';
  import Shortcut from '../components/Shortcut.svelte';

  let player;
  let searchInput;
  let searchResultsPerPage = 5;
  let progressInterval;
  let refreshTokenInterval;

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

    player.on('player_state_changed', async (state) => {
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
      const paginatedIndex = $searchPaginationCurrentPage * searchResultsPerPage + searchResultIndex;
      play($searchResults[paginatedIndex].uri);
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

      case 'KeyN':
        e.preventDefault();
        if ($searchPaginationCurrentPage < 2) {
          $searchPaginationCurrentPage += 1;
        } else {
          $searchPaginationCurrentPage = 0;
        }
        break;
    }
  };

  onMount(() => {
    refreshTokenInterval = setInterval(async () => {
      const newSession = await refreshToken($auth.refresh_token);
      const mergedAuthObjs = Object.assign({}, $auth, newSession);
      $auth = mergedAuthObjs;
    }, $auth.expires_in * 1000);
  });

  onDestroy(() => {
    clearInterval(refreshTokenInterval);
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
    {#if $searchResults.length}
      <SearchResults resultsPerPage={searchResultsPerPage} />
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
  <div class="search-results-navigation">
    {#if $searchResults.length}
      <span class="tip">
        <Shortcut key='N' />
        <span>Next page</span>
      </span>
      <div>
        {#each {length: 3} as _, i}
          <span class="page-bullet" class:active={$searchPaginationCurrentPage === i}></span>
        {/each}
      </div>
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
    grid-area: 2 / 1 / 3 / 2;
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
  .search-results-navigation {
    grid-area: 3 / 1 / 4 / 2;
    border-top: 1px solid #372A8E;
    border-right: 1px solid #372A8E;
    padding: 25px 50px;
    display: flex;
    justify-content: space-between;
  }
  .help {
    grid-area: 3 / 2 / 4 / 4;
    border-top: 1px solid #372A8E;
    padding: 25px 50px;
    display: flex;
    justify-content: space-between;
  }
  /* END LAYOUT */

  .tip > span {
    margin-left: 5px;
    text-transform: uppercase;
    font-size: 14px;
    color: #695ACA;
  }

  .page-bullet {
    background-color: #695ACA;
    display: inline-block;
    border-radius: 10px;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    transition: all 0.5s;
  }

  .page-bullet.active {
    background-color: #E8B3F0;
    width: 20px;
  }
</style>
