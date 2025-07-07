import {
  bigint,
  bigserial,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "../users/schema";

export const jobs = pgTable("jobs", {
  job_id: bigserial({ mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  user_id: bigint("user_id", { mode: "number" }).references(() => users.user_id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
