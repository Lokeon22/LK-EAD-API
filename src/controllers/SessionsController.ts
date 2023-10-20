import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { compare } from "bcrypt";

import { authConfigs } from "../configs/auth";
import { sign } from "jsonwebtoken";

import { UserProps } from "../@types/UserType";
import { AppError } from "../utils/AppError";

class SessionController {
  async create(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) throw new AppError("Preencha todos os campos");

    const user: UserProps = await knex("users").where({ email }).first();

    if (!user) throw new AppError("Email e/ou senha incorretas");

    const comparePass = await compare(password, user.password);

    if (!comparePass) throw new AppError("Email e/ou senha incorretas");

    const { secret, expiresIn } = authConfigs.jwt;
    const token: string = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

export { SessionController };
