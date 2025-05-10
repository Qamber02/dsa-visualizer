"use client"

import { useEffect, useRef, useState } from "react"

interface BinaryTreeVisualizerProps {
  type: string
  algorithm: string
  step: number
}

interface TreeNode {
  value: number
  left?: TreeNode
  right?: TreeNode
  state: "default" | "current" | "visited" | "processing" | "balanced" | "unbalanced"
}

export function BinaryTreeVisualizer({ type, algorithm, step }: BinaryTreeVisualizerProps) {
  const [root, setRoot] = useState<TreeNode>({
    value: 50,
    left: {
      value: 25,
      left: { value: 10, state: "default" },
      right: { value: 35, state: "default" },
      state: "default",
    },
    right: {
      value: 75,
      left: { value: 60, state: "default" },
      right: { value: 90, state: "default" },
      state: "default",
    },
    state: "default",
  })

  const [history, setHistory] = useState<TreeNode[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!algorithm) {
      setHistory([root])
      return
    }

    if (algorithm === "inorder-traversal") {
      // Generate visualization steps for inorder traversal
      const steps: TreeNode[] = []

      // Deep clone the tree for each step
      const cloneTree = (node: TreeNode): TreeNode => {
        return {
          value: node.value,
          left: node.left ? cloneTree(node.left) : undefined,
          right: node.right ? cloneTree(node.right) : undefined,
          state: node.state,
        }
      }

      // Reset all states first
      const initialTree = cloneTree(root)
      resetNodeStates(initialTree)
      steps.push(initialTree)

      // Perform inorder traversal and capture steps
      const inorderTraversal = (node: TreeNode, path: TreeNode[] = []) => {
        if (!node) return

        // Visit left subtree
        if (node.left) {
          node.state = "processing"
          node.left.state = "current"
          steps.push(cloneTree(initialTree))

          inorderTraversal(node.left, [...path, node])
        }

        // Visit node
        node.state = "visited"
        steps.push(cloneTree(initialTree))

        // Visit right subtree
        if (node.right) {
          node.state = "processing"
          node.right.state = "current"
          steps.push(cloneTree(initialTree))

          inorderTraversal(node.right, [...path, node])
        }

        // Reset node state when backtracking
        node.state = "default"
        if (path.length > 0) {
          path[path.length - 1].state = "current"
        }
        steps.push(cloneTree(initialTree))
      }

      // Start traversal from root
      initialTree.state = "current"
      steps.push(cloneTree(initialTree))
      inorderTraversal(initialTree)

      // Reset final state
      const finalTree = cloneTree(initialTree)
      resetNodeStates(finalTree)
      steps.push(finalTree)

      setHistory(steps)
    }
    // Only re-run when algorithm changes
  }, [algorithm])

  // Helper function to reset all node states
  const resetNodeStates = (node: TreeNode) => {
    if (!node) return
    node.state = "default"
    if (node.left) resetNodeStates(node.left)
    if (node.right) resetNodeStates(node.right)
  }

  useEffect(() => {
    if (history.length > 0 && step < history.length) {
      setRoot(history[step])
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

    // Calculate tree layout
    const nodeRadius = 25
    const levelHeight = 80
    const maxDepth = getTreeDepth(root)

    // Draw the tree
    drawTree(ctx, root, canvas.width / 2, 50, canvas.width / 2, nodeRadius, levelHeight)
  }, [root])

  // Helper function to get tree depth
  const getTreeDepth = (node: TreeNode | undefined): number => {
    if (!node) return 0
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right))
  }

  // Helper function to draw the tree
  const drawTree = (
    ctx: CanvasRenderingContext2D,
    node: TreeNode | undefined,
    x: number,
    y: number,
    horizontalSpacing: number,
    nodeRadius: number,
    levelHeight: number,
  ) => {
    if (!node) return

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
      case "balanced":
        ctx.fillStyle = "#0ea5e9" // sky blue
        break
      case "unbalanced":
        ctx.fillStyle = "#f43f5e" // pink
        break
      default:
        ctx.fillStyle = "#64748b" // slate
    }

    // Draw node circle
    ctx.beginPath()
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
    ctx.fill()

    // Draw value text
    ctx.fillStyle = "#f8fafc"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(node.value.toString(), x, y)

    // Calculate positions for children
    const nextHorizontalSpacing = horizontalSpacing / 2
    const leftX = x - nextHorizontalSpacing
    const rightX = x + nextHorizontalSpacing
    const childY = y + levelHeight

    // Draw edges to children
    if (node.left) {
      ctx.beginPath()
      ctx.moveTo(x - nodeRadius / 2, y + nodeRadius / 2)
      ctx.lineTo(leftX + nodeRadius / 2, childY - nodeRadius / 2)
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw left child
      drawTree(ctx, node.left, leftX, childY, nextHorizontalSpacing, nodeRadius, levelHeight)
    }

    if (node.right) {
      ctx.beginPath()
      ctx.moveTo(x + nodeRadius / 2, y + nodeRadius / 2)
      ctx.lineTo(rightX - nodeRadius / 2, childY - nodeRadius / 2)
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw right child
      drawTree(ctx, node.right, rightX, childY, nextHorizontalSpacing, nodeRadius, levelHeight)
    }
  }

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
