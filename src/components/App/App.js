import './App.css';
import SearchBar from "../Searchbar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
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



  async function search(){
    console.log("search for " + searchInput) //confirming search is being fetched correctly 


    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + accessToken
      }
    }

    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { console.log(data) })

    console.log("Artist ID is " + artistID)
    // Get request with artist ID gram all albums


    const returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?inlcude_groups=album&market=US&limit=30', searchParameters)
      .then(response =>  response.text())
      .then(data => {
        console.log(data)
        setAlbums(data.items);
      })
    // Display albums

    console.log(returnedAlbums)
  }

  return (
    <div className="App">
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
      
      <Container>
        <h1>Successfully logged in! </h1>
        <InputGroup className='mb-3' size="lg">
          <FormControl placeholder="Search For Artist"
          type='input'
          onKeyDown={e => {
            if (e.key == "Enter"){
              search()
            }
          }}
          onChange={e => {
            setSearchInput(e.target.value)
          }}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>

        <Container>
          <Row className='mx-2 row row-cols-4'>
            <Card>
              <Card.Img src="#"/>
              <Card.Body>
                <Card.Title>
                  Album Name
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Container>
      )} 
    </div>
  );
}

export default App;

