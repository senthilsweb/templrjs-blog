#!/bin/sh

if [ "$DATABASE_TYPE" = "postgres" ]; then
  echo "Using PostgreSQL database"
  export DATABASE_URL=$PG_DATABASE_URL
else
  echo "Using SQLite database"
  export DATABASE_URL=$SQLITE_DATABASE_URL
fi

# Initialize the database
npx tsx scripts/init-sqlite.ts

# Start the application
npm start

