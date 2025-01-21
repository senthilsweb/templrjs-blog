"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SubmissionsGrid } from "@/components/contact/submissions-grid"
import type { ContactSubmission } from "@/lib/db/schema"
import { toast } from "sonner"

export function ContactClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<ContactSubmission[]>([])
  const [pagination, setPagination] = useState({
    total: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 10,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    const page = searchParams.get("page") || "1"
    const pageSize = searchParams.get("pageSize") || "10"
    const sort = searchParams.get("sort")
    const order = searchParams.get("order")
    const search = searchParams.get("search")

    const queryParams = new URLSearchParams({
      page,
      pageSize,
      ...(sort && { sort }),
      ...(order && { order }),
      ...(search && { search }),
    })

    try {
      const response = await fetch(`/api/contact?${queryParams}`)
      if (!response.ok) throw new Error("Failed to fetch submissions")
      const result = await response.json()
      setData(result.data)
      setPagination(result.pagination)
    } catch (error) {
      console.error("Error fetching submissions:", error)
      toast.error("Failed to fetch submissions")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
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
    router.push(`/contact?${createQueryString({ page: newPage })}`)
  }

  const handleRowsPerPageChange = (newSize: number) => {
    router.push(`/contact?${createQueryString({ pageSize: newSize, page: 1 })}`)
  }

  const handleDeleteSelected = async (selectedIds: number[]) => {
    setIsLoading(true)
    try {
      const responses = await Promise.all(selectedIds.map((id) => fetch(`/api/contact/${id}`, { method: "DELETE" })))
      const failedDeletes = responses.filter((r) => !r.ok).length
      if (failedDeletes === 0) {
        toast.success(`Successfully deleted ${selectedIds.length} submission(s)`)
        fetchSubmissions()
      } else {
        toast.error(`Failed to delete ${failedDeletes} submission(s)`)
      }
    } catch (error) {
      console.error("Error deleting submissions:", error)
      toast.error("An error occurred while deleting submissions")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SubmissionsGrid
      data={data}
      pageCount={pagination.pageCount}
      currentPage={pagination.currentPage}
      isLoading={isLoading}
      onPaginationChange={handlePaginationChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onDeleteSelected={handleDeleteSelected}
    />
  )
}

