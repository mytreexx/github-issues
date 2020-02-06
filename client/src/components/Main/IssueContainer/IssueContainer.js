import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';


// return axios.get(URLConstants.USER_URL, { headers: { Authorization: `Bearer ${data.token}` } });

const IssueContainer = () => {
  // axios.get('https://api.github.com/repos/bluzi/name-db//search/issues')
  axios.get('https://github.com/login/oauth/authorize')

  
    .then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
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
