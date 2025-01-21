"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Image src="/404.svg" width={400} height={200} alt="Not Found" className="mb-8" />
      <h1 className="text-3xl font-bold text-foreground mb-4">Page not found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The page you are looking for could not be found. Please check the URL and try again.
      </p>
      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  )
}

