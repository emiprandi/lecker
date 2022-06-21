<script>
  import { onMount } from 'svelte';
  import { auth, user, device } from '../stores';
  import { getMe } from '../api/spotify';

  let player;

  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
      name: 'Lecker!',
      getOAuthToken: cb => { cb($auth.access_token); },
      volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
      device.set(device_id);
    });

    player.connect();
  };

  onMount(async () => {
    $user = await getMe();
  });
</script>

<svelte:head>
  <title>Lecker</title>
  <script src="https://sdk.scdn.co/spotify-player.js"></script>
</svelte:head>

<section class="header">
  <div class="search">
    <div class="shortcut">S</div>
    <input placeholder="Search music..." />
  </div>
  <div class="logo">LECKER</div>
</section>
<section class="content">
  <div class="search-results">
    <a href="/">
      <div class="shortcut">1</div>
      <div class="image">img</div>
      <div class="info">
        <div class="info-primary">Result song name</div>
        <div class="info-secondary">
          <div class="artists">Artists</div>
          <div class="tracks">5 tracks</div>
        </div>
      </div>
    </a>
  </div>
  <div class="player">
    <div class="album">
      <div class="artwork">art</div>
      <h1>album name</h1>
      <p>artists</p>
    </div>
    <div class="track-list">
      <a href="/">
        <div class="liked">
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.85005 0.0299152C8.25314 0.0284451 7.66815 0.196936 7.16347 0.515689C6.65878 0.834441 6.25517 1.17465 6 1.71429C5.69904 1.06013 5.18275 0.644731 4.53727 0.325612C3.89178 0.00649339 3.15631 -0.0813783 2.45381 0.0766865C1.75131 0.234751 1.12436 0.629173 0.67776 1.19402C0.23116 1.75886 -0.00801947 2.45989 0.000205251 3.17992C0.000205251 6.47992 6 11 6 11C6 11 12 6.47992 12 3.17992C12 2.34448 11.6681 1.54327 11.0774 0.952529C10.4867 0.361789 9.68547 0.0299152 8.85005 0.0299152Z" fill="#695ACA"/>
          </svg>
        </div>
        <div class="info">
          <div class="info-primary">track name</div>
          <div class="info-secondary">
            <div class="artists">artists</div>
            <div class="key">&nbsp;</div>
            <div class="duration">1:22</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

<style>
  .header {
    border-bottom: 1px solid #372A8E;
    padding: 30px 50px;
    display: flex;
  }

  .search {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .shortcut {
    flex: 0 8px;
    min-width: 8px;
    background: #FFEF66;
    color: #1A0E6A;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
    padding: 0 5px;
    margin-right: 30px;
  }

  input {
    font-family: 'Quicksand', sans-serif;
    background: transparent;
    border: none;
    font-size: 40px;
    line-height: 40px;
    height: 40px;
    color: #E8B3F0;
    text-transform: uppercase;
    outline: none;
    padding: 0 30px 0 0;
    width: 100%;
  }

  input::placeholder {
    color: #372A8E;
  }

  .logo {
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;
    color: #372A8E;
    opacity: 0.5;
    flex: 0 250px;
  }

  .content {
    display: flex;
    height: calc(100vh - 101px);
  }

  .search-results {
    padding: 50px;
    flex: 0 420px;
    overflow: auto;
  }

  .search-results > a {
    color: #695ACA;
    display: flex;
    align-items: flex-start;
    min-height: 60px;
    line-height: 20px;
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 30px;
  }

  .search-results .shortcut {
    flex: 0 0 8px;
    min-width: 8px;
    background: #FFEF66;
    color: #1A0E6A;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
    padding: 0 5px;
    margin-right: 30px;
  }

  .search-results .image {
    flex: 0 0 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
  }
  .search-results .info {
    flex: 1 1 auto;
  }
  .search-results .info-primary {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: #E8B3F0;
    margin-bottom: 5px;
  }
  .search-results .info-secondary {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .search-results .info-secondary .artists {
    margin-right: 20px;
  }
  .search-results .info-secondary .tracks {
    white-space: nowrap;
  }

  .player {
    border-left: 1px solid #372A8E;
    padding: 50px;
    flex: 1;
    overflow: auto;
    display: flex;
  }

  .album {
    flex: 0 0 300px;
    margin-right: 50px;
    text-align: center;
  }
  .artwork {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.25) inset;
    box-sizing: border-box;
  }
  .album > h1 {
    margin: 30px 0 10px;
    font-size: 24px;
    line-height: 30px;
    text-transform: uppercase;
  }
  .album > p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #695ACA;
    text-transform: uppercase;
  }
  .track-list {
    flex: 1;
  }
  .track-list > a {
    color: #695ACA;
    display: flex;
    align-items: flex-start;
    min-height: 45px;
    line-height: 20px;
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 20px;
  }
  .track-list .liked {
    flex: 0 0 12px;
    margin-right: 20px;
  }
  .track-list .info {
    flex: 1 1 auto;
  }
  .track-list .info .info-primary {
    font-size: 16px;
    font-weight: 500;
    color: #E8B3F0;
    margin-bottom: 5px;
    transition: color 1s;
  }
  .track-list a.playing .info .info-primary {
    color: #FFEF66;
  }
  .track-list .info .info-secondary {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .track-list .info .info-secondary .artists {
    flex: 1 1 auto;
    margin-right: 20px;
  }
  .track-list .info .info-secondary .key {
    margin-right: 40px;
  }
  .track-list .info .info-secondary .duration {
    flex: 0 0 40px;
    text-align: right;
  }
</style>
