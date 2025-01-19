import { NextResponse } from "next/server"
import { addMetric } from "@/app/actions"
import type { Metric } from "@/lib/db/schema"

export async function POST(request: Request) {
  try {
    const data: Omit<Metric, 'id'> = await request.json()
    const result = await addMetric(data)
    if (result.success) {
      return NextResponse.json({ message: 'Metric added successfully' }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error('Error adding metric:', error)
    return NextResponse.json({ error: 'Failed to add metric' }, { status: 500 })
  }
}

