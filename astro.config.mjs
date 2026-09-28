// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://orselv99.github.io',
  redirects: {
    '/': '/about',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});