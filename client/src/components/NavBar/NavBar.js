import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { MarkGithub } from '@primer/octicons-react';

import Search from '../UI-components/Search';


const NavBar = () => {
  return (
    <StyledNavBar>
      <LogoOcticon icon={MarkGithub} />
      <Search />
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
`

const LogoOcticon = styled(Octicon)`
  color: #ffffff;
  width: 32px;
  height: 32px;
  padding: 0 16px;

  :hover {
    filter: brightness(0.75);
  }
`

export default NavBar;
