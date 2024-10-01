import { useState } from 'react';

function SearchBar(){

    const [searchValue, setSearchValue] = useState("")

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    return <input defaultValue={searchValue} onChange={handleChange}/>
}

export default SearchBar;