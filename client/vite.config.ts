import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

const compress = viteCompression as unknown as (opts?: Record<string, unknown>) => import("vite").Plugin;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compress({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    compress({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } },
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor-react", test: /node_modules[\\/](react|react-dom|react-router-dom)/ },
            { name: "vendor-echarts", test: /node_modules[\\/](echarts|echarts-for-react|echarts-gl)/ },
            { name: "vendor-leaflet", test: /node_modules[\\/](leaflet|react-leaflet)/ },
            { name: "vendor-table", test: /node_modules[\\/]@tanstack/ },
            { name: "vendor-utils", test: /node_modules[\\/](date-fns|clsx|tailwind-merge|zod|zustand|lucide-react)/ },
            { name: "vendor-xlsx", test: /node_modules[\\/]xlsx/ },
            { name: "vendor-gsap", test: /node_modules[\\/](gsap|@gsap)/ },
            { name: "vendor-motion", test: /node_modules[\\/](motion|framer-motion)/ },
            { name: "vendor-chartjs", test: /node_modules[\\/](chart.js|react-chartjs-2)/ },
          ],
        },
      },
    },
  },
});
