<script>
  const beginLoginProcess = () => {
    const client_id = '6619b58643b74163b1fbfbc49f2b81b4';

    const url = `https://accounts.spotify.com/authorize?` +
      `client_id=${client_id}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent('http://localhost:3000')}&` +
      `scope=${encodeURIComponent('streaming user-read-email user-read-private user-read-recently-played')}`;

    window.location = url;
  };
</script>

<div class="container">
  <div class="card">
    <h1>Lecker</h1>
    <p>Keyboard-first music player</p>

    <button on:click={beginLoginProcess}>Login</button>
    <p>Click to login with your Spotify account</p>
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
    max-width: 300px;
    background-color: white;
    text-align: center;
    padding: 24px;
  }

  .card > h1 {
    margin: 0;
  }

  .card > p {
    margin: 0;
  }
</style>
