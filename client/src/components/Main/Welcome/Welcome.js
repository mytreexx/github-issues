import React from 'react';
import styled from 'styled-components';
import Octicon, { LightBulb } from '@primer/octicons-react'


const Welcome = () => {
  return (
    <MainContainer>
      <LightBulbOcticon icon={LightBulb} />
      <span>
        <h1>
          Welcome to the repository issue finder!
        </h1>

        <p>
          You can view any repo's issue section by searching it in the navbar.
        </p>
      </span>
    </MainContainer>
  );
}


const LightBulbOcticon = styled(Octicon)`
  width: 200px;
  height: 200px;
  color: #C6CBD1;
`

const MainContainer = styled.div`
  display: flex;
  margin: 75px 0;
  justify-content: center;

  span{
    margin-left: 20px;
  }
`

export default Welcome;
