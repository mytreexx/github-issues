import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { IssueOpened, Comment } from '@primer/octicons-react'

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';


const IssueContainer = () => {
  const [issues, setIssues] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/repos/bluzi/name-db/')
      .then(response => response.json())
      .then(repoIssues => {
        setIssues(repoIssues.items);
        repoIssues.items.map((issue) =>
          console.log(issue.title));
      })
  }, []);

  return (
    <>
      <IssueContainerNav />

      <IssueListContainer>
        {issues ?
          (<>
            <IssueListHeader>
              <input type='checkbox' />
              <Octicon icon={IssueOpened} />

              <a href='/'> 18 Open</a>
              <a href='/'>21 Closed</a>

              <a href='/'>Author</a>
              <a href='/'>Label</a>
              <a href='/'>Projects</a>
              <a href='/'>Milestones</a>
              <a href='/'>Asignee</a>
              <a href='/'>Sort</a>
            </IssueListHeader>

            {
              issues.map((issue, i) =>
                <Issue key={i}>
                  <Container>
                    <input type='checkbox' />
                    <OpenIssueOcticon icon={IssueOpened} />

                    <TitleContainer>
                      <a href='/'>{issue.title}</a>
                      <span>
                        #{issue.number} opened on {issue.created_at} by <a href='/'>{issue.user.login}</a>
                      </span>
                    </TitleContainer>
                  </Container>

                  <Container>
                    <CommentOcticon icon={Comment} />
                    {issue.comments}
                  </Container>
                </Issue>
              )}
          </>
          ): <NoIssues />}
      </IssueListContainer>
    </>
  )
}

const IssueListContainer = styled(Flex).attrs({
  width: "978px",
  minHeight: "335px"
})`
  padding: 0;
  border: solid 1px #d1d5da;
  border-radius: 4px;
  margin: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  }
`;

const Issue = styled.div`
  width: 100%;
  height: 57.5px;
  border-top: solid 1px #d1d5da;
  margin: 0;
  display: flex;
  justify-content: space-between;

  input {
    margin-left: 16px;
    margin-right: 16px;
  }

  :hover {
    background-color: #F6F8FA;
  }
`
const IssueListHeader = styled(Issue)`
  border-top: none;
  width: 100%;
  background-color: #F6F8FA;
  pointer-events: none;
`

const Container = styled.span`
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;
`
const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 0;
`

const OpenIssueOcticon = styled(Octicon)`
  color: #28a745;
  padding-top: 5px;
`

const CommentOcticon = styled(Octicon)`
  color: #586069;
`

export default IssueContainer;
