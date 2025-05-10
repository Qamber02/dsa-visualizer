"use client"

import { useEffect, useRef, useState } from "react"

interface GraphVisualizerProps {
  algorithm: string
  step: number
}

interface GraphNode {
  id: string
  x: number
  y: number
  state: "default" | "current" | "visited" | "processing" | "path"
}

interface GraphEdge {
  from: string
  to: string
  weight?: number
  state: "default" | "current" | "visited" | "path"
}

export function GraphVisualizer({ algorithm, step }: GraphVisualizerProps) {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: "A", x: 100, y: 100, state: "default" },
    { id: "B", x: 250, y: 50, state: "default" },
    { id: "C", x: 400, y: 100, state: "default" },
    { id: "D", x: 100, y: 250, state: "default" },
    { id: "E", x: 250, y: 300, state: "default" },
    { id: "F", x: 400, y: 250, state: "default" },
  ])

  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: "A", to: "B", weight: 4, state: "default" },
    { from: "A", to: "D", weight: 2, state: "default" },
    { from: "B", to: "C", weight: 3, state: "default" },
    { from: "B", to: "E", weight: 3, state: "default" },
    { from: "C", to: "F", weight: 2, state: "default" },
    { from: "D", to: "E", weight: 1, state: "default" },
    { from: "E", to: "F", weight: 5, state: "default" },
  ])

  const [nodeHistory, setNodeHistory] = useState<GraphNode[][]>([])
  const [edgeHistory, setEdgeHistory] = useState<GraphEdge[][]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!algorithm) {
      setNodeHistory([nodes])
      setEdgeHistory([edges])
      return
    }

    if (algorithm === "bfs") {
      // Generate visualization steps for BFS
      const nodeSteps: GraphNode[][] = []
      const edgeSteps: GraphEdge[][] = []

      // Deep clone nodes and edges for each step
      const cloneNodes = () => nodes.map((node) => ({ ...node }))
      const cloneEdges = () => edges.map((edge) => ({ ...edge }))

      // Reset all states first
      const initialNodes = cloneNodes()
      initialNodes.forEach((node) => (node.state = "default"))
      const initialEdges = cloneEdges()
      initialEdges.forEach((edge) => (edge.state = "default"))

      // Initial state
      nodeSteps.push(initialNodes.map((node) => ({ ...node })))
      edgeSteps.push(initialEdges.map((edge) => ({ ...edge })))

      // Create adjacency list
      const adjacencyList: Record<string, string[]> = {}
      nodes.forEach((node) => {
        adjacencyList[node.id] = []
      })

      edges.forEach((edge) => {
        adjacencyList[edge.from].push(edge.to)
        adjacencyList[edge.to].push(edge.from) // For undirected graph
      })

      // BFS algorithm
      const startNode = "A"
      const visited = new Set<string>()
      const queue: string[] = [startNode]
      visited.add(startNode)

      // Mark start node
      const startNodesCopy = cloneNodes()
      const startNodeIndex = startNodesCopy.findIndex((node) => node.id === startNode)
      if (startNodeIndex >= 0) {
        startNodesCopy[startNodeIndex].state = "current"
        nodeSteps.push(startNodesCopy.map((node) => ({ ...node })))
        edgeSteps.push(cloneEdges().map((edge) => ({ ...edge })))
      }

      while (queue.length > 0) {
        const current = queue.shift()!

        // Mark current node as processing
        const currentNodesCopy = cloneNodes()
        const currentNodeIndex = currentNodesCopy.findIndex((node) => node.id === current)
        if (currentNodeIndex >= 0) {
          currentNodesCopy[currentNodeIndex].state = "processing"
          nodeSteps.push(currentNodesCopy.map((node) => ({ ...node })))
          edgeSteps.push(cloneEdges().map((edge) => ({ ...edge })))
        }

        // Process neighbors
        for (const neighbor of adjacencyList[current]) {
          if (!visited.has(neighbor)) {
            // Mark edge to neighbor
            const neighborEdgesCopy = cloneEdges()
            const edgeIndex = neighborEdgesCopy.findIndex(
              (edge) =>
                (edge.from === current && edge.to === neighbor) || (edge.from === neighbor && edge.to === current),
            )
            if (edgeIndex >= 0) {
              neighborEdgesCopy[edgeIndex].state = "current"
            }

            // Mark neighbor node
            const neighborNodesCopy = cloneNodes()
            const neighborNodeIndex = neighborNodesCopy.findIndex((node) => node.id === neighbor)
            const currNodeIndex = neighborNodesCopy.findIndex((node) => node.id === current)

            if (neighborNodeIndex >= 0) {
              neighborNodesCopy[neighborNodeIndex].state = "current"
            }

            if (currNodeIndex >= 0) {
              neighborNodesCopy[currNodeIndex].state = "processing"
            }

            nodeSteps.push(neighborNodesCopy.map((node) => ({ ...node })))
            edgeSteps.push(neighborEdgesCopy.map((edge) => ({ ...edge })))

            // Add neighbor to queue and mark as visited
            queue.push(neighbor)
            visited.add(neighbor)
          }
        }

        // Mark current node as visited
        const visitedNodesCopy = cloneNodes()
        const visitedNodeIndex = visitedNodesCopy.findIndex((node) => node.id === current)
        if (visitedNodeIndex >= 0) {
          visitedNodesCopy[visitedNodeIndex].state = "visited"
          nodeSteps.push(visitedNodesCopy.map((node) => ({ ...node })))
          edgeSteps.push(cloneEdges().map((edge) => ({ ...edge })))
        }
      }

      // Reset final state
      const finalNodes = cloneNodes()
      finalNodes.forEach((node) => (node.state = "default"))
      const finalEdges = cloneEdges()
      finalEdges.forEach((edge) => (edge.state = "default"))

      nodeSteps.push(finalNodes)
      edgeSteps.push(finalEdges)

      setNodeHistory(nodeSteps)
      setEdgeHistory(edgeSteps)
    }
    // Only re-run when algorithm changes
  }, [algorithm])

  useEffect(() => {
    if (nodeHistory.length > 0 && edgeHistory.length > 0 && step < nodeHistory.length) {
      setNodes(nodeHistory[step])
      setEdges(edgeHistory[step])
    }
  }, [step, nodeHistory, edgeHistory])

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

    // Draw edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((node) => node.id === edge.from)
      const toNode = nodes.find((node) => node.id === edge.to)

      if (fromNode && toNode) {
        // Set color based on edge state
        switch (edge.state) {
          case "current":
            ctx.strokeStyle = "#f97316" // orange
            break
          case "visited":
            ctx.strokeStyle = "#10b981" // green
            break
          case "path":
            ctx.strokeStyle = "#8b5cf6" // purple
            break
          default:
            ctx.strokeStyle = "#94a3b8" // slate
        }

        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()

        // Draw weight if available
        if (edge.weight !== undefined) {
          const midX = (fromNode.x + toNode.x) / 2
          const midY = (fromNode.y + toNode.y) / 2

          ctx.fillStyle = "#f8fafc"
          ctx.beginPath()
          ctx.arc(midX, midY, 12, 0, 2 * Math.PI)
          ctx.fill()

          ctx.fillStyle = "#0f172a"
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(edge.weight.toString(), midX, midY)
        }
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      // Set color based on node state
      switch (node.state) {
        case "current":
          ctx.fillStyle = "#f97316" // orange
          break
        case "visited":
          ctx.fillStyle = "#10b981" // green
          break
        case "processing":
          ctx.fillStyle = "#8b5cf6" // purple
          break
        case "path":
          ctx.fillStyle = "#0ea5e9" // sky blue
          break
        default:
          ctx.fillStyle = "#64748b" // slate
      }

      // Draw node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
      ctx.fill()

      // Draw node ID
      ctx.fillStyle = "#f8fafc"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.id, node.x, node.y)
    })
  }, [nodes, edges])

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
          Step {step} of {Math.max(nodeHistory.length - 1, 0)}
        </p>
      </div>
    </div>
  )
}
