import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Main />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
