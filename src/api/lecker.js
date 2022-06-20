export function getTokenWithCode(code) {
  return fetch('/api/get-token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  }).then((r) => r.json());
}

export function refreshToken(refreshToken) {
  return fetch('/api/refresh-token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  }).then((r) => r.json());
}
