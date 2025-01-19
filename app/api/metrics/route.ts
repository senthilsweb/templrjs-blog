import { NextResponse } from "next/server"
import { getMetrics } from "@/app/actions"
import type { SortField, SortOrder } from "@/app/actions"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '5')
    const sortField = searchParams.get('sort') as SortField
    const sortOrder = (searchParams.get('order') || 'asc') as SortOrder
    const search = searchParams.get('search') || ''

    const result = await getMetrics({ 
      page, 
      pageSize, 
      sortField, 
      sortOrder, 
      search 
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}

