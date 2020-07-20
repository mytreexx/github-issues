import React from 'react';
import styled from 'styled-components';
import Octicon, { LightBulb } from '@primer/octicons-react';
import { Helmet } from 'react-helmet';


const Welcome = () => {
  return (
    <>
      <Helmet>
        <title>
          Welcome!
      </title>
      </Helmet>
      <MainContainer>
        <LightBulbOcticon icon={LightBulb} />
        <span>
          <h1>
            Welcome!
          </h1>

          <p>
            You can view any repository issue section by searching it.
          </p>
        </span>
      </MainContainer>
    </>
  );
};


const LightBulbOcticon = styled(Octicon)`
  width: 200px;
  height: 200px;
  color: #C6CBD1;
`

const MainContainer = styled.div`
  display: flex;
  margin: 75px 0;
  justify-content: center;
  border: 1px #e1e4e8 solid;
  border-radius: 10px;
  max-width: 870px;
  width: 90%;
  margin: auto;
  margin-top: 50px;
  padding: 50px;

  span{
    margin-left: 20px;
  }
`

export default Welcome;
