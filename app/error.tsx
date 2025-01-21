"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Image src="/error.svg" width={400} height={200} alt="Error" className="mb-8" />
      <h1 className="text-3xl font-bold text-foreground mb-4">Something went wrong!</h1>
      <p className="text-lg text-muted-foreground mb-8">{error.message}</p>
      <Button onClick={() => reset()} className="bg-primary text-primary-foreground hover:bg-primary/90">
        Try again
      </Button>
    </div>
  )
}

