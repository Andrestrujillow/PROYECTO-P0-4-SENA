import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { gzip, brotliCompress } from "node:zlib";
import { promisify } from "node:util";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

function compressionPlugin(algorithm: "gzip" | "brotliCompress"): Plugin {
  const ext = algorithm === "gzip" ? ".gz" : ".br";
  const compressFn = algorithm === "gzip" ? gzipAsync : brotliAsync;
  return {
    name: `compression-${algorithm}`,
    apply: "build",
    closeBundle: {
      order: "post",
      handler: async () => {
        const outDir = resolve("dist");
        const walk = async (dir: string) => {
          const entries = await readdir(dir, { withFileTypes: true });
          for (const entry of entries) {
            const full = resolve(dir, entry.name);
            if (entry.isDirectory()) { await walk(full); continue; }
            if (/\.(br|gz)$/i.test(full)) continue;
            const code = await readFile(full);
            if (code.length >= 1024) {
              const compressed = await compressFn(code);
              await writeFile(full + ext, compressed);
            }
          }
        };
        await walk(outDir);
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compressionPlugin("brotliCompress"),
    compressionPlugin("gzip"),
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
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/react-router")) return "vendor-react";
          if (id.includes("node_modules/echarts")) return "vendor-echarts";
          if (id.includes("node_modules/leaflet") || id.includes("node_modules/react-leaflet")) return "vendor-leaflet";
          if (id.includes("node_modules/@tanstack")) return "vendor-table";
          if (id.includes("node_modules/date-fns") || id.includes("node_modules/clsx") || id.includes("node_modules/tailwind-merge") || id.includes("node_modules/zod") || id.includes("node_modules/zustand") || id.includes("node_modules/lucide-react") || id.includes("node_modules/ky")) return "vendor-utils";
          if (id.includes("node_modules/xlsx")) return "vendor-xlsx";
          if (id.includes("node_modules/gsap") || id.includes("node_modules/@gsap")) return "vendor-gsap";
          if (id.includes("node_modules/motion") || id.includes("node_modules/framer-motion")) return "vendor-motion";
          if (id.includes("node_modules/chart.js") || id.includes("node_modules/react-chartjs-2")) return "vendor-chartjs";
        },
      },
    },
  },
});
