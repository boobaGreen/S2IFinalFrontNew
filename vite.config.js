import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), nodePolyfills()],
  server: {
    host: "127.0.0.1",
    port: 4000,
  },
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
});
