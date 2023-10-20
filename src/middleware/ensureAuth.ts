import { Request, Response, NextFunction } from "express";
import { authConfigs } from "../configs/auth";
import { verify } from "jsonwebtoken";

function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.json({ message: "User unauthorized" });

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfigs.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    return res.json({ message: "User unauthorized" });
  }
}

export { ensureAuth };
