import './Playlists.css';
import { Container, Card, ListGroup } from 'react-bootstrap';

function Playlists({ playlists }) {
  return (
    <Container className="mt-4">
      <Card className="playlists-box">
        <Card.Header>Your Playlists</Card.Header>
        <ListGroup variant="flush">
          {playlists.map((playlist) => (
            <ListGroup.Item key={playlist.id}>
              <strong>{playlist.name}</strong>
              <div>{playlist.description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Playlists;
