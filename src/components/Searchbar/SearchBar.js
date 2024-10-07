import './SearchBar.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function SearchBar(props) {
    const { storeSearch, searchHandler } = props;

    const handleInputChange = (e) => {
        storeSearch(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <InputGroup className='mb-3'>
                <FormControl 
                    placeholder="Search For Tracks"
                    type='input'
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            searchHandler();
                        }
                    }}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <Button onClick={searchHandler} variant="primary" className="search-button">Search</Button>
            </InputGroup>
        </div>
    );
}

export default SearchBar;
