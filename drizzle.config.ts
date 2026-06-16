import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/DB/init/DB.schemas.ts",
  out: "./lib/DB/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
