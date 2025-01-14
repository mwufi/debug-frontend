import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, AudioWaveform, Bug, Microscope, Braces, Gauge } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <Bug className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold tracking-tighter">
            AI Agent Debugger
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Inspect, analyze, and debug AI agents with powerful visualization tools and real-time monitoring
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/debugger">
              <Button size="lg">
                Launch Debugger
              </Button>
            </Link>
            <Link href="/chat/1">
              <Button size="lg" variant="outline">
                Try Chat Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Debugging Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Microscope className="h-8 w-8 mb-2" />
              <CardTitle>State Inspection</CardTitle>
              <CardDescription>
                Deep dive into agent memory and knowledge state in real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Braces className="h-8 w-8 mb-2" />
              <CardTitle>Decision Tracing</CardTitle>
              <CardDescription>
                Follow the logical steps and reasoning behind agent decisions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Gauge className="h-8 w-8 mb-2" />
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Monitor response times, token usage, and other key metrics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}
