import './SearchResults.css';
import { Container, Row, Card } from 'react-bootstrap';

function SearchResults(props){

    const { tracks } = props

    return (
        <Container>
            <Container>
            <Row className='mx-2 row row-cols-1'> {/* Changed to row-cols-1 for single column layout */}
              {tracks.map(track => (
                <Card key={track.id} className="d-flex flex-row align-items-center mb-3"> {/* Flex row layout */}
                  <Card.Img src={track.album.images[0]?.url} alt={track.name} className="track-image" /> {/* Smaller image */}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{track.name}</Card.Title>
                    <Card.Text>{track.artists.map(artist => artist.name).join(", ")}</Card.Text>
                    <Card.Text>{track.album.name}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Row>
            </Container>
        </Container>   

    )

}

export default SearchResults


// make a button next to the search bar for results to show up