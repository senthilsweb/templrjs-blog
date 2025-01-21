"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { ColorPicker } from "./theme/color-picker";
import { Database, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { themes } from "@/lib/themes";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Metrics", href: "/metrics" },
  { name: "Releases", href: "/releases" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Database
            className="h-6 w-6 transition-colors"
            style={{ color: `hsl(${currentTheme.cssVars["--primary"]})` }}
          />
          <Link href="/" className="font-bold text-xl text-foreground">
            TemplrJS
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors rounded-md px-3 py-2",
                "hover:bg-primary/10 dark:hover:bg-primary/20",
                pathname === item.href
                  ? "bg-primary/10 dark:bg-primary/20 text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-2">
            <Button variant="ghost" size="icon" className="md:hidden">
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
                    "text-sm font-medium transition-colors rounded-md px-3 py-2",
                    "hover:bg-primary/10 dark:hover:bg-primary/20",
                    pathname === item.href
                      ? "bg-primary/10 dark:bg-primary/20 text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:inline-flex"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/signup">Sign up</Link>
          </Button>

          <ColorPicker />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
