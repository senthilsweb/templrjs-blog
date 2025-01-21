import { pgTable, text, integer, real, boolean, timestamp, date, serial } from "drizzle-orm/pg-core"
import { sqliteTable, text as sqliteText, integer as sqliteInteger, real as sqliteReal } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
// Create separate table definitions for PostgreSQL and SQLite
const createPgMetricsTable = () =>
  pgTable("perf_test_metrics", {
    id: serial("id").primaryKey(),
    datasourceDescription: text("datasource_description"),
    noOfFilesOrTables: integer("no_of_files_or_tables"),
    fileType: text("file_type"),
    listOfFileTypes: text("list_of_file_types"),
    dataSourceType: text("data_source_type"),
    totalSourceDataSizeInKb: real("total_source_data_size_in_kb"),
    noOfColumnsInFileOrTable: integer("no_of_columns_in_file_or_table"),
    rowCountPerResource: integer("row_count_per_resource"),
    totalRowCountOfAllResources: integer("total_row_count_of_all_resources"),
    mdsSizeAfterLiteScanInKb: real("mds_size_after_lite_scan_in_kb"),
    mdsSizeAfterDeepScanInKb: real("mds_size_after_deep_scan_in_kb"),
    mdsSizeWithBidbAfterScanInKb: real("mds_size_with_bidb_after_scan_in_kb"),
    mdsSizeAfterDataProfileInKb: real("mds_size_after_data_profile_in_kb"),
    mdsSizeWithBidbAfterDataProfileInKb: real("mds_size_with_bidb_after_data_profile_in_kb"),
    mdsSizeInPercentageOfSourceSize: real("mds_size_in_percentage_of_source_size"),
    xTimesOfSourceSize: real("x_times_of_source_size"),
    latencyLiteScanInSec: real("latency_lite_scan_in_sec"),
    latencyDeepScanInSec: real("latency_deep_scan_in_sec"),
    latencyDataProfileInSec: real("latency_data_profile_in_sec"),
    testExecutionTimestamp: date("test_execution_timestamp"),
    iterationNumber: integer("iteration_number"),
    applicationVersion: text("application_version"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  })

const createSqliteMetricsTable = () =>
  sqliteTable("perf_test_metrics", {
    id: sqliteInteger("id").primaryKey({ autoIncrement: true }),
    datasourceDescription: sqliteText("datasource_description"),
    noOfFilesOrTables: sqliteInteger("no_of_files_or_tables"),
    fileType: sqliteText("file_type"),
    listOfFileTypes: sqliteText("list_of_file_types"),
    dataSourceType: sqliteText("data_source_type"),
    totalSourceDataSizeInKb: sqliteReal("total_source_data_size_in_kb"),
    noOfColumnsInFileOrTable: sqliteInteger("no_of_columns_in_file_or_table"),
    rowCountPerResource: sqliteInteger("row_count_per_resource"),
    totalRowCountOfAllResources: sqliteInteger("total_row_count_of_all_resources"),
    mdsSizeAfterLiteScanInKb: sqliteReal("mds_size_after_lite_scan_in_kb"),
    mdsSizeAfterDeepScanInKb: sqliteReal("mds_size_after_deep_scan_in_kb"),
    mdsSizeWithBidbAfterScanInKb: sqliteReal("mds_size_with_bidb_after_scan_in_kb"),
    mdsSizeAfterDataProfileInKb: sqliteReal("mds_size_after_data_profile_in_kb"),
    mdsSizeWithBidbAfterDataProfileInKb: sqliteReal("mds_size_with_bidb_after_data_profile_in_kb"),
    mdsSizeInPercentageOfSourceSize: sqliteReal("mds_size_in_percentage_of_source_size"),
    xTimesOfSourceSize: sqliteReal("x_times_of_source_size"),
    latencyLiteScanInSec: sqliteReal("latency_lite_scan_in_sec"),
    latencyDeepScanInSec: sqliteReal("latency_deep_scan_in_sec"),
    latencyDataProfileInSec: sqliteReal("latency_data_profile_in_sec"),
    testExecutionTimestamp: sqliteText("test_execution_timestamp"),
    iterationNumber: sqliteInteger("iteration_number"),
    applicationVersion: sqliteText("application_version"),
    createdAt: sqliteText("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: sqliteText("updated_at").default(sql`CURRENT_TIMESTAMP`),
  })

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

export const perf_test_metrics = isSQLite ? createSqliteMetricsTable() : createPgMetricsTable()
export const contact_submissions = isSQLite ? createSqliteContactTable() : createPgContactTable()

// Type exports
export type Metric = typeof perf_test_metrics.$inferSelect
export type NewMetric = typeof perf_test_metrics.$inferInsert
export type ContactSubmission = typeof contact_submissions.$inferSelect
export type NewContactSubmission = typeof contact_submissions.$inferInsert

