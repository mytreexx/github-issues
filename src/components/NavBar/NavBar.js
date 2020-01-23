import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';


const NavBar = () => {
  return (
    <StyledNavBar>
      <div>
        <a>
          logo
        </a>
        <input />
        <a href='/'>Pull Requests</a>
        <a href='/'>Issues</a>
        <a href='/'>Marketplace</a>
        <a href='/'>Explore</a>
      </div>
      <div>
        <a href='/'>notifications</a>
        <a href='/'>plus</a>
        <a href='/'>profile</a>
      </div>
    </StyledNavBar>
  );
}


const StyledNavBar = styled(Flex).attrs({
  as: "header",
  width: "100%",
  height: "64px",
  alignItems: "center",
})`
  background-color: #24292E;

  a {
    margin: 0;
    color: #ffffff;
    text-decoration: none;
  }
`;

export default NavBar;
