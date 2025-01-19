import { NextResponse } from "next/server"
import { updateMetric, deleteMetric } from "@/app/actions"
import type { Metric } from "@/lib/db/schema"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const data: Partial<Metric> = await request.json()
    const result = await updateMetric(id, data)
    if (result.success) {
      return NextResponse.json({ message: 'Metric updated successfully' })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error('Error updating metric:', error)
    return NextResponse.json({ error: 'Failed to update metric' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const result = await deleteMetric(id)
    if (result.success) {
      return NextResponse.json({ message: 'Metric deleted successfully' })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error('Error deleting metric:', error)
    return NextResponse.json({ error: 'Failed to delete metric' }, { status: 500 })
  }
}

