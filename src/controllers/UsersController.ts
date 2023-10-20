import { Request, Response } from "express";
import { UserCreateRepository, UserCreate } from "../repositories/UserCreateRepository";
import { UserCreateServices } from "../services/UserCreateServices";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password }: UserCreate = req.body;

    const userCreateRepository = new UserCreateRepository();
    const userCreateServices = new UserCreateServices(userCreateRepository);

    await userCreateServices.execute({ name, email, password });

    return res.json({ message: "Usuário cadastrado com sucesso" });
  }

  async create_subinfos() {}

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const userCreateRepository = new UserCreateRepository();
    const userCreateServices = new UserCreateServices(userCreateRepository);

    const all_details = await userCreateServices.execute_alldetails({ id: user_id });

    return res.json(all_details);
  }

  async show(req: Request, res: Response) {
    const users = await new UserCreateRepository().allusers();

    return res.json(users);
  }
}

export { UserController };
