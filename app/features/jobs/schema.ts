import {
  bigint,
  bigserial,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  job_id: bigserial({ mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
