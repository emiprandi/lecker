<script>
  import { APP_ID } from '../config';
  import Shortcut from '../components/Shortcut.svelte';

  const handleLoginShortcut = (e) => {
    switch (e.code) {
      case 'KeyA':
      case 'Enter':
        e.preventDefault();

        const url = `https://accounts.spotify.com/authorize?` +
          `client_id=${APP_ID}&` +
          `response_type=code&` +
          `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
          `scope=${encodeURIComponent('streaming user-read-email user-read-private user-library-read user-library-modify')}`;

        window.location = url;
        break;

      case 'KeyG':
        e.preventDefault();
        window.open('https://github.com/emiprandi/lecker');
        break;

      case 'KeyS':
        e.preventDefault();
        window.open('https://twitter.com/sucufruli');
        break;
    }
  };
</script>

<svelte:window on:keydown={handleLoginShortcut}/>

<div class="container">
  <div class="card">
    <h1>LECKER</h1>
    <p class="definition">
      <i>lécka</i> • German • Adjetive
    </p>
    <p class="examples">
      yummy, delicious
    </p>

    <hr />

    <p class="body">
      Lecker is a <strong>keyboard-only</strong> music player, yes, your mouse / trackpad won't help you here.
    </p>

    <p class="body">
      It uses <strong>Spotify</strong>, so you'll need a <strong>Premium</strong> account.
    </p>

    <hr />

    <p>
      Press <Shortcut key='A' /> or <Shortcut key='ENTER' /> to authorize the app and start listening!
    </p>

    <hr />

    <p class="body-secondary">
      Source code available on <strong>Github</strong> <Shortcut key='G' />
    </p>

    <p class="body-secondary">
      Made for fun by @sucufruli <Shortcut key='S' />
    </p>
  </div>
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 400px;
    padding: 24px;
  }

  h1 {
    margin: 0;
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;
    color: #372A8E;
    padding: 0 10px;
  }

  p {
    margin: 0;
    padding: 0 10px;
    line-height: 20px;
  }

  p.definition {
    color: #4e41a7;
    margin-bottom: 5px;
  }

  p.examples {
    color: #6154bd;
  }

  p.body {
    margin-bottom: 10px;
  }

  p.body-secondary {
    color: #6154bd;
    margin-bottom: 10px;
  }

  i {
    font-family: 'Georgia', serif;
  }

  hr {
    border: 0;
    border-top: 1px solid #372A8E;
    margin: 20px 0;
  }
</style>
