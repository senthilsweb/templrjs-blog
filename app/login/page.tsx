"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="grid w-full max-w-md gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Login to your account</h2>
          <p className="mt-2 text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <form>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <Link href="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div>
        <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

