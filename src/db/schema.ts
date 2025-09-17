// src/db/schema.ts
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2'; // Generates unique IDs

// Define the 'leads' table
export const leads = pgTable("leads", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()), // Automatically generate a unique ID for each new lead
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(), // Ensures no duplicate emails
  phone: varchar("phone", { length: 20 }),
  status: varchar("status", { length: 50 }).notNull().default('NEW'),
  createdAt: timestamp("created_at").notNull().defaultNow(), // Automatically sets the timestamp
});

// This export will be helpful later for TypeScript type inference
export type Lead = typeof leads.$inferSelect; // Type for a selected lead (queries)
export type NewLead = typeof leads.$inferInsert; // Type for inserting a new lead