module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_DB || "postgres",
  entities: ["dist/apps/aqua-webapp/**/entities/*{ .ts,.js}"],
  synchronize: false,
  migrations: ["dist/apps/aqua-webapp/**/migrations/*{.ts,.js}"],
  migrationsRun: true,
};
