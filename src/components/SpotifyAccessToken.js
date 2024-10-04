import React, { useState, useEffect } from 'react';

const SpotifyAccessToken = ({ clientId, redirectUri, scope }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    // Redirect to Spotify authorization endpoint
    window.location.href = `https://accounts.spotify.com/authorize?${
      new URLSearchParams({
        response_type: 'token',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
      }).toString()
    }`;
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <p>Successfully logged in!</p>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyAccessToken;