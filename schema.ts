import { pgTable, serial, text, integer, numeric, bigint, date } from 'drizzle-orm/pg-core'

export const pdc_perf_test_metrics = pgTable('pdc_perf_test_metrics', {
  id: serial('id').primaryKey(),
  datasourceDescription: text('datasource_description'),
  noOfFilesOrTables: integer('no_of_files_or_tables'),
  fileType: text('file_type'),
  listOfFileTypes: text('list_of_file_types'),
  dataSourceType: text('data_source_type'),
  totalSourceDataSizeInKb: numeric('total_source_data_size_in_kb'),
  noOfColumnsInFileOrTable: integer('no_of_columns_in_file_or_table'),
  rowCountPerResource: bigint('row_count_per_resource', { mode: 'number' }),
  totalRowCountOfAllResources: bigint('total_row_count_of_all_resources', { mode: 'number' }),
  mdsSizeAfterLiteScanInKb: numeric('mds_size_after_lite_scan_in_kb'),
  mdsSizeAfterDeepScanInKb: numeric('mds_size_after_deep_scan_in_kb'),
  mdsSizeWithBidbAfterScanInKb: numeric('mds_size_with_bidb_after_scan_in_kb'),
  mdsSizeAfterDataProfileInKb: numeric('mds_size_after_data_profile_in_kb'),
  mdsSizeWithBidbAfterDataProfileInKb: numeric('mds_size_with_bidb_after_data_profile_in_kb'),
  mdsSizeInPercentageOfSourceSize: numeric('mds_size_in_percentage_of_source_size'),
  xTimesOfSourceSize: numeric('x_times_of_source_size'),
  latencyLiteScanInSec: numeric('latency_lite_scan_in_sec'),
  latencyDeepScanInSec: numeric('latency_deep_scan_in_sec'),
  latencyDataProfileInSec: numeric('latency_data_profile_in_sec'),
  testExecutionTimestamp: date('test_execution_timestamp'),
  iterationNumber: integer('iteration_number'),
  applicationVersion: text('application_version'),
})

