import { Github, Linkedin } from "lucide-react"

export const footerData = {
  projects: {
    title: "PROJECTS",
    links: [
      { name: "TemplrJS", href: "/projects/templrjs" },
      { name: "DuckDB Data Proxy", href: "/projects/duckdb-proxy" },
      { name: "DuckDB Studio", href: "/projects/duckdb-studio" },
    ],
  },
  resources: {
    title: "RESOURCES",
    links: [
      { name: "REST API Documentation", href: "/docs/api" },
      { name: "Professional Resume", href: "/resume" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Blog", href: "/blog" },
    ],
  },
  contact: {
    title: "CONTACT",
    name: "Russell C. Stamper",
    email: "russel.s@email.com",
  },
  social: [
    { name: "GitHub", icon: Github, href: "https://github.com/yourusername" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
  ],
  copyright: {
    text: "© 2025 TemplrJS. All rights reserved.",
  },
}

