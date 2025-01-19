import { config } from 'dotenv';
import { runSqliteMigrations } from '../lib/db/migrate';
import { seed } from '../lib/db/seed';
import * as path from 'path';
import * as fs from 'fs';

async function initSqlite() {
  // Load environment variables
  config();

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const dbPath = process.env.DATABASE_URL.replace('sqlite://', '');
  const absoluteDbPath = path.isAbsolute(dbPath) 
    ? dbPath 
    : path.join(process.cwd(), dbPath);

  // Create database directory if it doesn't exist
  const dbDir = path.dirname(absoluteDbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Touch the database file if it doesn't exist
  if (!fs.existsSync(absoluteDbPath)) {
    fs.writeFileSync(absoluteDbPath, '');
  }

  try {
    console.log('Initializing SQLite database...');
    await runSqliteMigrations();
    console.log('Running seed...');
    await seed();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initSqlite();

