import { Suspense } from 'react'
import { MetricsTableWrapper } from "@/components/metrics-table-wrapper"
import { headers } from 'next/headers'

interface PageProps {
  searchParams: {
    page?: string
    pageSize?: string
    sort?: string
    order?: 'asc' | 'desc'
    search?: string
  }
}

async function getMetrics(searchParams: PageProps['searchParams']) {
  const headersList = headers()
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const host = headersList.get('host') || 'localhost:3000'
  
  const page = searchParams.page || '1'
  const pageSize = searchParams.pageSize || '5'
  
  const queryString = new URLSearchParams({
    page,
    pageSize,
    ...(searchParams.sort && { sort: searchParams.sort }),
    ...(searchParams.order && { order: searchParams.order }),
    ...(searchParams.search && { search: searchParams.search }),
  }).toString()

  const url = `${protocol}://${host}/api/metrics?${queryString}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data || !data.data) {
      throw new Error('Invalid response format')
    }

    return data
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return {
      data: [],
      pagination: {
        total: 0,
        pageCount: 0,
        currentPage: 1,
        pageSize: parseInt(pageSize),
      }
    }
  }
}

export default async function Home({ searchParams }: PageProps) {
  const data = await getMetrics(searchParams)
  
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Performance Test Metrics</h1>
      <Suspense fallback={<div>Loading metrics...</div>}>
        <MetricsTableWrapper initialData={data} />
      </Suspense>
    </main>
  )
}

