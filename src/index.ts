import express, { type Request, type Response } from "express";

import { env } from "./config/env";
import connectDB from "./config/db";
import { requestLogger } from "./middlewares/requestLogger";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", apiRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

const startServer = async () => {
  await connectDB();

  app.listen(env.port, "0.0.0.0", () => {
    console.log(`Server listening on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
