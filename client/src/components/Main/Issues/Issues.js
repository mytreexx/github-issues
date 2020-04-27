import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import RepoHead from './RepoHead/RepoHead';
import IssueContainer from './IssueContainer/IssueContainer';
import IssueComments from './IssueComments/IssueComments';


const Issues = () => {
  return (
    <>
      <RepoHead />
      <BrowserRouter>
        <Switch>
          <Route path="/:userName/:repoName/issues" exact component={IssueContainer} />
          <Route path="/:userName/:repoName/issues/:issueNumber" exact component={IssueComments} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Issues;
