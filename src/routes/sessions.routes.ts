import { Router } from "express";
import { SessionController } from "../controllers/SessionsController";

const sessionRoutes = Router();

const sessionController = new SessionController();

sessionRoutes.post("/sessions", sessionController.create);

export { sessionRoutes };
