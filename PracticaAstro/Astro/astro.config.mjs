import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server', 
  integrations: [mdx(), sitemap(), react()],
});