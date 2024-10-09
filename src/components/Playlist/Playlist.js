// Playlists.js
import './Playlists.css';
import { Container, Card, ListGroup } from 'react-bootstrap';

function Playlists({ playlists }) {
  return (
    <Container className="playlists-container mt-4">
      {/* <Card className="playlists-box">
        <Card.Header>Your Playlists</Card.Header>
        <ListGroup variant="flush">
          {playlists.map((playlist) => (
            <ListGroup.Item key={playlist.id} className="playlist-item">
              <strong>{playlist.name}</strong>
              <div>{playlist.description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card> */}
    </Container>
  );
}

export default Playlists;


//       // {/* Playlists Box */}
//       // <Card className="playlists-box" style={{ width: '400px' }}>
//       //   <Card.Header>Your Playlists</Card.Header>
//       //   <ListGroup variant="flush">
//       //     {/* Fetch your playlists here */}
//       //     {Playlists.map((playlist) => (
//       //       <ListGroup.Item key={playlist.id}>
//       //         <a href={playlist.link} target="_blank" rel="noopener noreferrer">
//       //           {playlist.name}
//       //         </a>
//       //       </ListGroup.Item>
//       //     ))}
//       //   </ListGroup>
//       // </Card>