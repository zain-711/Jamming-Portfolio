import './SearchResults.css';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

function SearchResults({ tracks, addTrackToPlaylist }) {
  return (
    <Container className="mt-4 d-flex">
      {/* Search Results Box */}
      <Card className="results-box" style={{ width: '400px', marginRight: '20px' }}>
        <Card.Header>Search Results</Card.Header>
        <ListGroup variant="flush">
          {tracks.map((track) => (
            <ListGroup.Item key={track.id} className="result-item">
              <div className="track-info">
                <img
                  src={track.image || 'default-image-path.jpg'}
                  alt={track.name}
                  className="track-image"
                />
                <div>
                  <strong>{track.name}</strong>
                  <div>{track.artists.join(', ')}</div>
                  <Button onClick={() => addTrackToPlaylist(track)}>Add to Playlist</Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Playlists Box */}
      <Card className="playlists-box" style={{ width: '400px' }}>
        <Card.Header>Your Playlists</Card.Header>
        <ListGroup variant="flush">
          {/* Fetch your playlists here */}
          {yourPlaylists.map((playlist) => (
            <ListGroup.Item key={playlist.id}>
              <a href={playlist.link} target="_blank" rel="noopener noreferrer">
                {playlist.name}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default SearchResults;
