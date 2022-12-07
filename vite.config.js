import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

import path from 'path'


export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [
    // vue()
  ],
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
  },

  build: {
    /* https://stackoverflow.com/questions/71500190/how-to-keep-root-level-export-when-building-with-vite-in-format-esm */

    rollupOptions: {
      preserveEntrySignatures: 'strict',
      input: {
        main: "main.js",
        
      },

      output: {
        manualChunks: true, //false,
        inlineDynamicImports: false, //true,
        entryFileNames: '[name].js',   // currently does not work for the legacy bundle
        assetFileNames: '[name].[ext]', // currently does not work for images
      },
    }
  }
})
