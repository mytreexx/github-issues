import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';


const IssueContainer = () => {
  const [issues, setIssues] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/repos/bluzi/name-db/')
      .then(response => response.json())
      .then(data => {
        setIssues(data);
        data.items.map((issue) =>
          console.log(issue.title));
      })
  }, []);

  return (
    <>
      <IssueContainerNav />
      <StyledIssueContainer>
        {issues ?
          (<>
            <IssueListHeader>
              <input type='checkbox' />
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
              issues.items.map((issue, i) =>
                //TODO: change key to issue id
                <StyledIssue key={i}>
                  <input type='checkbox' />
                  {issue.state}
                  <a href='/'>{issue.title}</a>
                  #{issue.number}
                  opened on {issue.created_at}
                  by <a href='/'>{issue.user.login}</a>
                  {issue.comments}
                </StyledIssue>
              )}
          </>) : <NoIssues />}
      </StyledIssueContainer>
    </>
  )
}

const StyledIssueContainer = styled(Flex).attrs({
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

const StyledIssue = styled.div`
  width: 100%;
  height: 57.5px;
  border-top: solid 1px #d1d5da;
  margin: 0;

  input {
    margin-left: 16px;
    margin-top: 10px;
  
  }

  :hover {
    background-color: #F6F8FA;
  }
`
const IssueListHeader = styled(StyledIssue)`
  border-top: none;
  width: 100%;
  background-color: #F6F8FA;
  pointer-events: none;
`


export default IssueContainer;
