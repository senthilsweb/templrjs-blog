import postgres from "postgres"
import { config } from "dotenv"

config()

async function main() {
  console.log("Initializing PostgreSQL database...")

  const sql = postgres(process.env.DATABASE_URL!)

  try {
    console.log("Creating perf_test_metrics table...")
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS perf_test_metrics (
        id SERIAL PRIMARY KEY,
        datasource_description TEXT,
        no_of_files_or_tables INTEGER,
        file_type TEXT,
        list_of_file_types TEXT,
        data_source_type TEXT,
        total_source_data_size_in_kb NUMERIC,
        no_of_columns_in_file_or_table INTEGER,
        row_count_per_resource BIGINT,
        total_row_count_of_all_resources BIGINT,
        mds_size_after_lite_scan_in_kb NUMERIC,
        mds_size_after_deep_scan_in_kb NUMERIC,
        mds_size_with_bidb_after_scan_in_kb NUMERIC,
        mds_size_after_data_profile_in_kb NUMERIC,
        mds_size_with_bidb_after_data_profile_in_kb NUMERIC,
        mds_size_in_percentage_of_source_size NUMERIC,
        x_times_of_source_size NUMERIC,
        latency_lite_scan_in_sec NUMERIC,
        latency_deep_scan_in_sec NUMERIC,
        latency_data_profile_in_sec NUMERIC,
        test_execution_timestamp DATE,
        iteration_number INTEGER,
        application_version TEXT,
        created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("perf_test_metrics table created successfully")

    console.log("Creating contact_submissions table...")
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(100) NOT NULL,
        email CHARACTER VARYING(255) NOT NULL,
        phone_number CHARACTER VARYING(20),
        contact_reason CHARACTER VARYING(50),
        callback_requested BOOLEAN DEFAULT FALSE,
        description TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP(6) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP(6) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("contact_submissions table created successfully")

    // Create indexes
    console.log("Creating indexes...")
    await sql.unsafe(`
      CREATE INDEX IF NOT EXISTS idx_perf_test_metrics_created_at ON perf_test_metrics(created_at);
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
    `)
    console.log("Indexes created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
  } finally {
    await sql.end()
  }
}

main().catch(console.error)

