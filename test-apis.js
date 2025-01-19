import fetch from 'node-fetch';

// Test the GET /api/metrics endpoint
async function testGetMetrics() {
  console.log('\n1. Testing GET /api/metrics')
  console.log('--------------------------------')
  
  try {
    const response = await fetch('http://localhost:3000/api/metrics?page=1&pageSize=5&sort=id&order=desc')
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Pagination:', data.pagination)
    console.log('First record:', data.data[0])
  } catch (error) {
    console.error('Error testing GET /api/metrics:', error)
  }
}

// Test the POST /api/metrics/add endpoint
async function testAddMetric() {
  console.log('\n2. Testing POST /api/metrics/add')
  console.log('--------------------------------')
  
  const newMetric = {
    datasourceDescription: "Test Dataset",
    noOfFilesOrTables: 3,
    fileType: "CSV",
    dataSourceType: "File System",
    totalSourceDataSizeInKb: 1024,
    noOfColumnsInFileOrTable: 15,
    rowCountPerResource: 10000,
    totalRowCountOfAllResources: 30000
  }

  try {
    const response = await fetch('http://localhost:3000/api/metrics/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMetric)
    })
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
  } catch (error) {
    console.error('Error testing POST /api/metrics/add:', error)
  }
}

// Test the PUT /api/metrics/[id] endpoint
async function testUpdateMetric() {
  console.log('\n3. Testing PUT /api/metrics/1')
  console.log('--------------------------------')
  
  const updatedData = {
    datasourceDescription: "Updated Test Dataset",
    totalSourceDataSizeInKb: 2048
  }

  try {
    const response = await fetch('http://localhost:3000/api/metrics/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
  } catch (error) {
    console.error('Error testing PUT /api/metrics/1:', error)
  }
}

// Test the GET /api/health endpoint
async function testHealthCheck() {
  console.log('\n4. Testing GET /api/health')
  console.log('--------------------------------')
  
  try {
    const response = await fetch('http://localhost:3000/api/health')
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
  } catch (error) {
    console.error('Error testing GET /api/health:', error)
  }
}

// Test the DELETE /api/metrics/[id] endpoint
async function testDeleteMetric() {
  console.log('\n5. Testing DELETE /api/metrics/1')
  console.log('--------------------------------')
  
  try {
    const response = await fetch('http://localhost:3000/api/metrics/1', {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
  } catch (error) {
    console.error('Error testing DELETE /api/metrics/1:', error)
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting API Tests...\n')
  await testGetMetrics()
  await testAddMetric()
  await testUpdateMetric()
  await testHealthCheck()
  await testDeleteMetric()
  console.log('\nAPI Tests Completed')
}

runAllTests()

