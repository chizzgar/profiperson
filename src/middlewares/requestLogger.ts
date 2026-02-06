import type { NextFunction, Request, Response } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    const line = `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`;
    console.log(line);
  });

  next();
}
