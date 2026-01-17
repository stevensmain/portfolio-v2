import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'three-vendor': ['three'],
            scrollreveal: ['scrollreveal'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'three', 'scrollreveal'],
    },
    ssr: {
      noExternal: ['three', 'scrollreveal'],
    },
  },

  adapter: netlify(),
});
