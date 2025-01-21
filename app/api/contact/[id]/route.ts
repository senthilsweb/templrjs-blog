import { NextResponse } from "next/server"
import { updateSubmission, deleteSubmission, markAsRead } from "@/app/actions/contact"
import type { ContactSubmission } from "@/lib/db/schema"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data: Partial<ContactSubmission> = await request.json()
    const result = await updateSubmission(id, data)
    if (result.success) {
      return NextResponse.json({ message: "Submission updated successfully" })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating submission:", error)
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const result = await deleteSubmission(id)
    if (result.success) {
      return NextResponse.json({ message: "Submission deleted successfully" })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error deleting submission:", error)
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { isRead } = await request.json()
    const result = await markAsRead(id, isRead)
    if (result.success) {
      return NextResponse.json({ message: "Read status updated successfully" })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating read status:", error)
    return NextResponse.json({ error: "Failed to update read status" }, { status: 500 })
  }
}

