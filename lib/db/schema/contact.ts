import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { sqliteTable, text as sqliteText, integer as sqliteInteger } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// Contact submissions tables
const createPgContactTable = () =>
  pgTable("contact_submissions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number"),
    contactReason: text("contact_reason").notNull(),
    callbackRequested: boolean("callback_requested").default(false),
    description: text("description"),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  })

const createSqliteContactTable = () =>
  sqliteTable("contact_submissions", {
    id: sqliteInteger("id").primaryKey({ autoIncrement: true }),
    name: sqliteText("name").notNull(),
    email: sqliteText("email").notNull(),
    phoneNumber: sqliteText("phone_number"),
    contactReason: sqliteText("contact_reason").notNull(),
    callbackRequested: sqliteInteger("callback_requested", { mode: "boolean" }).default(false),
    description: sqliteText("description"),
    isRead: sqliteInteger("is_read", { mode: "boolean" }).default(false),
    createdAt: sqliteText("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: sqliteText("updated_at").default(sql`CURRENT_TIMESTAMP`),
  })

// Export the appropriate tables based on the database type
const isSQLite = process.env.DATABASE_URL?.startsWith("sqlite:")

export const contact_submissions = isSQLite ? createSqliteContactTable() : createPgContactTable()

// Type exports
export type ContactSubmission = typeof contact_submissions.$inferSelect
export type NewContactSubmission = typeof contact_submissions.$inferInsert

