import styled from 'styled-components';


const Loading = styled.div`
  margin-top: 100px;
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px dotted #b2b2b2;
  animation: loader-spin 1.2s linear infinite;

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    } 
`;

export default Loading;
