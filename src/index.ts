import express from "express";

import { env } from "./config/env";
import connectDB from "./config/db";
import { User } from "./models/User";
import { requestLogger } from "./middlewares/requestLogger";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", apiRouter);

app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch {
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const startServer = async () => {
  await connectDB();
  const user = await User.findOne();
  console.log("Sample user:", user);

  app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
