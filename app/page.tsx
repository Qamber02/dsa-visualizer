import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Data Structures & Algorithms Visualizer",
  description: "Interactive visualizations for data structures and algorithms",
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="hidden sm:inline-block">DSA Visualizer</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Visualize Data Structures & Algorithms
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore, learn, and master computer science fundamentals through interactive visualizations.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/visualizer">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Interactive Learning Experience
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a hands-on approach to understanding complex data structures and algorithms
                  through step-by-step visualizations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-h-[300px] justify-center items-center rounded-xl border bg-muted/50 p-8">
                <div className="h-full w-full rounded-lg bg-muted/50 flex items-center justify-center">
                  <p className="text-2xl font-semibold">Visualization Preview</p>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Data Structures</CardTitle>
                  <CardDescription>Explore a wide range of data structures from basic to advanced.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables, and more. Visualize how data is
                    organized and accessed.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/visualizer?category=data-structures">Explore Data Structures</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Algorithms</CardTitle>
                  <CardDescription>Understand how algorithms work through step-by-step visualization.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Sorting, Searching, Graph Traversal, Pathfinding, Dynamic Programming, and more. See algorithms in
                    action.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/visualizer?category=algorithms">Explore Algorithms</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Controls</CardTitle>
                  <CardDescription>Take control of the visualization process.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Adjust speed, step through algorithms manually, modify input data, and compare different approaches
                    side by side.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/controls">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} DSA Visualizer. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
