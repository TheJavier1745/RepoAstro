import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://front.yourmetrics.cl/',
  output: 'static', 
  integrations: [react(),mdx(), sitemap()],

})