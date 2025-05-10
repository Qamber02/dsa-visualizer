"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Play, Pause, SkipForward, RotateCcw, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { DataStructureSelector } from "@/components/data-structure-selector"
import { AlgorithmSelector } from "@/components/algorithm-selector"
import { VisualizationCanvas } from "@/components/visualization-canvas"
import { ControlPanel } from "@/components/control-panel"

export default function VisualizerPage() {
  const [selectedDataStructure, setSelectedDataStructure] = useState("array")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState([50])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    // Reset visualization state
  }

  const handleStepForward = () => {
    // Step forward in the visualization
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <div className="ml-4">
            <h1 className="text-lg font-semibold">DSA Visualizer</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <Tabs defaultValue="data-structures">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="data-structures">Structures</TabsTrigger>
                    <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                  </TabsList>
                  <TabsContent value="data-structures" className="space-y-4 pt-4">
                    <DataStructureSelector selected={selectedDataStructure} onSelect={setSelectedDataStructure} />
                  </TabsContent>
                  <TabsContent value="algorithms" className="space-y-4 pt-4">
                    <AlgorithmSelector
                      dataStructure={selectedDataStructure}
                      selected={selectedAlgorithm}
                      onSelect={setSelectedAlgorithm}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Control Panel</h3>
                <ControlPanel dataStructure={selectedDataStructure} algorithm={selectedAlgorithm} />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3 space-y-6">
            <Card className="min-h-[500px]">
              <CardContent className="p-4">
                <VisualizationCanvas
                  dataStructure={selectedDataStructure}
                  algorithm={selectedAlgorithm}
                  isPlaying={isPlaying}
                  speed={speed[0]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleStepForward}>
                      <SkipForward className="h-4 w-4" />
                      <span className="sr-only">Step Forward</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                      <span className="sr-only">Reset</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 w-1/3">
                    <span className="text-sm text-muted-foreground">Speed:</span>
                    <Slider value={speed} min={1} max={100} step={1} onValueChange={setSpeed} />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h3 className="font-medium">Algorithm Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAlgorithm
                      ? "Information about the selected algorithm will appear here."
                      : "Select an algorithm to see details about its implementation and complexity."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
