import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/styles/tools/_sassMagic.scss';
          @import './src/styles/settings/var.scss';
        `,
      },
    },
  },
  build: {
    rollupOptions: {
      manualChunks: {
        axios: ["axios"],
        vue: ["vue"],
        "vue-pdf-embed": ["vue-pdf-embed"],
        "vue3-pdfjs": ["vue3-pdfjs"],
      },
    },
    minify: 'esbuild'
  },
});
