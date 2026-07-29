import express from "express";
import "dotenv/config";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "client", "dist");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(compression());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }, contentSecurityPolicy: false }));
app.use(morgan("short"));

app.use(express.static(DIST, { maxAge: "1y", immutable: true }));

const HTML = join(DIST, "index.html");
app.get("/{*splat}", async (_req, res) => {
  try {
    if (!existsSync(HTML)) {
      res.status(503).type("text").send("Build not found. Run `npm run build` first.");
      return;
    }
    res.type("html").end(await readFile(HTML, "utf-8"));
  } catch {
    res.status(500).type("text").send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`SENA PE-04 server running on http://localhost:${PORT}`);
});
