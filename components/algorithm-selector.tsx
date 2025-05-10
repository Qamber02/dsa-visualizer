"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AlgorithmSelectorProps {
  dataStructure: string
  selected: string
  onSelect: (algorithm: string) => void
}

// Define algorithms for each data structure
const algorithmsByDataStructure: Record<string, { id: string; name: string }[]> = {
  array: [
    { id: "bubble-sort", name: "Bubble Sort" },
    { id: "insertion-sort", name: "Insertion Sort" },
    { id: "selection-sort", name: "Selection Sort" },
    { id: "merge-sort", name: "Merge Sort" },
    { id: "quick-sort", name: "Quick Sort" },
    { id: "heap-sort", name: "Heap Sort" },
    { id: "linear-search", name: "Linear Search" },
    { id: "binary-search", name: "Binary Search" },
  ],
  "linked-list": [
    { id: "traversal", name: "Traversal" },
    { id: "insertion", name: "Insertion" },
    { id: "deletion", name: "Deletion" },
    { id: "reversal", name: "Reversal" },
    { id: "cycle-detection", name: "Cycle Detection" },
  ],
  stack: [
    { id: "push", name: "Push" },
    { id: "pop", name: "Pop" },
    { id: "peek", name: "Peek" },
    { id: "balanced-parentheses", name: "Balanced Parentheses" },
  ],
  queue: [
    { id: "enqueue", name: "Enqueue" },
    { id: "dequeue", name: "Dequeue" },
    { id: "peek", name: "Peek" },
  ],
  "binary-tree": [
    { id: "inorder-traversal", name: "Inorder Traversal" },
    { id: "preorder-traversal", name: "Preorder Traversal" },
    { id: "postorder-traversal", name: "Postorder Traversal" },
    { id: "level-order-traversal", name: "Level Order Traversal" },
  ],
  "binary-search-tree": [
    { id: "insertion", name: "Insertion" },
    { id: "deletion", name: "Deletion" },
    { id: "search", name: "Search" },
  ],
  heap: [
    { id: "insertion", name: "Insertion" },
    { id: "extract-min-max", name: "Extract Min/Max" },
    { id: "heapify", name: "Heapify" },
  ],
  graph: [
    { id: "bfs", name: "Breadth-First Search" },
    { id: "dfs", name: "Depth-First Search" },
    { id: "dijkstra", name: "Dijkstra's Algorithm" },
    { id: "bellman-ford", name: "Bellman-Ford Algorithm" },
    { id: "kruskal", name: "Kruskal's Algorithm" },
    { id: "prim", name: "Prim's Algorithm" },
  ],
  "hash-table": [
    { id: "insertion", name: "Insertion" },
    { id: "deletion", name: "Deletion" },
    { id: "search", name: "Search" },
    { id: "collision-handling", name: "Collision Handling" },
  ],
  // Add algorithms for other data structures as needed
}

export function AlgorithmSelector({ dataStructure, selected, onSelect }: AlgorithmSelectorProps) {
  const algorithms = algorithmsByDataStructure[dataStructure] || []

  if (algorithms.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">Select a data structure first</div>
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-2">
        {algorithms.map((algo) => (
          <Button
            key={algo.id}
            variant={selected === algo.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelect(algo.id)}
          >
            {algo.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
