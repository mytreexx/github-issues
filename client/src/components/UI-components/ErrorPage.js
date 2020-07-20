import React from 'react';
import styled from 'styled-components';


const ErrorPage = () => {
  return (
    <ErrorMessage>
      <span>:(</span>
      <div>
        <h1>Oops!</h1>
        <p>Something went wrong. Did you type everything correctly?</p>
      </div>

    </ErrorMessage>
  );
}


const ErrorMessage = styled.div`
  display: flex;
  margin-bottom: 50px;

  span {
    color: #b2b2b2;
    font-size: 250px;
    text-align: center;
    vertical-align: middle;
  }

  div {
    margin-top: 130px;
    margin-left: 50px;
  }
`


export default ErrorPage;
