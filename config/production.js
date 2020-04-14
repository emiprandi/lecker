module.exports = {
  spotifyAuth: {
    uri: 'https://accounts.spotify.com/authorize',
    responseType: 'token',
    clientId: '6619b58643b74163b1fbfbc49f2b81b4',
    scopes: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-recently-played'
    ],
    redirectUri: 'https://lecker.now.sh'
  }
}
