import { connection as knex } from "../database/knex";
import { UserProps } from "../@types/UserType";

import { UserPrivateInfo, UserContactInfo } from "../@types/UserType";

type UserCreate = Pick<UserProps, "name" | "email" | "password">;

type UserUpdate = {
  id: number;
};

class UserCreateRepository {
  async verifyEmailExists({ email }: { email: string }) {
    const user: UserProps = await knex("users").where({ email }).first();

    return user;
  }

  async allusers() {
    const users: UserProps[] = await knex("users");

    return users;
  }

  async create({ name, email, password }: UserCreate) {
    const [user_id] = await knex("users").insert({
      name,
      email,
      password,
    });

    return { id: user_id };
  }

  async all_details({ id }: { id: number }) {
    const user: UserProps = await knex("users").where({ id }).first();

    const user_private: UserPrivateInfo = await knex("user_privateinfo")
      .where({ user_id: id })
      .first();

    const user_contact: UserContactInfo = await knex("user_contactinfo")
      .where({ contact_id: id })
      .first();

    return { user: user ?? [], user_private: user_private ?? [], user_contact: user_contact ?? [] };
  }
}

export { UserCreateRepository, UserCreate };
