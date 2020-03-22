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
          <SelectedTab>
            <StyledOcticon icon={IssueOpened} />
            Issues 17
          </SelectedTab>
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
`

const SelectedTab = styled(Tab)`
  background-color: white;
  border-top: #e36209 3px solid;
  border-right: solid 1px #e1e4e8;
  border-left: solid 1px #e1e4e8;
  box-shadow: 0 1px 0 #fff;
  border-radius: 3px 3px 0 0;
  `

const StyledOcticon = styled(Octicon)`
  color: rgba(27,31,35,.3);
  margin-right: 4px;
`

export default RepoHead;
