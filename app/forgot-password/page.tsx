"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="grid w-full max-w-md gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Forgot your password?</h2>
          <p className="mt-2 text-muted-foreground">Enter your email below to reset your password.</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <form>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Reset Password
              </Button>
            </div>
          </form>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

