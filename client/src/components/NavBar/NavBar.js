import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import logo from '../../assets/images/GitHub-Logo.png';


const NavBar = () => {
  return (
    <StyledNavBar>
      <img src={logo} alt='Logo' />
      <Input placeholder='Search or jump to...'></Input>
      <a href='/'>Pull requests</a>
      <a href='/'>Issues</a>
      <a href='/'>Marketplace</a>
      <a href='/'>Explore</a>
    </StyledNavBar>
  );
}


const StyledNavBar = styled(Flex).attrs({
  as: "header",
  width: "100%",
  height: "53px",
  alignItems: "center",
})`
  background-color: #24292E;

  a {
    margin-left: 16px;
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }

  a:hover {
    filter: brightness(0.75);
  }

  img {
    margin-left: 16px;
  }

  img:hover {
    filter: brightness(0.75);
  }
`;

const Input = styled.input`
  background-color: #3F4448;
  width: 300px;
  height: 28px;
  border-style: none;
  border-radius: 3px;
  margin-left: 16px;
  padding: 0;
}
::placeholder {
  color: #8c8f92;
  font-weight: 600;
  padding-left: 7px;
}
`

export default NavBar;
