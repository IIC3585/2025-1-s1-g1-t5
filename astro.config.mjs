// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), svelte(), vue()],

  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',
});