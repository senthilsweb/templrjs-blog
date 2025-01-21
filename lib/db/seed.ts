import { db } from "./index"
import { perf_test_metrics } from "./schema"
import { runSqliteMigrations } from "./migrate"

const seedData = [
  {
    datasourceDescription: "New York Tax Dataset",
    noOfFilesOrTables: 5,
    fileType: "CSV",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 1024,
    noOfColumnsInFileOrTable: 15,
    rowCountPerResource: 10000,
    totalRowCountOfAllResources: 50000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "PostgreSQL Database Export",
    noOfFilesOrTables: 3,
    fileType: "SQL",
    dataSourceType: "Database",
    totalSourceDataSizeInKb: 2048,
    noOfColumnsInFileOrTable: 20,
    rowCountPerResource: 15000,
    totalRowCountOfAllResources: 45000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Customer Analytics Data",
    noOfFilesOrTables: 8,
    fileType: "JSON",
    dataSourceType: "API",
    totalSourceDataSizeInKb: 512,
    noOfColumnsInFileOrTable: 10,
    rowCountPerResource: 5000,
    totalRowCountOfAllResources: 40000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Product Inventory Logs",
    noOfFilesOrTables: 4,
    fileType: "XML",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 768,
    noOfColumnsInFileOrTable: 12,
    rowCountPerResource: 8000,
    totalRowCountOfAllResources: 32000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "User Activity Metrics",
    noOfFilesOrTables: 6,
    fileType: "PARQUET",
    dataSourceType: "Data Lake",
    totalSourceDataSizeInKb: 4096,
    noOfColumnsInFileOrTable: 25,
    rowCountPerResource: 20000,
    totalRowCountOfAllResources: 120000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Financial Transactions",
    noOfFilesOrTables: 10,
    fileType: "CSV",
    dataSourceType: "Database",
    totalSourceDataSizeInKb: 3072,
    noOfColumnsInFileOrTable: 18,
    rowCountPerResource: 25000,
    totalRowCountOfAllResources: 250000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "IoT Sensor Readings",
    noOfFilesOrTables: 12,
    fileType: "JSON",
    dataSourceType: "API",
    totalSourceDataSizeInKb: 1536,
    noOfColumnsInFileOrTable: 8,
    rowCountPerResource: 30000,
    totalRowCountOfAllResources: 360000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Marketing Campaign Data",
    noOfFilesOrTables: 7,
    fileType: "Excel",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 896,
    noOfColumnsInFileOrTable: 15,
    rowCountPerResource: 12000,
    totalRowCountOfAllResources: 84000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "System Logs Analysis",
    noOfFilesOrTables: 15,
    fileType: "LOG",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 5120,
    noOfColumnsInFileOrTable: 10,
    rowCountPerResource: 40000,
    totalRowCountOfAllResources: 600000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Employee Records",
    noOfFilesOrTables: 2,
    fileType: "SQL",
    dataSourceType: "Database",
    totalSourceDataSizeInKb: 256,
    noOfColumnsInFileOrTable: 22,
    rowCountPerResource: 5000,
    totalRowCountOfAllResources: 10000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Weather Station Data",
    noOfFilesOrTables: 9,
    fileType: "CSV",
    dataSourceType: "API",
    totalSourceDataSizeInKb: 2304,
    noOfColumnsInFileOrTable: 12,
    rowCountPerResource: 18000,
    totalRowCountOfAllResources: 162000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Social Media Analytics",
    noOfFilesOrTables: 5,
    fileType: "JSON",
    dataSourceType: "API",
    totalSourceDataSizeInKb: 1792,
    noOfColumnsInFileOrTable: 20,
    rowCountPerResource: 15000,
    totalRowCountOfAllResources: 75000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "E-commerce Orders",
    noOfFilesOrTables: 8,
    fileType: "SQL",
    dataSourceType: "Database",
    totalSourceDataSizeInKb: 3584,
    noOfColumnsInFileOrTable: 25,
    rowCountPerResource: 22000,
    totalRowCountOfAllResources: 176000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Healthcare Records",
    noOfFilesOrTables: 6,
    fileType: "HL7",
    dataSourceType: "Database",
    totalSourceDataSizeInKb: 4608,
    noOfColumnsInFileOrTable: 30,
    rowCountPerResource: 8000,
    totalRowCountOfAllResources: 48000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
  {
    datasourceDescription: "Supply Chain Metrics",
    noOfFilesOrTables: 11,
    fileType: "Excel",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 2816,
    noOfColumnsInFileOrTable: 16,
    rowCountPerResource: 10000,
    totalRowCountOfAllResources: 110000,
    testExecutionTimestamp: new Date().toISOString(), // Store as ISO string for SQLite
    iterationNumber: 1,
    applicationVersion: "1.0.0"
  },
]

export async function seed() {
  try {
    if (process.env.DATABASE_URL?.startsWith('sqlite:')) {
      // Run migrations first for SQLite
      await runSqliteMigrations();
    }

    // Insert seed data
    await db.insert(perf_test_metrics).values(seedData);
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

