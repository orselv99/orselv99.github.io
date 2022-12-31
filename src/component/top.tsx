import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  background-color: red;
`;

export const Top = () => {
  return (
    <Main>
      <div>LOGO</div>
      <div>Top</div>
    </Main>
  );
}