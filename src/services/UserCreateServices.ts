import { UserCreateRepository, UserCreate } from "../repositories/UserCreateRepository";
import { hash } from "bcrypt";
import { AppError } from "../utils/AppError";

import { UserAllInfos } from "../controllers/UsersController";

export interface UserUpdate {
  id: number;
  data: UserAllInfos;
}

class UserCreateServices {
  userCreateRepository;

  constructor(userCreateRepository: UserCreateRepository) {
    this.userCreateRepository = userCreateRepository;
  }

  async execute({ name, email, password }: UserCreate) {
    if (!name || !email || !password) throw new AppError("Preencha todos os campos");

    const verifyEmail = await this.userCreateRepository.verifyEmailExists({ email });

    if (verifyEmail) throw new AppError("Esse email já está em uso");

    const hashPassword = await hash(password, 8);

    const user_created = await this.userCreateRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user_created;
  }

  async execute_update({ id, data }: UserUpdate) {
    const { user_id } = await this.userCreateRepository.update({ id, data });

    return user_id;
  }
}

export { UserCreateServices };
