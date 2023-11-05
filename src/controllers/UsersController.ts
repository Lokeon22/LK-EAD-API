import { Request, Response } from "express";
import {
  UserCreateRepository,
  UserCreate,
} from "../repositories/UserCreateRepository";
import { UserCreateServices } from "../services/UserCreateServices";

import { UserPrivateInfo, UserContactInfo } from "../@types/UserType";

export type UserAllInfos = UserPrivateInfo & UserContactInfo;

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password }: UserCreate = req.body;

    const userCreateRepository = new UserCreateRepository();
    const userCreateServices = new UserCreateServices(userCreateRepository);

    await userCreateServices.execute({ name, email, password });

    return res.json({ message: "Usuário cadastrado com sucesso" });
  }

  async update_subinfos(req: Request, res: Response) {
    const user_id = req.user.id;
    const data: UserAllInfos = req.body;

    const userCreateRepository = new UserCreateRepository();
    const userCreateServices = new UserCreateServices(userCreateRepository);

    await userCreateServices.execute_update({ id: user_id, data });

    return res.json({ message: "Usuario atualizado!" });
  }

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const userCreateRepository = new UserCreateRepository();
    const userCreateServices = new UserCreateServices(userCreateRepository);

    const user = await userCreateServices.execute_details({ id: user_id });

    return res.json(user);
  }

  async show(req: Request, res: Response) {
    const users = await new UserCreateRepository().allusers();

    return res.json(users);
  }
}

export { UserController };
