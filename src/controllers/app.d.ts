declare module "@mui/material/styles" {
  interface Palette {
  }

  export function createTheme(options: ThemeOptions): Theme;
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}