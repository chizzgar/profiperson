import { Router } from "express";

import { loginUser } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/auth/login", loginUser);
