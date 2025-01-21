"use client"

import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { themes } from "@/lib/themes"

export function ColorPicker() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("color-theme")
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [setTheme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("color-theme", newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="group">
          <Palette className="h-[1.2rem] w-[1.2rem] group-hover:text-primary transition-colors" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid grid-cols-5 gap-1 p-2" sideOffset={8}>
        {themes.map((color) => (
          <TooltipProvider key={color.value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  onClick={() => handleThemeChange(color.value)}
                  className="cursor-pointer p-0 focus:bg-transparent focus:ring-2 focus:ring-muted"
                >
                  <div
                    className={`h-5 w-5 rounded-full transition-all ${
                      theme === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                    style={{
                      backgroundColor: `hsl(${color.cssVars["--primary"]})`,
                    }}
                  />
                  <span className="sr-only">{color.name}</span>
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

