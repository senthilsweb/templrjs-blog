'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MetricsTable } from "@/components/metrics-table"
import type { Metric } from "@/lib/db/schema"
import type { SortField, SortOrder } from '@/app/actions'
import { toast } from "sonner"

export function MetricsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<Metric[]>([])
  const [pagination, setPagination] = useState({
    total: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 5
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchMetrics = async () => {
    setIsLoading(true)
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('pageSize') || '5'
    const sort = searchParams.get('sort')
    const order = searchParams.get('order')
    const search = searchParams.get('search')

    const queryParams = new URLSearchParams({
      page,
      pageSize,
      ...(sort && { sort }),
      ...(order && { order }),
      ...(search && { search })
    })

    try {
      const response = await fetch(`/api/metrics?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch metrics')
      const result = await response.json()
      setData(result.data)
      setPagination(result.pagination)
    } catch (error) {
      console.error('Error fetching metrics:', error)
      toast.error('Failed to fetch metrics')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [searchParams])

  const createQueryString = (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    })
    return newSearchParams.toString()
  }

  const handlePaginationChange = (newPage: number) => {
    router.push(`/metrics?${createQueryString({ page: newPage })}`)
  }

  const handleRowsPerPageChange = (newSize: number) => {
    router.push(`/metrics?${createQueryString({ pageSize: newSize, page: 1 })}`)
  }

  const handleSortingChange = (sorting: { id: string; desc: boolean }[]) => {
    if (sorting.length > 0) {
      router.push(`/metrics?${createQueryString({
        sort: sorting[0].id,
        order: sorting[0].desc ? 'desc' : 'asc',
        page: 1
      })}`)
    } else {
      router.push(`/metrics?${createQueryString({
        sort: null,
        order: null,
        page: 1
      })}`)
    }
  }

  const handleSearchChange = (search: string) => {
    router.push(`/metrics?${createQueryString({
      search: search || null,
      page: 1
    })}`)
  }

  const handleDeleteSelected = async (selectedIds: number[]) => {
    setIsLoading(true)
    try {
      const responses = await Promise.all(
        selectedIds.map(id =>
          fetch(`/api/metrics/${id}`, { method: 'DELETE' })
        )
      )
      const failedDeletes = responses.filter(r => !r.ok).length
      if (failedDeletes === 0) {
        toast.success(`Successfully deleted ${selectedIds.length} metric(s)`)
        fetchMetrics()
      } else {
        toast.error(`Failed to delete ${failedDeletes} metric(s)`)
      }
    } catch (error) {
      console.error('Error deleting metrics:', error)
      toast.error('An error occurred while deleting metrics')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MetricsTable 
      data={data}
      pageCount={pagination.pageCount}
      currentPage={pagination.currentPage}
      defaultPageSize={pagination.pageSize}
      isLoading={isLoading}
      onPaginationChange={handlePaginationChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSortingChange={handleSortingChange}
      onSearchChange={handleSearchChange}
      onDeleteSelected={handleDeleteSelected}
    />
  )
}

