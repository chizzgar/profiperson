import { Router } from "express";

import { healthRouter } from "./health";
import { usersRouter } from "./users";
import { authRouter } from "./auth";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(usersRouter);
apiRouter.use(authRouter);
