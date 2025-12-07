import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginVue } from '@rsbuild/plugin-vue';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginVue(), pluginLess()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  html: {
    template: './static/index.html',
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        target: 'http://api.dauth.com:8081',
      },
    },
  },
});
