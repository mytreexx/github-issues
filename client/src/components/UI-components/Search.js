import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Search = ({ color }) => {
  const [searchInput, setSearchInput] = useState('');
  let history = useHistory();

  const handleChange = (event) => setSearchInput(event.target.value);

  const handlePress = (event) =>
    event.keyCode === 13 && history.push(`/${searchInput}/issues`);

  return (
    <SearchBar
      color={color}
      type='text'
      placeholder='Search username/repository'
      value={searchInput}
      onChange={handleChange}
      onKeyDown={handlePress}
    />
  );
};

const SearchBar = styled.input`
  background-color: #3F4448;
  color: #8c8f92;
  font-weight: 600;
  margin-left: 7px;
  width: 300px;
  height: 28px;
  border-style: none;
  border-radius: 3px;
  padding: 0;


::placeholder {
  color: #8c8f92;
  color: #8c8f92;
  font-weight: 600;
  padding-left: 7px;
}
`

export default Search;
