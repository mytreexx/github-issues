import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import RepoHead from './RepoHead/RepoHead';
import IssueContainer from './IssueContainer/IssueContainer';
import IssueComments from './IssueComments/IssueComments';


const Main = () => {
  return (
    <>
      <RepoHead />
      <BrowserRouter>
        <Switch>
          <Route path="/bluzi/name-db/issues" exact component={IssueContainer} />
          <Route path="/bluzi/name-db/issues/458" exact component={IssueComments} />
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default Main;
