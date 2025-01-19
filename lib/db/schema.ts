import { 
  pgTable, 
  text,
  integer,
  real,
} from 'drizzle-orm/pg-core';
import {
  sqliteTable
} from 'drizzle-orm/sqlite-core';

// Create separate table definitions for PostgreSQL and SQLite
const createPgTable = () => pgTable('perf_test_metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  datasourceDescription: text('datasource_description'),
  noOfFilesOrTables: integer('no_of_files_or_tables'),
  fileType: text('file_type'),
  listOfFileTypes: text('list_of_file_types'),
  dataSourceType: text('data_source_type'),
  totalSourceDataSizeInKb: real('total_source_data_size_in_kb'),
  noOfColumnsInFileOrTable: integer('no_of_columns_in_file_or_table'),
  rowCountPerResource: integer('row_count_per_resource'),
  totalRowCountOfAllResources: integer('total_row_count_of_all_resources'),
  mdsSizeAfterLiteScanInKb: real('mds_size_after_lite_scan_in_kb'),
  mdsSizeAfterDeepScanInKb: real('mds_size_after_deep_scan_in_kb'),
  mdsSizeWithBidbAfterScanInKb: real('mds_size_with_bidb_after_scan_in_kb'),
  mdsSizeAfterDataProfileInKb: real('mds_size_after_data_profile_in_kb'),
  mdsSizeWithBidbAfterDataProfileInKb: real('mds_size_with_bidb_after_data_profile_in_kb'),
  mdsSizeInPercentageOfSourceSize: real('mds_size_in_percentage_of_source_size'),
  xTimesOfSourceSize: real('x_times_of_source_size'),
  latencyLiteScanInSec: real('latency_lite_scan_in_sec'),
  latencyDeepScanInSec: real('latency_deep_scan_in_sec'),
  latencyDataProfileInSec: real('latency_data_profile_in_sec'),
  testExecutionTimestamp: text('test_execution_timestamp'),
  iterationNumber: integer('iteration_number'),
  applicationVersion: text('application_version'),
});

const createSqliteTable = () => sqliteTable('perf_test_metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  datasourceDescription: text('datasource_description'),
  noOfFilesOrTables: integer('no_of_files_or_tables'),
  fileType: text('file_type'),
  listOfFileTypes: text('list_of_file_types'),
  dataSourceType: text('data_source_type'),
  totalSourceDataSizeInKb: real('total_source_data_size_in_kb'),
  noOfColumnsInFileOrTable: integer('no_of_columns_in_file_or_table'),
  rowCountPerResource: integer('row_count_per_resource'),
  totalRowCountOfAllResources: integer('total_row_count_of_all_resources'),
  mdsSizeAfterLiteScanInKb: real('mds_size_after_lite_scan_in_kb'),
  mdsSizeAfterDeepScanInKb: real('mds_size_after_deep_scan_in_kb'),
  mdsSizeWithBidbAfterScanInKb: real('mds_size_with_bidb_after_scan_in_kb'),
  mdsSizeAfterDataProfileInKb: real('mds_size_after_data_profile_in_kb'),
  mdsSizeWithBidbAfterDataProfileInKb: real('mds_size_with_bidb_after_data_profile_in_kb'),
  mdsSizeInPercentageOfSourceSize: real('mds_size_in_percentage_of_source_size'),
  xTimesOfSourceSize: real('x_times_of_source_size'),
  latencyLiteScanInSec: real('latency_lite_scan_in_sec'),
  latencyDeepScanInSec: real('latency_deep_scan_in_sec'),
  latencyDataProfileInSec: real('latency_data_profile_in_sec'),
  testExecutionTimestamp: text('test_execution_timestamp'),
  iterationNumber: integer('iteration_number'),
  applicationVersion: text('application_version'),
});

// Export the appropriate table based on the database type
export const perf_test_metrics = process.env.DATABASE_URL?.startsWith('sqlite:') 
  ? createSqliteTable()
  : createPgTable();

export type Metric = typeof perf_test_metrics.$inferSelect;
export type NewMetric = typeof perf_test_metrics.$inferInsert;

