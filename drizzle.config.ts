import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL.replace('sqlite://', '')
  },
  verbose: true,
  strict: true,
} satisfies Config;

