<script>
  import { onMount } from 'svelte';
  import { getQSParam, getSavedSession } from '../utils';
  import { getTokenWithCode, refreshToken } from '../api/lecker';
  import { auth, appState } from '../stores';

  onMount(async () => {
    const code = getQSParam('code');

    if (code) {
      const newToken = await getTokenWithCode(code);
      auth.set(newToken);

      window.history.replaceState(null, '', '/');
      appState.set('player');
    } else {
      const prevSession = getSavedSession();
      const newSession = await refreshToken(prevSession.refresh_token);
      const mergedAuthObjs = Object.assign({}, prevSession, newSession);
      auth.set(mergedAuthObjs);

      appState.set('player');
    }
  });
</script>
