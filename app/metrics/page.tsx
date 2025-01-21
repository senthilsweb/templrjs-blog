import { Suspense } from "react"
import { MetricsClient } from "./metrics-client"

export default function MetricsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Performance Test Metrics (REST API)</h1>
      <Suspense fallback={<div>Loading metrics...</div>}>
        <MetricsClient />
      </Suspense>
    </div>
  )
}

