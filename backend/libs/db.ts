import { Sequelize } from "sequelize";

const connectionString =
  process.env.DATABASE_URL || "postgres://odion:test@localhost:5432/test";

export const db = new Sequelize(connectionString, {
  dialectOptions: {
    // Some managed Postgres hosts require SSL; set DB_SSL=true in Render if required
    ssl:
      process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  },
});
