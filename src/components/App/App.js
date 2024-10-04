import './App.css';
import SearchBar from "../Searchbar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

const CLIENT_ID="5917513ce3cd477294ff70aa27819777"
const CLIENT_SECRET="473112741c4b46c09f7759c6a4924599"

function App() {

  
  // const [searchValue, setSearchValue] = useState("")
  // const [storedSearch, setStoredSearch] = useState("")

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  },[])


  async function search(){
    console.log("search for " + searchInput) //confirming search is being fetched correctly 

    // Get request Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.text())
      .then(data => {return data.artists.item[0].id})

    console.log("Artist ID is " + artistID)
    // Get request with artist ID gram all albums


    var returnedAlbums = await fetch('https://api.spotify.com/v1/artiists/' + artistID + '/albums' + '?inlcude_groups=album&market=UK&limit=30', searchParameters)
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
      <Container>
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
      {/* <div className='header'>
        <h1>Jamming</h1>
        <h3 className='subheading1'>The Spotify playlist creator!</h3>
        <div className='search'>
          <label style={{marginRight: 10}}>Search for your favorite song here:</label>
          <SearchBar value={searchValue} setValue={setSearchValue} storedSearch={storedSearch} setStoredSearch={setStoredSearch}/>        
        </div>
      </div>
      <div>
        <SearchResults value={searchValue} storedSearch={storedSearch}/>
      </div> */}

      </div>
  );
}

export default App;

