import { NextResponse } from "next/server"
import { getMetrics } from "@/app/actions/metrics"
import type { SortField, SortOrder } from "@/app/actions/metrics"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    // Use searchParams from URL constructor instead of request.url
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const pageSize = Number.parseInt(url.searchParams.get("pageSize") || "5")
    const sortField = url.searchParams.get("sort") as SortField
    const sortOrder = (url.searchParams.get("order") || "asc") as SortOrder
    const search = url.searchParams.get("search") || ""

    const result = await getMetrics({
      page,
      pageSize,
      sortField,
      sortOrder,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}

