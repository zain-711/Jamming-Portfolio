import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const clientId = '5917513ce3cd477294ff70aa27819777';
    const redirectUri = 'http://localhost:3000/';
    const scope = 'user-read-private user-read-email';

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get('access_token');
        if (token) {
            setAccessToken(token);
        }
    }, []);

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
            };

            const tracksResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, searchParameters);
            const tracksData = await tracksResponse.json();
            setTracks(tracksData.tracks.items);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div className="App">
            {!accessToken ? (
                <div id="button" className="container start">
                    <Button onClick={handleLogin} className="LoginButton">
                        Login with Spotify
                    </Button>
                </div>
            ) : (
                <Container fluid>
                    <h1 style={{ textAlign: 'center', color: 'white', marginTop: 20, marginBottom: 30 }}>
                        Add tracks to your playlist below!
                    </h1>

                    <Row className="justify-content-center">
                        <Col md={6}>
                            <SearchBar storeSearch={setSearchInput} searchHandler={search} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={10} className="mx-auto mt-4">
                            <SearchResults tracks={tracks} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default App;
