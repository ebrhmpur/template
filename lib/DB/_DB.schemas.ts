import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["admin", "user", "editor"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: roleEnum("role").notNull().default("user"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const colors = pgTable("colors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 225 }).notNull(),
});
