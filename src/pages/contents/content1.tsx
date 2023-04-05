import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from '../menu';

import './content1.css'

export const Content1 = () => {
  return (
    <>
      <Menu />
      <div id='content_container'>
        <h2>
          Content1
        </h2>
      </div>
    </>
  )
}