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
          (
            <ul>{
              issues.items.map((issue, i) =>
                <li key={i}>{issue.title}</li>
              )}
            </ul>
          ) : <NoIssues />}
      </StyledIssueContainer>


    </>
  )
}


const StyledIssueContainer = styled(Flex).attrs({
  width: "978px",
  minHeight: "335px",
})`
  padding-top: 24px;
  border: solid 1px #d1d5da;
  border-radius: 3px;
  margin: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default IssueContainer;
