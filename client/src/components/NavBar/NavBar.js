import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { MarkGithub } from '@primer/octicons-react';

import Search from '../UI-components/Search';

const NavBar = () => {
  return (
    <Container>
      <a href='/'>
        <LogoOcticon icon={MarkGithub} />
      </a>

      <Search />
      <a href='/'>Pull requests</a>
      <a href='/'>Issues</a>
      <a href='/'>Marketplace</a>
      <a href='/'>Explore</a>
    </Container>
  );
};

const Container = styled(Flex).attrs({
  as: "header",
  width: "100%",
  height: "53px",
  alignItems: "center",
})`
  background-color: #24292e;

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
`;

const LogoOcticon = styled(Octicon)`
  color: #ffffff;
  width: 32px;
  height: 32px;
  padding-right: 8px;

  :hover {
    filter: brightness(0.75);
  }
`;

export default NavBar;
