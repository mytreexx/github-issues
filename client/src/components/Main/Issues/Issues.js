import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RepoHead from './RepoHead/RepoHead';
import IssueListNav from './IssueListNav/IssueListNav';
import IssueComments from './IssueComments/IssueComments';

const Issues = () => {
  return (
    <>
      <RepoHead />
      
      <Switch>
        <Route
          path='/:userName/:repoName/issues'
          exact
          component={IssueListNav}
        />

        <Route
          path='/:userName/:repoName/issues/:issueNumber'
          exact
          component={IssueComments}
        />
      </Switch>
    </>
  );
};

export default Issues;
