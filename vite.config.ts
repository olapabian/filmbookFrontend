import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  optimizeDeps: {
    exclude: ['styled-components']
  },
  server: {
    hmr: {
      overlay: false // Disable the HMR overlay
    }
  }
});
