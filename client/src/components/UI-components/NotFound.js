import React from 'react';
import styled from 'styled-components';
import Octicon, { X } from '@primer/octicons-react';

const NotFound = () => {
  return (
    <Container>
      <LightBulbOcticon icon={X} />
      <span>
        <h1>Oops!</h1>

        <p>It looks like we can't find the what you're searching for.</p>
      </span>
    </Container>
  );
};

const LightBulbOcticon = styled(Octicon)`
  width: 200px;
  height: 200px;
  color: #c6cbd1;
`;

const Container = styled.div`
  display: flex;
  margin: 75px 0;
  justify-content: center;

  span {
    margin-left: 20px;
  }
`;

export default NotFound;
