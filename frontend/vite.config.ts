import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), vuetify(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@rootTypes': path.resolve(__dirname, '../../types'),
    },
  },
  assetsInclude: ['@/assets/**', '**/*.svg'],
});
