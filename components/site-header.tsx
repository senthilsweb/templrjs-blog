"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Database, Menu, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: "Server Metrics", href: "/" },
  { name: "REST Metrics", href: "/metrics" },
  { name: "Documentation", href: "/docs" },
  { name: "Blog", href: "/blog" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6" />
          <Link href="/" className="font-bold text-xl">
            Metrics App
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-md",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md",
                    pathname === item.href ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
            <Link
              href="https://github.com/yourusername/metrics-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/docs">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

