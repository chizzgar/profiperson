import { Router } from "express";

import { healthRouter } from "./health";
import { usersRouter } from "./users";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(usersRouter);
