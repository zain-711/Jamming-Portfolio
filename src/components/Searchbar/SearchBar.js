import './SearchBar.css'
import {  InputGroup, FormControl, Button, } from 'react-bootstrap';

function SearchBar(props){

    const { storeSearch } = props
    const { searchHandler } = props

    const handleInputChange = (e) => {
        // Update the search input state in the parent component
        storeSearch(e.target.value);
      };


    return (
        <div>
            <h1>Successfully logged in! </h1>
            <InputGroup className='mb-3' size="lg">
            <FormControl placeholder="Search For Tracks"
            type='input'
            onKeyDown={e => {
                if (e.key == "Enter"){
                    searchHandler()
                }
            }}
            onChange={handleInputChange}
            />
            <Button onClick={searchHandler}>Search</Button>
            </InputGroup>
        </div>
    )


    // const { value } = props
    // const { setValue } = props
    // const { storedSearch } = props
    // const { setStoredSearch } = props



    // const handleChange = (e) => {
    //     setValue(e.target.value)
    // }

    // const handleClick = () => {
    //     setStoredSearch(value)
    //     console.log(storedSearch)
    // }

    // return (<div>
    //     <input className='searchbar' value={value} onChange={handleChange}/>
    //     <button onClick={handleClick}>Enter</button>
    // </div>)

}

export default SearchBar;