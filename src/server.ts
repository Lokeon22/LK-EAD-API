require("express-async-errors");
import Express, { Request, Response, NextFunction } from "express";

import { AppError } from "./utils/AppError";
import { routes } from "./routes";

const app = Express();

app.use(Express.json());

app.use(routes);

const PORT = 8080;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ status: "error", message: error.message });
  }

  return res.status(500).json({ status: "error", message: "Server Error" });
});

app.listen(PORT, () => console.log("server is Running"));
