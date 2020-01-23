import React from 'react';

import NavBar from './components/NavBar/NavBar';
import RepoHead from './components/RepoHead/RepoHead';
import IssueContainer from './components/IssueContainer/IssueContainer';


const App = () => {
  return (
    <>
      <NavBar />
      <RepoHead />
      <IssueContainer />
    </>
  );
}

export default App;
