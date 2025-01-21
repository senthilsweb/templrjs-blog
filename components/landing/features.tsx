import { featuresData } from "@/lib/features-data"

export function Features() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {featuresData.map((feature, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">{feature.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

