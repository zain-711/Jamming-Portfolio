import './SearchResults.css';
import { Container, Card, Row, Button } from 'react-bootstrap';

function SearchResults({ tracks, addTrackToPlaylist }) {
  return (
    <div className='results-box'>
      <h2>Results</h2>
      <Container>
        <Container>
          <Row className='mx-2 row row-cols-1'> {/* Changed to row-cols-1 for single column layout */}
            {tracks.map(track => (
              <Card key={track.id} className="d-flex flex-row align-items-center mb-3 result-item"> {/* Flex row layout */}
                <Card.Img src={track.album.images[0]?.url} alt={track.name} className="track-image" /> {/* Smaller image */}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text>{track.artists.map(artist => artist.name).join(", ")}</Card.Text>
                  <Card.Text>{track.album.name}</Card.Text>
                  <Button onClick={() => addTrackToPlaylist(track)}>Add to Playlist</Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </Container>  
    </div>
  );
}

export default SearchResults;
{/*  */}