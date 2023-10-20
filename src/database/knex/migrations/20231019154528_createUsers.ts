import * as dotenv from "dotenv";
import { Knex } from "knex";
import { hash } from "bcrypt";

dotenv.config();
const tableName = "users";

export async function up(knex: Knex): Promise<void> {
  const existsTable = await knex.schema.hasTable(tableName);
  const adminPass = await hash(process.env.ADMIN_PASS as string, 8);
  if (!existsTable) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments("id"),
        table.text("name"),
        table.text("email"),
        table.text("password"),
        table.boolean("is_admin").notNullable().defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }

  return await knex(tableName).insert({
    name: "admin",
    email: process.env.ADMIN_EMAIL,
    password: adminPass,
    is_admin: true,
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
