import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import RepoNavBar from './RepoNavBar/RepoNavBar';


const RepoHead = () => {
  return (
    <StyledRepoHead>
      <div>Username/Repository</div>
      <RepoNavBar />
    </StyledRepoHead>
  );
}


const StyledRepoHead = styled(Flex).attrs({
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

export default RepoHead;
