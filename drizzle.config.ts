import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/DB/_DB.schemas.ts",
  out: "./lib/DB/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
