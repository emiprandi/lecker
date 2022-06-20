const p = process.env;

export const config = {
  clientId: p.SPOTIFY_CLIENT_ID,
  clientSecret: p.SPOTIFY_CLIENT_SECRET,
  redirectUri: p.REDIRECT_URI,
  authToken: Buffer.from(`${p.SPOTIFY_CLIENT_ID}:${p.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
  spotifyAuthEndpoint: 'https://accounts.spotify.com/api/token'
};
