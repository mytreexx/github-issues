import React from 'react';
import styled from 'styled-components';
import Octicon, { MarkGithub } from '@primer/octicons-react';

const Footer = () => {
  return (
    <Container>
      <span>© 2020 GitHub, Inc.</span>
      <a href='https://github.com/site/terms'>Terms</a>
      <a href='https://github.com/site/privacy'>Privacy</a>
      <a href='https://github.com/security'>Security</a>
      <a href='https://githubstatus.com/'>Status</a>
      <a href='https://help.github.com/'>Help</a>

      <a href='https://github.com/'>
        <GithubLogo icon={MarkGithub} />
      </a>

      <a href='https://github.com/contact'>Contact GitHub</a>
      <a href='https://github.com/pricing'>Pricing</a>
      <a href='https://developer.github.com/'>API</a>
      <a href='https://training.github.com/'>Training</a>
      <a href='https://github.blog/'>Blog</a>
      <a href='https://github.com/about'>About</a>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1248px;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 40px;
  padding: 40px 32px;
  min-height: 25px;
  border-top: 1px solid #EAECEF;
  display: flex;
  justify-content: space-between;  
  color: #586069;
  font-size: 12px;
  
  a {
    color: #0366d6;
    text-decoration: none;
    padding-left: 16px;

    :hover {
      text-decoration: underline;
    }
  }
  `;

const GithubLogo = styled(Octicon)`
  color: #c6cbd1;
  width: 24px;
  height: 24px;
  padding-left: 15px;

  :hover {
    color: #9fa6ae;
  }
`;

export default Footer;
