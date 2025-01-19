import { config } from 'dotenv';
import { runSqliteMigrations } from '../lib/db/migrate';
import { runPostgresMigrations } from '../lib/db/migrate-pg';
import { seed } from '../lib/db/seed';

async function initDb() {
  // Load environment variables
  config();

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  try {
    console.log('Initializing database...');
    if (process.env.DATABASE_URL.startsWith('sqlite:')) {
      await runSqliteMigrations();
    } else {
      await runPostgresMigrations();
    }
    console.log('Running seed...');
    await seed();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDb();

