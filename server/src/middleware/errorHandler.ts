import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("[Error]", err.message);

  if (err.message.includes("Solo se permiten archivos")) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err.message.includes("El archivo Excel")) {
    res.status(422).json({ error: err.message });
    return;
  }

  if (err.message.includes("Unexpected")) {
    res.status(422).json({ error: "Error al procesar el archivo Excel" });
    return;
  }

  res.status(500).json({ error: "Error interno del servidor" });
}
