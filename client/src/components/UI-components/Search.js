import styled  from "styled-components";

const Search = styled.input`
  background-color: ${props => props.type === "inverse" ? "#C6CBD1" : "#3F4448"};
  width: 300px;
  height: 28px;
  border-style: none;
  border-radius: 3px;
  padding: 0;
}

::placeholder {
  color: #8c8f92;
  color: ${props => props.type === "inverse" ? "#3F4448" : "#8c8f92"};
  font-weight: 600;
  padding-left: 7px;
}
`

export default Search;
