import './App.css';
import SearchBar from "../Searchbar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import { useState } from 'react';


function App() {

  
  const [searchValue, setSearchValue] = useState("")
  const [storedSearch, setStoredSearch] = useState("")



  return (
    <div className="App">
      <div className='header'>
        <h1>Jamming</h1>
        <h3 className='subheading1'>The Spotify playlist creator!</h3>
        <div className='search'>
          <label style={{marginRight: 10}}>Search for your favorite song here:</label>
          <SearchBar value={searchValue} setValue={setSearchValue} storedSearch={storedSearch} setStoredSearch={setStoredSearch}/>        
        </div>
      </div>
      <div>
        <SearchResults value={searchValue} storedSearch={storedSearch}/>
      </div>

      </div>
  );
}

export default App;

