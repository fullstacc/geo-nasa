/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import reactRefresh from '@vitejs/plugin-react-refresh'
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [cesium(), react()],
  define: {
    'process.env': {},
  },
});
