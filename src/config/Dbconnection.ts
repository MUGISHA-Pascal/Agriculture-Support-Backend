// import { Sequelize } from "sequelize";
// export const ConnectionSequelize = new Sequelize({
//   username: "postgres",
//   password: "postgres",
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
//   port: 5432,
//   database: "farm2global",
// });
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const ConnectionSequelize = new Sequelize(
  "postgresql://pascal:jCS6aJFGQ3CwYVK3H2RyMPlcpOSHcpfO@dpg-cuvgq6ogph6c73esb3j0-a.oregon-postgres.render.com/project_database_kwgc",
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
