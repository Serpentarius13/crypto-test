import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ script: { defineModel: true, propsDestructure: true } }), svgLoader()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  experimental: {},
  test: {
    environment: 'jsdom',
    globals: true
  }
});
