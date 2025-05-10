"use client"

import { useEffect, useRef, useState } from "react"
import { ArrayVisualizer } from "@/visualizers/array-visualizer"
import { LinkedListVisualizer } from "@/visualizers/linked-list-visualizer"
import { BinaryTreeVisualizer } from "@/visualizers/binary-tree-visualizer"
import { GraphVisualizer } from "@/visualizers/graph-visualizer"

interface VisualizationCanvasProps {
  dataStructure: string
  algorithm: string
  isPlaying: boolean
  speed: number
}

export function VisualizationCanvas({ dataStructure, algorithm, isPlaying, speed }: VisualizationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Reset visualization when data structure or algorithm changes
    setCurrentStep(0)
  }, [dataStructure, algorithm])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(
        () => {
          setCurrentStep((prev) => {
            // Get the maximum steps based on the current data structure
            let maxSteps = 0
            switch (dataStructure) {
              case "array":
                // This would be the length of the array visualizer's history
                maxSteps = 20 // Placeholder value
                break
              case "linked-list":
                maxSteps = 15 // Placeholder value
                break
              // Add cases for other data structures
              default:
                maxSteps = 10
            }

            // Stop at the end of the visualization
            if (prev >= maxSteps - 1) {
              clearInterval(interval)
              return prev
            }
            return prev + 1
          })
        },
        1000 - speed * 9,
      ) // Map speed (1-100) to delay (900ms-0ms)

      return () => clearInterval(interval)
    }
  }, [isPlaying, speed, dataStructure])

  const renderVisualizer = () => {
    switch (dataStructure) {
      case "array":
        return <ArrayVisualizer algorithm={algorithm} step={currentStep} />
      case "linked-list":
        return <LinkedListVisualizer algorithm={algorithm} step={currentStep} />
      case "binary-tree":
      case "binary-search-tree":
      case "avl-tree":
      case "red-black-tree":
        return <BinaryTreeVisualizer type={dataStructure} algorithm={algorithm} step={currentStep} />
      case "graph":
        return <GraphVisualizer algorithm={algorithm} step={currentStep} />
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a data structure to visualize</p>
          </div>
        )
    }
  }

  return (
    <div ref={canvasRef} className="w-full h-[500px] bg-muted/20 rounded-lg overflow-hidden">
      {renderVisualizer()}
    </div>
  )
}
