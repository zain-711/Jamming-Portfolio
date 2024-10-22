import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import Playlists from '../Playlist/Playlist';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const clientId = '5917513ce3cd477294ff70aa27819777';
    const redirectUri = 'http://localhost:3000/';
    const scope = 'user-read-private user-read-email';

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get('access_token');
        if (token) {
            setAccessToken(token);
        }
    }, []); // Getting the accessToken with spotiify's method on the first refresh of the app.

    useEffect(()=>{
        console.log(playlist)
    }, [playlist])

    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?${
            new URLSearchParams({
                response_type: 'token',
                client_id: clientId,
                redirect_uri: redirectUri,
                scope: scope,
            }).toString()
        }`;
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

    const addTrackToPlaylist = (track) => {
        setPlaylist([
            ...playlist, 
            {id: track.id, name: track.name, artists: track.artists.map(artist => artist.name).join(", ")}
        ])
    }

    const removeTrack = () => {
        setPlaylist(playlist.filter(p => p.id !== playlist.id))
    }


    return (
        <div className="App"> 
        {!accessToken ? (
          <button className="LoginButton" onClick={handleLogin}>Login with Spotify</button>
        ) : (
          <Container>
            <h1 style={{color: `white`, textAlign: 'center', marginTop: 20} }>Add to playlist below!</h1>
            <SearchBar  searchHandler={search} storeSearch={setSearchInput}/> 
            <div className='middle-boxes'>
                <SearchResults tracks={tracks} addTrackToPlaylist={addTrackToPlaylist} />
                <Playlists playlist={playlist} playlistName={setNewPlaylistName} deleteTrack={removeTrack} />
            </div>
          </Container>
        )} 
      </div>
    );
}

export default App;

// Delete button
// Create save to spotfy button. -- saves the playlist to a playlist list add adds to spotify account.