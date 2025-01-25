import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {visualizer} from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer(
    {
      filename: './dist/stats.html',
      open: true,
    }
  )],
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ["react", "react-dom"],
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 10000,
  },
});
