import { Sequelize } from "sequelize";
export const ConnectionSequelize = new Sequelize({
  username: "postgres",
  password: "postgres",
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5432,
  database: "farm2global",
});
