import { NextResponse } from "next/server"
import { addSubmission } from "@/app/actions/contact"
import type { ContactSubmission } from "@/lib/db/schema"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await addSubmission(data)
    if (result.success) {
      return NextResponse.json({ message: "Submission added successfully" }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error adding submission:", error)
    return NextResponse.json({ error: "Failed to add submission" }, { status: 500 })
  }
}

