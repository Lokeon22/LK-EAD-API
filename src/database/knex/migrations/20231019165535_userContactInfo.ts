import { Knex } from "knex";

const tableName = "user_contactinfo";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table
      .integer("contact_id")
      .references("user_id")
      .inTable("user_privateinfo")
      .onDelete("CASCADE");
    table.text("phone");
    table.text("cep");
    table.text("state");
    table.text("address");
    table.text("house_number");
    table.text("city");
    table.text("neighborhood");
    table.text("education");
    table.text("institution_name");
    table.text("institution_type");
    table.text("year_graduation");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
