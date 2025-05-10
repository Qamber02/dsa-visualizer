"use client"

import { useEffect, useRef, useState } from "react"

interface ArrayVisualizerProps {
  algorithm: string
  step: number
}

interface ArrayElement {
  value: number
  state: "default" | "comparing" | "sorted" | "selected" | "pivot"
}

export function ArrayVisualizer({ algorithm, step }: ArrayVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 5, state: "default" },
    { value: 2, state: "default" },
    { value: 9, state: "default" },
    { value: 1, state: "default" },
    { value: 5, state: "default" },
    { value: 6, state: "default" },
  ])

  const [history, setHistory] = useState<ArrayElement[][]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initializedRef = useRef(false)

  // Generate visualization steps only when algorithm changes
  useEffect(() => {
    if (!algorithm) {
      setHistory([array])
      return
    }

    if (algorithm === "bubble-sort") {
      // Generate visualization steps for bubble sort
      const steps: ArrayElement[][] = []
      // Start with a copy of the initial array
      const arr = array.map((el) => ({ ...el, state: "default" }))

      // Add initial state
      steps.push([...arr])

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          // Mark elements being compared
          const stepComparing = arr.map((el, idx) => ({
            ...el,
            state: idx === j || idx === j + 1 ? "comparing" : el.state,
          }))
          steps.push([...stepComparing])

          if (arr[j].value > arr[j + 1].value) {
            // Swap elements
            const temp = { ...arr[j] }
            arr[j] = { ...arr[j + 1] }
            arr[j + 1] = temp

            // Mark elements after swap
            const stepSwapped = arr.map((el, idx) => ({
              ...el,
              state: idx === j || idx === j + 1 ? "comparing" : el.state,
            }))
            steps.push([...stepSwapped])
          }

          // Reset comparison state
          arr[j].state = "default"
          if (j < arr.length - i - 2) {
            arr[j + 1].state = "default"
          }
        }

        // Mark sorted element
        arr[arr.length - i - 1].state = "sorted"
        steps.push(arr.map((el) => ({ ...el })))
      }

      setHistory(steps)
    }
    // Only re-run when algorithm changes, not when array or history changes
  }, [algorithm])

  // Update array based on current step
  useEffect(() => {
    if (history.length > 0 && step < history.length) {
      setArray(history[step])
    }
  }, [step, history])

  // Draw visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate bar width and spacing
    const barWidth = Math.min(50, (canvas.width - 20) / array.length - 10)
    const spacing = 10
    const startX = (canvas.width - (barWidth + spacing) * array.length + spacing) / 2

    // Draw array elements
    array.forEach((element, index) => {
      // Set color based on element state
      switch (element.state) {
        case "comparing":
          ctx.fillStyle = "#f97316" // orange
          break
        case "sorted":
          ctx.fillStyle = "#10b981" // green
          break
        case "selected":
          ctx.fillStyle = "#8b5cf6" // purple
          break
        case "pivot":
          ctx.fillStyle = "#f43f5e" // pink
          break
        default:
          ctx.fillStyle = "#64748b" // slate
      }

      // Calculate bar height (proportional to value)
      const maxHeight = canvas.height - 60
      const barHeight = (element.value / Math.max(...array.map((el) => el.value))) * maxHeight

      // Draw bar
      const x = startX + (barWidth + spacing) * index
      const y = canvas.height - 30 - barHeight
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw value text
      ctx.fillStyle = "#f8fafc"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(element.value.toString(), x + barWidth / 2, canvas.height - 10)
    })
  }, [array])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="p-4 bg-muted/30">
        <p className="text-sm font-medium">
          {algorithm
            ? `Visualizing ${algorithm
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}`
            : "Select an algorithm"}
        </p>
        <p className="text-xs text-muted-foreground">
          Step {step} of {Math.max(history.length - 1, 0)}
        </p>
      </div>
    </div>
  )
}
