"use client"

import { useEffect, useRef, useState } from "react"

interface LinkedListVisualizerProps {
  algorithm: string
  step: number
}

interface ListNode {
  value: number
  state: "default" | "current" | "previous" | "next" | "selected"
}

export function LinkedListVisualizer({ algorithm, step }: LinkedListVisualizerProps) {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 5, state: "default" },
    { value: 2, state: "default" },
    { value: 9, state: "default" },
    { value: 1, state: "default" },
    { value: 5, state: "default" },
  ])

  const [history, setHistory] = useState<ListNode[][]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!algorithm) {
      setHistory([nodes])
      return
    }

    if (algorithm === "traversal") {
      // Generate visualization steps for traversal
      const steps: ListNode[][] = []
      const nodesCopy = nodes.map((node) => ({ ...node, state: "default" }))

      // Initial state
      steps.push(nodesCopy.map((node) => ({ ...node })))

      // Traverse the list
      for (let i = 0; i < nodesCopy.length; i++) {
        // Reset previous node
        if (i > 0) {
          nodesCopy[i - 1].state = "previous"
        }

        // Mark current node
        nodesCopy[i].state = "current"

        // Mark next node if exists
        if (i < nodesCopy.length - 1) {
          nodesCopy[i + 1].state = "next"
        }

        steps.push(nodesCopy.map((node) => ({ ...node })))
      }

      // Reset final state
      const finalNodes = nodesCopy.map((node) => ({ ...node, state: "default" }))
      steps.push(finalNodes)

      setHistory(steps)
    }
    // Only re-run when algorithm changes
  }, [algorithm])

  useEffect(() => {
    if (history.length > 0 && step < history.length) {
      setNodes(history[step])
    }
  }, [step, history])

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

    // Calculate node dimensions and spacing
    const nodeRadius = 30
    const spacing = 80
    const startX = Math.max(nodeRadius + 20, (canvas.width - (2 * nodeRadius + spacing) * nodes.length + spacing) / 2)
    const centerY = canvas.height / 2

    // Draw linked list nodes
    nodes.forEach((node, index) => {
      const x = startX + (2 * nodeRadius + spacing) * index

      // Set color based on node state
      switch (node.state) {
        case "current":
          ctx.fillStyle = "#f97316" // orange
          break
        case "previous":
          ctx.fillStyle = "#10b981" // green
          break
        case "next":
          ctx.fillStyle = "#8b5cf6" // purple
          break
        case "selected":
          ctx.fillStyle = "#f43f5e" // pink
          break
        default:
          ctx.fillStyle = "#64748b" // slate
      }

      // Draw node circle
      ctx.beginPath()
      ctx.arc(x, centerY, nodeRadius, 0, 2 * Math.PI)
      ctx.fill()

      // Draw value text
      ctx.fillStyle = "#f8fafc"
      ctx.font = "16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.value.toString(), x, centerY)

      // Draw arrow to next node
      if (index < nodes.length - 1) {
        const nextX = startX + (2 * nodeRadius + spacing) * (index + 1)

        ctx.beginPath()
        ctx.moveTo(x + nodeRadius, centerY)
        ctx.lineTo(nextX - nodeRadius, centerY)
        ctx.strokeStyle = "#94a3b8"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw arrow head
        ctx.beginPath()
        ctx.moveTo(nextX - nodeRadius, centerY)
        ctx.lineTo(nextX - nodeRadius - 10, centerY - 5)
        ctx.lineTo(nextX - nodeRadius - 10, centerY + 5)
        ctx.closePath()
        ctx.fillStyle = "#94a3b8"
        ctx.fill()
      }
    })
  }, [nodes])

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
