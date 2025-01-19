import { seed } from "@/lib/db/seed"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await seed()
    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}

