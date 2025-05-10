"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DataStructureSelectorProps {
  selected: string
  onSelect: (dataStructure: string) => void
}

const dataStructures = [
  { id: "array", name: "Array" },
  { id: "linked-list", name: "Linked List" },
  { id: "stack", name: "Stack" },
  { id: "queue", name: "Queue" },
  { id: "binary-tree", name: "Binary Tree" },
  { id: "binary-search-tree", name: "Binary Search Tree" },
  { id: "heap", name: "Heap" },
  { id: "graph", name: "Graph" },
  { id: "hash-table", name: "Hash Table" },
  { id: "trie", name: "Trie" },
  { id: "avl-tree", name: "AVL Tree" },
  { id: "red-black-tree", name: "Red-Black Tree" },
  { id: "b-tree", name: "B-Tree" },
  { id: "disjoint-set", name: "Disjoint Set" },
  { id: "bloom-filter", name: "Bloom Filter" },
  { id: "skip-list", name: "Skip List" },
]

export function DataStructureSelector({ selected, onSelect }: DataStructureSelectorProps) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-2">
        {dataStructures.map((ds) => (
          <Button
            key={ds.id}
            variant={selected === ds.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelect(ds.id)}
          >
            {ds.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
