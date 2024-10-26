import './Playlists.css';
import { Container, Card, Row, Button } from 'react-bootstrap';

function Playlists(props) {

  const {  playlist, setplaylistName, deleteTrack, savePlaylist } = props

  const handleInputChange = (e) =>{
    setplaylistName(e.target.value)
  }

  return (
    <div className="playlists-container">
      <div className="title">
        <input className='playlist-title' placeholder='New Playlist' onChange={handleInputChange}/>
      </div>    
        <Container>
          <Row className='mx-2 row row-cols-1'> 
            {playlist.map(playlist => (
              <Card key={playlist.id} className="d-flex flex-row align-items-center mb-3 result-item"> 
                <Card.Body className="d-flex flex-column">
                  <Card.Title className='cardTitle'>{playlist.name}</Card.Title>
                  <Card.Text><strong>Artists: </strong>{playlist.artists}</Card.Text>
                  <Button className='delete-button' onClick={() => {deleteTrack(playlist.id)}}>-</Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
          <Button onClick={savePlaylist}>Save to Spotify</Button>
        </Container>
    </div>
  );
}

export default Playlists;

