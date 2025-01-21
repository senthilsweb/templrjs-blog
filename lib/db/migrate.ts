import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import * as schema from './schema';
import * as path from 'path';

export async function runSqliteMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const dbPath = process.env.DATABASE_URL.replace('sqlite://', '');
  
  // Ensure we're using an absolute path for the database
  const absoluteDbPath = path.isAbsolute(dbPath) 
    ? dbPath 
    : path.join(process.cwd(), dbPath);

  console.log(`Using database at: ${absoluteDbPath}`);
  
  const sqlite = new Database(absoluteDbPath);
  const db = drizzle(sqlite, { schema });

  try {
    console.log('Running SQLite migrations...');
    await migrate(db, { 
      migrationsFolder: path.join(process.cwd(), 'drizzle'),
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    sqlite.close();
  }
}

