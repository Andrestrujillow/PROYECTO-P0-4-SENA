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
            if (entry.isDirectory()) await walk(full);
            else if (/\.(br|gz)$/i.test(full)) continue;
            else {
              const code = await readFile(full);
              if (code.length >= 1024) {
                const compressed = await compressFn(code);
                await writeFile(full + ext, compressed);
              }
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
    chunkSizeWarningLimit: 2000,
  },
});
