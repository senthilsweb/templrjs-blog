import { NextResponse } from "next/server"
import { getSubmissions } from "@/app/actions/contact"
import type { SortField, SortOrder } from "@/app/actions/contact"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    // Use searchParams from URL constructor instead of request.url
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const pageSize = Number.parseInt(url.searchParams.get("pageSize") || "10")
    const sortField = url.searchParams.get("sort") as SortField
    const sortOrder = (url.searchParams.get("order") || "desc") as SortOrder
    const search = url.searchParams.get("search") || ""

    const result = await getSubmissions({
      page,
      pageSize,
      sortField,
      sortOrder,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

