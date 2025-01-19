import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { perf_test_metrics } from "@/lib/db/schema"

export async function GET() {
  try {
    // Simple health check query that works for both databases
    await db.select().from(perf_test_metrics).limit(0);
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: process.env.DATABASE_URL?.startsWith('sqlite:') ? 'sqlite' : 'postgres'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { 
      status: 503 
    });
  }
}

