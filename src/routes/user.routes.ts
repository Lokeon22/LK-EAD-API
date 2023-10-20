import { Router } from "express";
import { UserController } from "../controllers/UsersController";

import { ensureAuth } from "../middleware/ensureAuth";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users/register", userController.create);
userRoutes.get("/users", userController.show);
userRoutes.get("/myaccount/details", ensureAuth, userController.index);

export { userRoutes };
