import { Knex } from "knex";

const tableName = "user_privateinfo";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.text("CPF");
    table.text("ethnicity");
    table.text("birth");
    table.text("occupation");
    table.text("gender");
    table.text("marital_status");
    table.text("nationality");
    table.text("state_nationality");
    table.text("father_name");
    table.text("mother_name");
    table.text("source");
    table.text("city_born");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
