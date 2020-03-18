import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { Repo, Code, IssueOpened, GitPullRequest, Play, Shield, Graph } from '@primer/octicons-react'


const RepoHead = () => {
  return (
    <Container>
      <MainContainer>
        <RepoHeader>
          <StyledOcticon icon={Repo} />
          <span>bluzi/name-db</span>
        </RepoHeader>

        <RepoNavbar>
          <Tab>
            <StyledOcticon icon={Code} />
            Code
          </Tab>
          <Tab id="issues">
            <StyledOcticon icon={IssueOpened} />
            Issues 17
          </Tab>
          <Tab>
            <StyledOcticon icon={GitPullRequest} />
            Pull Requests 95
          </Tab>
          <Tab>
            <StyledOcticon icon={Play} />
            Actions
          </Tab>
          <Tab>
            <StyledOcticon icon={Shield} />
            Security
          </Tab>
          <Tab>
            <StyledOcticon icon={Graph} />
            Insights
         </Tab>
        </RepoNavbar>
      </MainContainer>

    </Container>
  );
}


const Container = styled(Flex).attrs({
  as: "header",
  width: "100%",
  height: "112px",
  alignItems: "center",
  justifyContent: "center",
})`
  background-color: #FAFBFC;
  padding-top: 24px;
  border-bottom: solid 1px #e1e4e8;  
`;

const MainContainer = styled.div`
  width: 978px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RepoHeader = styled.div`
  width: 100%;
`

const RepoNavbar = styled.div`
  width: 100%;
`

const Tab = styled.div`
  display: inline-block;
  padding: 7px 12px;
  font-size: 14px;
  color: #586069;

  :hover {
    color: #24292e;
    cursor: pointer;
  }

  .issues {
    background-color: red;
  }
`

const StyledOcticon = styled(Octicon)`
  color: #959da5;
  margin-right: 4px;
`

export default RepoHead;
