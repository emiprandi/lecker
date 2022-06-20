<script>
  import { onMount } from 'svelte';
  import { user } from '../stores';
  import { getMe } from '../api/spotify';

  onMount(async () => {
    $user = await getMe();
  })
</script>

<svelte:head>
  <title>{$user && $user.display_name} - Lecker</title>
</svelte:head>

<h1>Player for {$user && $user.display_name}!</h1>
