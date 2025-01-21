import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { Pool } from "pg"
import { contact_submissions } from "./schema"

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required")
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  })

  const db = drizzle(pool)

  console.log("Running contact submissions migrations...")

  await migrate(db, { migrationsFolder: "drizzle" })

  console.log("Contact submissions migrations completed!")

  await pool.end()
}

runMigrations().catch((err) => {
  console.error("Migration failed!", err)
  process.exit(1)
})

