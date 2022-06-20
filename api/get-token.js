import fetch from 'node-fetch';
import { config } from './_config';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    if (request.body.code) {
      const formData = new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': request.body.code,
        'redirect_uri': config.redirectUri,
        'client_id': config.clientId
      });

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${config.authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      };

      const tokenReq = await fetch(config.spotifyAuthEndpoint, options);
      const data = await tokenReq.json();

      const refresh_at = new Date(Date.now() + (data.expires_in * 1000)).getTime();
      data.refresh_at = refresh_at;

      return response.status(200).json(data);
    } else {
      return response.status(403).end();
    }
  } else {
    return response.status(405).end();
  }
}
