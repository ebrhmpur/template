import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing!");
}

const migrationClient = postgres(connectionString, { max: 1 });
const db = drizzle(migrationClient);

async function main() {
  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "./lib/DB/migrations" });

  console.log("Migrations completed!");
  await migrationClient.end();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
