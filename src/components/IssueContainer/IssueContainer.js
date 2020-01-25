import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';


const IssueContainer = () => {
  return (
    <>
      <IssueContainerNav />
      <StyledIssueContainer />
    </>
  );
}

const StyledIssueContainer = styled(Flex).attrs({
  width: "978px",
  height: "335px",
})`
  padding-top: 24px;
  border: solid 1px #d1d5da;
  margin: auto; 
`;

export default IssueContainer;
