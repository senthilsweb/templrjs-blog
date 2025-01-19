'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MetricsTable } from "@/components/metrics-table"
import type { Metric } from "@/lib/db/schema"
import type { SortField, SortOrder } from '@/app/actions'
import { useCallback, useState, useEffect } from 'react'
import { toast } from "sonner"

interface MetricsTableWrapperProps {
  initialData: {
    data: Metric[]
    pagination: {
      total: number
      pageCount: number
      currentPage: number
      pageSize: number
    }
  }
}

export function MetricsTableWrapper({ initialData }: MetricsTableWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '5')
  const sort = searchParams.get('sort')
  const order = searchParams.get('order') as SortOrder | null
  const [isLoading, setIsLoading] = useState(false)

  // Reset loading state when searchParams change
  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      })
      return newSearchParams.toString()
    },
    [searchParams]
  )

  const handleNavigate = useCallback((queryString: string) => {
    setIsLoading(true)
    router.push(`/?${queryString}`)
  }, [router])

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
        // Refresh the data
        handleNavigate(createQueryString({ page: 1 }))
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
      data={initialData.data} 
      pageCount={initialData.pagination.pageCount}
      currentPage={page}
      defaultPageSize={pageSize}
      isLoading={isLoading}
      initialSort={sort ? { id: sort, desc: order === 'desc' } : undefined}
      onPaginationChange={(newPage) => {
        handleNavigate(createQueryString({ page: newPage }))
      }}
      onRowsPerPageChange={(newSize) => {
        handleNavigate(createQueryString({ pageSize: newSize, page: 1 }))
      }}
      onSortingChange={(sorting) => {
        if (sorting.length > 0) {
          handleNavigate(createQueryString({
            sort: sorting[0].id,
            order: sorting[0].desc ? 'desc' : 'asc',
            page: 1 // Reset to first page when sorting
          }))
        } else {
          handleNavigate(createQueryString({
            sort: null,
            order: null,
            page: 1
          }))
        }
      }}
      onSearchChange={(search) => {
        handleNavigate(createQueryString({
          search: search || null,
          page: 1
        }))
      }}
      onDeleteSelected={handleDeleteSelected}
    />
  )
}

