
import './PlaylistList.css';
import { Container, Card, Row, } from 'react-bootstrap';
import { useEffect } from 'react';
function PlaylistList({playlists}){
    useEffect(() => {
        console.log("Playlists received in PlaylistList:", playlists);  // Debugging
    }, [playlists]);
    
    return (    
    <div className="playlistsList-container">
        <div className="title">
          <h2 className="h2">Playlists</h2>
        </div>    
          <Container>
            <Row className='mx-2 row row-cols-1'> 
              {playlists.map(playlists => (
                <Card key={playlists.id} className="playlistItem d-flex flex-row align-items-center mb-3 result-item"> 
                  <Card.Body className="d-flex flex-row flex-wrap">
                  <Card.Img src={playlists.images[0]?.url} className="playlist-image"/>
                    <Card.Title className='name'>{playlists.name}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
      </div>)
}

export default PlaylistList