"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { themes } from "@/lib/themes"

export function HeroPlain() {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const primaryHue = currentTheme.cssVars["--primary"].split(" ")[0]

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-white/10"
        style={{
          backgroundColor: `hsl(${primaryHue} 100% 98%)`,
          backgroundImage: `linear-gradient(to right, hsl(${primaryHue} 100% 98% / 95%), hsl(${primaryHue} 100% 98% / 90%))`,
        }}
      />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            A{" "}
            <span
              style={{ color: `hsl(${primaryHue} 80% 45%)` }}
              className="inline-block transition-colors duration-300"
            >
              Performance Metrics
            </span>{" "}
            for Modern Apps
          </h1>

          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Monitor, analyze, and optimize your system's performance with our comprehensive metrics dashboard.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6"
              style={{
                backgroundColor: `hsl(${primaryHue} 80% 45%)`,
                color: "white",
              }}
            >
              <Link href="/metrics2">View Dashboard</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Link href="/docs">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

