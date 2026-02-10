import { Router } from "express";

import { getUsers, registerUser } from "../controllers/userController";

export const usersRouter = Router();

usersRouter.get("/users", getUsers);
usersRouter.post("/users", registerUser);
