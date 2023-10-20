const config = require("../../../knexfile.ts");
import knex from "knex";

const connection = knex(config.development);

export { connection };
