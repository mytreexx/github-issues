import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';


const IssueContainer = () => {
  return (
    <>
      <IssueContainerNav />
      <StyledIssueContainer>
        <h1>
          Welcome to Issues!
        </h1>
        <p>
          Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in
          <br />
          a searchable and filterable list. To get started, you should create an issue.
        </p>
      </StyledIssueContainer>
    </>
  );
}

const StyledIssueContainer = styled(Flex).attrs({
  width: "978px",
  height: "335px",
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
