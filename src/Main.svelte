<script>
  import Login from './screens/Login.svelte';
  import Auth from './screens/Auth.svelte';
  import Player from './screens/Player.svelte';

  import { appState } from './stores';
  import { shouldGoThroughAuth } from './utils';

  if (shouldGoThroughAuth()) {
    appState.set('auth');
  } else {
    appState.set('login');
  }
</script>

{#if $appState === 'login'}
  <Login />
{:else if $appState === 'auth'}
  <Auth />
{:else if $appState === 'player'}
  <Player />
{/if}
