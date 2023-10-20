import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./sessions.routes";

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", sessionRoutes);

export { routes };
