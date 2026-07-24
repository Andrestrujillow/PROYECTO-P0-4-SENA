import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { parseExcel } from "../services/excel.service.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.originalname.endsWith(".xlsx")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos .xlsx"));
    }
  },
});

export const uploadExcel = [
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: "No se envió ningún archivo" });
        return;
      }

      const fichas = parseExcel(file.buffer);

      res.json({
        fichas,
        total: fichas.length,
        fileName: file.originalname,
      });
    } catch (err) {
      next(err);
    }
  },
];
