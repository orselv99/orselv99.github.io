import React, { useEffect, useState } from 'react';
import './footer.css';

export const Footer = () => {
  const [year, setYear] = useState(1990);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      {`@ ${year} orseL`}
    </footer>
  );
}