import React, { useEffect, useState } from 'react';
import { Switch } from '@mui/material';

export const DarkModeSwitch = () => {
  useEffect(() => {
    // default 값 light
    const mode = window.localStorage.getItem('mode') ?? 'light';
    window.localStorage.setItem('mode', mode);
  }, []);

  const onClick = () => {
    const mode = window.localStorage.getItem('mode') === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = mode;
    window.localStorage.setItem('mode', mode);
  }

  return (
    <>
      <Switch value='darkmode' onClick={onClick} />
    </>
  );
}