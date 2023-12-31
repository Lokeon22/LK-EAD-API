import { connection as knex } from "../database/knex";
import {
  UserProps,
  UserPrivateInfo,
  UserContactInfo,
} from "../@types/UserType";

import { UserUpdate } from "../services/UserCreateServices";

type UserCreate = Pick<UserProps, "name" | "email" | "password">;
type UserDetailsProps = UserProps & UserPrivateInfo & UserContactInfo;

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
    knex.transaction(async (trx) => {
      try {
        const [user_id] = await trx("users").insert({
          name,
          email,
          password,
        });

        await trx("user_privateinfo").insert({
          user_id,
        });

        await trx("user_contactinfo").insert({
          contact_id: user_id,
        });

        await trx.commit();
      } catch (error) {
        await trx.rollback();
        return console.log("Error", error);
      }
    });
  }

  async update({ id, data }: UserUpdate) {
    const private_info: UserPrivateInfo = await knex("user_privateinfo")
      .where({ user_id: id })
      .first();
    const contact_info: UserContactInfo = await knex("user_contactinfo")
      .where({ contact_id: id })
      .first();

    //first update_privateinfos from user
    await knex("user_privateinfo")
      .where({ user_id: id })
      .update({
        CPF: data.cpf ?? private_info.cpf,
        ethnicity: data.ethnicity ?? private_info.ethnicity,
        birth: data.birth ?? private_info.birth,
        occupation: data.occupation ?? private_info.occupation,
        gender: data.gender ?? private_info.gender,
        marital_status: data.marital_status ?? private_info.marital_status,
        nationality: data.nationality ?? private_info.nationality,
        father_name: data.father_name ?? private_info.father_name,
        mother_name: data.mother_name ?? private_info.mother_name,
        source: data.source ?? private_info.source,
        city_born: data.city_born ?? private_info.city_born,
      });

    //second update_contact from user
    await knex("user_contactinfo")
      .where({ contact_id: id })
      .update({
        phone: data.phone ?? contact_info.phone,
        cep: data.cep ?? contact_info.cep,
        state: data.state ?? contact_info.state,
        address: data.address ?? contact_info.address,
        house_number: data.house_number ?? contact_info.house_number,
        city: data.city ?? contact_info.city,
        neighborhood: data.neighborhood ?? contact_info.neighborhood,
        education: data.education ?? contact_info.education,
        institution_name:
          data.institution_name ?? contact_info.institution_name,
        institution_type:
          data.institution_type ?? contact_info.institution_type,
        year_graduation: data.year_graduation ?? contact_info.year_graduation,
      });

    return { user_id: id };
  }

  async details({ id }: { id: number }) {
    const user_details: UserDetailsProps = await knex("users")
      .join("user_privateinfo", "users.id", "user_privateinfo.user_id")
      .join("user_contactinfo", "users.id", "user_contactinfo.contact_id")
      .select()
      .where({ id })
      .first();

    return user_details;
  }
}

export { UserCreateRepository, UserCreate };
