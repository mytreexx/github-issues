import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';


const IssueContainer = () => {
  return (
    <>
      <IssueContainerNav />
      <StyledIssueContainer>
        <NoIssues />
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
