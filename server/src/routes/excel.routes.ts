import { Router } from "express";
import { uploadExcel } from "../controllers/excel.controller.js";

const router = Router();

router.post("/upload", uploadExcel);
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export { router as excelRoutes };
