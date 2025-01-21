"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { themes } from "@/lib/themes"
import { useEffect, useState } from "react"

export function Hero() {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const primaryHue = currentTheme.cssVars["--primary"].split(" ")[0]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <style jsx>{`
        :root {
          --cell: 40px;
          --rows: 10;
        }
      `}</style>

      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid justify-center auto-rows-[--cell] -space-y-px">
          {[...Array(10)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-flow-col auto-cols-[--cell] flex-1 -space-x-px">
              {[...Array(30)].map((_, colIndex) => (
                <div key={colIndex} className="relative border border-muted">
                  <div
                    className={`
                    absolute inset-0 
                    bg-primary/10 hover:bg-primary/20 
                    dark:bg-primary/5 dark:hover:bg-primary/10 
                    opacity-0 transition-opacity will-change-[opacity] duration-1000
                    ${Math.random() > 0.8 ? "opacity-100 cursor-pointer" : ""}
                  `}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute top-[calc((var(--cell)*var(--rows))+1px)] inset-x-0 h-[calc(var(--cell)*2)] bg-gradient-to-t from-background pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            {" "}
            <span
              style={{ color: `hsl(${primaryHue} 80% 45%)` }}
              className="inline-block transition-colors duration-300"
            >
              Efficiency Unleashed
            </span>{" "}
            Innovate, Iterate, Inspire
          </h1>

          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Craft stunning web and mobile applications effortlessly with TemplrJS, an open-source rapid development platform.
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

