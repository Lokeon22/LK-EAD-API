import { UserCreateRepository, UserCreate } from "../repositories/UserCreateRepository";
import { hash } from "bcrypt";
import { AppError } from "../utils/AppError";

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

    const { id } = await this.userCreateRepository.create({ name, email, password: hashPassword });

    return { user_created: id };
  }

  async execute_alldetails({ id }: { id: number }) {
    const { user, user_contact, user_private } = await this.userCreateRepository.all_details({
      id,
    });

    return { user, user_contact, user_private };
  }
}

export { UserCreateServices };
