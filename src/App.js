import React from 'react';

import NavBar from './components/NavBar/NavBar';
import RepoHead from './components/RepoHead/RepoHead';
import IssueContainer from './components/IssueContainer/IssueContainer';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <>
      <NavBar />
      <RepoHead />
      <IssueContainer />
      <Footer />
    </>
  );
}

export default App;
