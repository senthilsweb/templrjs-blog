import { Suspense } from "react"
import { ContactClient } from "./contact-client"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Management</h1>
      </div>
      <Suspense fallback={<div>Loading contact data...</div>}>
        <ContactClient />
      </Suspense>
    </div>
  )
}

