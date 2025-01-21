import Database from "better-sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log("Initializing SQLite database...")

  const dbPath = path.join(__dirname, "..", "local.db")
  console.log(`Using database at: ${dbPath}`)

  const db = new Database(dbPath)

  try {
    console.log("Creating perf_test_metrics table...")
    db.exec(`
      CREATE TABLE IF NOT EXISTS perf_test_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datasource_description TEXT,
        no_of_files_or_tables INTEGER,
        file_type TEXT,
        list_of_file_types TEXT,
        data_source_type TEXT,
        total_source_data_size_in_kb REAL,
        no_of_columns_in_file_or_table INTEGER,
        row_count_per_resource INTEGER,
        total_row_count_of_all_resources INTEGER,
        mds_size_after_lite_scan_in_kb REAL,
        mds_size_after_deep_scan_in_kb REAL,
        mds_size_with_bidb_after_scan_in_kb REAL,
        mds_size_after_data_profile_in_kb REAL,
        mds_size_with_bidb_after_data_profile_in_kb REAL,
        mds_size_in_percentage_of_source_size REAL,
        x_times_of_source_size REAL,
        latency_lite_scan_in_sec REAL,
        latency_deep_scan_in_sec REAL,
        latency_data_profile_in_sec REAL,
        test_execution_timestamp TEXT,
        iteration_number INTEGER,
        application_version TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("perf_test_metrics table created successfully")

    console.log("Creating contact_submissions table...")
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT,
        contact_reason TEXT,
        callback_requested INTEGER DEFAULT 0,
        description TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("contact_submissions table created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
  } finally {
    db.close()
  }
}

main().catch(console.error)

