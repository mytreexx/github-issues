import React, { useState } from 'react';
import styled from "styled-components";


const Search = (props) => {
  const [searchInput, setSearchInput] = useState();

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  const handlePress = event => {
    event.keyCode === 13 && console.log('yay');
  };

  return (
    <StyledSearch
      color={props.color}
      type='text'
      placeholder='Search...'
      value={searchInput}
      onChange={handleChange}
      onKeyDown={handlePress}
    />
  )
};

const StyledSearch = styled.input`
  background-color: ${props => props.color === "inverse" ? "#C6CBD1" : "#3F4448"};
  color: ${props => props.color === "inverse" ? "#3F4448" : "#8c8f92"};
  font-weight: 600;
  margin-left: 7px;
  width: 300px;
  height: 28px;
  border-style: none;
  border-radius: 3px;
  padding: 0;
}

::placeholder {
  color: #8c8f92;
  color: ${props => props.color === "inverse" ? "#3F4448" : "#8c8f92"};
  font-weight: 600;
  padding-left: 7px;
}
`

export default Search;
