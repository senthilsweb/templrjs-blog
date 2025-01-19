import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

let db: any;

if (process.env.DATABASE_URL.startsWith('sqlite:')) {
  const dbPath = process.env.DATABASE_URL.replace('sqlite://', '');
  const sqlite = new Database(dbPath);
  db = drizzle(sqlite, { schema });
} else {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  });
  db = drizzlePg(pool, { schema });
}

export { db };

