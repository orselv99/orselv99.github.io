import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Main = styled.div`
background-color: green;
`;
const Text = styled.div`

`

export const Bot = () => {
  const [t] = useTranslation();
  return (
    <Main>
      <Text>
        {t('designed by')}
      </Text>
    </Main>
  );
}