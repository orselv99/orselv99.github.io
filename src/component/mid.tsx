import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
display: flex;
background-color: blue;
`;
export const Mid = () => {
  return (
    <Main>
      <div>left</div>
      <div>right</div>
    </Main>
  );
}