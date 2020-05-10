import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';


const IssueContainerNav = () => {
  return (
    <StyledIssueContainerNav>
      <button>Filters</button>
      <input></input>
      <button>Lables</button>
      <button>Milestones</button>
      <button>New issue</button>
    </StyledIssueContainerNav>
  );
}

const StyledIssueContainerNav = styled(Flex).attrs({
  width: "978px",
  margin: "auto",
  marginBottom: "16px",
})`
  padding-top: 24px;

`;

export default IssueContainerNav;
