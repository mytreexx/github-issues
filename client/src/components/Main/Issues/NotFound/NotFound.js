import React from 'react';
import styled from 'styled-components';
import Octicon, { X } from '@primer/octicons-react';


const NotFound = () => {
  return (
    <MainContainer>
      <LightBulbOcticon icon={X} />
      <span>
        <h1>
          Oops!
        </h1>

        <p>
          It looks like we can't find the repositiry you're searching for.
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

export default NotFound;
