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
          <div>
            <StyledOcticon icon={Code} />
            Code
          </div>
          <div>
            <StyledOcticon icon={IssueOpened} />
            Issues 17
         </div>
          <div>
            <StyledOcticon icon={GitPullRequest} />
            Pull Requests 95
           </div>
          <div>
            <StyledOcticon icon={Play} />
            Actions
         </div>
          <div>
            <StyledOcticon icon={Shield} />
            Security
          </div>
          <div>
            <StyledOcticon icon={Graph} />
            Insights
        </div>
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
  margin: auto;
`

const RepoHeader = styled.div`
  width: 100%;
`
const RepoNavbar = styled.div`
  width: 100%;

  div {
    display: inline-block;
  }
`

const StyledOcticon = styled(Octicon)`
  color: #959da5;
  margin-right: 4px;
`

export default RepoHead;
