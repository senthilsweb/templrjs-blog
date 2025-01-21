import { NextResponse } from "next/server"
import { sql } from 'drizzle-orm'
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Simple raw query to check database connection
    await db.execute(sql`SELECT 1`)
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({ 
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { 
      status: 503 
    })
  }
}

