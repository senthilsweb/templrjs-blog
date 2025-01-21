"use client"

import Link from "next/link"
import { footerData } from "@/lib/footer-data"
import { Mail } from "lucide-react"
import { ContactForm } from "../contact/contact-form"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative bg-[#1a1a1a]">
      {" "}
      {/* Fixed dark background */}
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Projects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{footerData.projects.title}</h3>
              <ul className="space-y-4">
                {footerData.projects.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-200 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{footerData.resources.title}</h3>
              <ul className="space-y-4">
                {footerData.resources.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-200 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{footerData.contact.title}</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <p className="text-lg text-white font-medium">{footerData.contact.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="h-5 w-5 text-zinc-300" />
                  <a
                    href={`mailto:${footerData.contact.email}`}
                    className="text-zinc-200 hover:text-white transition-colors"
                  >
                    {footerData.contact.email}
                  </a>
                </div>
                <div className="mt-6">
                  <ContactForm>
                    <Button
                      variant="default"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Contact Us
                    </Button>
                  </ContactForm>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-300">{footerData.copyright.text}</p>
              <div className="flex items-center gap-6">
                {footerData.social.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-zinc-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

