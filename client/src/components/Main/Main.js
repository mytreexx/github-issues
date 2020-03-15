import React from 'react';

import RepoHead from './RepoHead/RepoHead';
// import IssueContainer from './IssueContainer/IssueContainer';
import IssueComments from './IssueComments/IssueComments';


const Main = () => {
  return (
    <>
      <RepoHead />
      {/* <IssueContainer /> */}
      <IssueComments />
    </>
  );
}

export default Main;
