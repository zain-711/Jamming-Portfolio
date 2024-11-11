import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlists from '../Playlist/Playlist.js';
import PlaylistList from '../PlaylistList/PlaylistList.js'

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [uris, setUris] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);
    const clientId = '5917513ce3cd477294ff70aa27819777';
    const redirectUri = 'http://localhost:3000/';
    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';

    useEffect(() => {
        document.title = 'Jamming';
    }, []);
    

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get('access_token');
        if (token) {
            setAccessToken(token);
            window.history.replaceState({}, document.title, "/");
        }
    }, []); // Getting the accessToken with spotify's method on the first refresh of the app.
 
    const getUserPlaylist = async () => {
        if (!accessToken) return;
    
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await fetch('https://api.spotify.com/v1/me/playlists', { headers });
            const data = await response.json();
            console.log("Full response from Spotify:", data);  // Log the full response
            if (data.items && data.items.length > 0) {
                setPlaylistList(data.items);
            } else {
                console.log("No playlists found in the response.");
            }
        } catch (error) {
            console.error("Error fetching user's playlists: ", error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            console.log("Calling getUserPlaylist");  // Debugging
            getUserPlaylist();
        }
    }, [accessToken, getUserPlaylist]);


    const handleLogin = () => {
      const authUrl = `https://accounts.spotify.com/authorize?${
          new URLSearchParams({
              response_type: 'token',
              client_id: clientId,
              redirect_uri: redirectUri,
              scope: scope,
              show_dialog: 'true', // Forces the login dialog to show every time
          }).toString()
      }`;
      window.location.href = authUrl;
  };

    const search = async () => {
        if (!searchInput) return;

        try {
            const searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
            };  // Using accessToken to connect to api

            const tracksResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, searchParameters);
            const tracksData = await tracksResponse.json();
            setTracks(tracksData.tracks.items);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } // searching with user input using api and catching any errors.
    };

    const savePlaylist = async () => {
      if (!newPlaylistName || uris.length === 0 || !accessToken) return;
  
      const headers = { Authorization: `Bearer ${accessToken}` };
  
      try {
          // Step 1: Get the user's Spotify ID
          const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
          const userData = await userResponse.json();
          const userId = userData.id;
  
          // Step 2: Create a new playlist
          const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers,
              body: JSON.stringify({ name: newPlaylistName, public: false }),
          });
          const playlistData = await createPlaylistResponse.json();
          const playlistId = playlistData.id;
  
          // Step 3: Add tracks to the new playlist
          await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              method: 'POST',
              headers,
              body: JSON.stringify({ uris }),
          });
  
          alert("Playlist saved to Spotify!");
          getUserPlaylist()
          setNewPlaylistName('');
          setUris([]); //cleanup of all the edited states
      } catch (error) {
          console.error("Error saving playlist: ", error);
      }
  };

  


    const addTrackToPlaylist = (track) => {
        setPlaylist([
            ...playlist, 
            {id: track.id, name: track.name, artists: track.artists.map(artist => artist.name).join(", "),}
        ])
        setUris([...uris,  track.uri])
    }

    const removeTrack = (trackId) => {
        setPlaylist(playlist.filter(p => p.id !== trackId))
        setUris(uris.filter(uri => uri !== `spotify:track:${trackId}`))
    }

    return (
        <div className="App"> 
        {!accessToken ? (
          <button className="LoginButton" onClick={handleLogin}>Login with Spotify</button>
        ) : (
          <Container>
            <h1 style={{color: `white`, textAlign: 'center', marginTop: 20} }>Jamming</h1>
            <SearchBar  searchHandler={search} storeSearch={setSearchInput}/> 
            <div className='middle-boxes'>
                <SearchResults tracks={tracks} addTrackToPlaylist={addTrackToPlaylist} />
                <Playlists playlist={playlist} name={newPlaylistName} setplaylistName={setNewPlaylistName} deleteTrack={removeTrack} savePlaylist={savePlaylist}/> 
            </div>
            <div>
                <PlaylistList playlists = {playlistList}/>
            </div>
          </Container>
        )} 
      </div>
    );
}

export default App;
