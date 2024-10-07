import './App.css';
import SearchBar from "../Searchbar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,} from 'react-bootstrap';


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const clientId = '5917513ce3cd477294ff70aa27819777';
  const redirectUri = 'http://localhost:3000/';
  const scope = 'user-read-private user-read-email';
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
  
  const search = async () => {
    if (!searchInput) return; // Prevent empty searches
    console.log("Searching for: " + searchInput); // Log the search input

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    try {
      // Search for tracks
      const tracksResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, searchParameters);
      const tracksData = await tracksResponse.json();

      console.log(tracksData); // Log the tracks data

      if (tracksData.tracks.items.length > 0) {
        setTracks(tracksData.tracks.items); // Set the state for tracks
      } else {
        console.log("No tracks found");
        setTracks([]); // Clear tracks if none are found
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="App">
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <Container>
          <SearchBar  searchHandler={search} storeSearch={setSearchInput}/> 
          <SearchResults tracks={tracks} />
        </Container>

      )} 
    </div>
  );
}

export default App;

