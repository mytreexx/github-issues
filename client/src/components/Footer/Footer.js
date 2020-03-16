import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { MarkGithub } from '@primer/octicons-react'

const Footer = () => {
  return (
    <Container>
      <span>
        <span>© 2020 GitHub, Inc.</span>
        <a href='https://github.com/site/terms'>Terms</a>
        <a href='https://github.com/site/privacy'>Privacy</a>
        <a href='https://github.com/security'>Security</a>
        <a href='https://githubstatus.com/'>Status</a>
        <a href='https://help.github.com/'>Help</a>
      </span>

      <Octicon icon={MarkGithub} />

      <span>
        <a href='https://github.com/contact'>Contact Github</a>
        <a href='https://github.com/pricing'>Pricing</a>
        <a href='https://developer.github.com/'>API</a>
        <a href='https://training.github.com/'>Training</a>
        <a href='https://github.blog/'>Blog</a>
        <a href='https://github.com/about'>About</a>
      </span>
    </Container>

  );
}

const Container = styled.div`
  width: 980px;
  margin: auto;
  margin-top: 40px;
  padding: 40px 0;
  height: 25px;
  border-top: 1px solid #EAECEF;
`

export default Footer;
