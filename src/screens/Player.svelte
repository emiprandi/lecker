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

<h1>Player for {$user && $user.display_name}!</h1>
