import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const quickAccessItems = [
  {
    title: "My Projects",
    description: "Dive into the diverse array of projects using our privacy shield technology.",
    link: "/projects",
    linkText: "Explore Projects",
    bgColor: "bg-[#e91e63]",
    buttonTextColor: "text-[#e91e63]",
  },
  {
    title: "Developer Resources",
    description: "Find comprehensive guides and resources to support your development journey.",
    link: "/resources",
    linkText: "Access Resources",
    bgColor: "bg-[#9c27b0]",
    buttonTextColor: "text-[#9c27b0]",
  },
  {
    title: "API Documentation",
    description: "Explore detailed API documentation for seamless integration.",
    link: "/docs",
    linkText: "View Documentation",
    bgColor: "bg-[#ff9800]",
    buttonTextColor: "text-[#ff9800]",
  },
]

export function QuickAccess() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickAccessItems.map((item) => (
            <Card
              key={item.title}
              className={`${item.bgColor} text-white border-none shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white/90">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button className={`w-full bg-white hover:bg-white/90 ${item.buttonTextColor}`} asChild>
                  <Link href={item.link}>{item.linkText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

