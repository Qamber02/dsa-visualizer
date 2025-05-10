"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ControlPanelProps {
  dataStructure: string
  algorithm: string
}

export function ControlPanel({ dataStructure, algorithm }: ControlPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const [arrayValues, setArrayValues] = useState<number[]>([5, 2, 9, 1, 5, 6])

  const handleAddValue = () => {
    if (inputValue.trim() === "") return

    const value = Number.parseInt(inputValue)
    if (!isNaN(value)) {
      setArrayValues([...arrayValues, value])
      setInputValue("")
    }
  }

  const handleGenerateRandom = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setArrayValues(randomArray)
  }

  const renderControls = () => {
    switch (dataStructure) {
      case "array":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter a value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddValue()
                  }
                }}
              />
              <Button size="sm" onClick={handleAddValue}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleGenerateRandom}>
              Generate Random Array
            </Button>
            <div>
              <Label>Current Array:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {arrayValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-8 w-8 rounded bg-muted text-sm font-medium"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "linked-list":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter a value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddValue()
                  }
                }}
              />
              <Button size="sm" onClick={handleAddValue}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleGenerateRandom}>
              Generate Random List
            </Button>
          </div>
        )

      // Add controls for other data structures

      default:
        return <div className="text-center py-4 text-muted-foreground">Select a data structure to see controls</div>
    }
  }

  return (
    <div className="space-y-4">
      {renderControls()}

      {algorithm && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Algorithm Controls</h4>
            <p className="text-xs text-muted-foreground">
              Additional controls for the selected algorithm will appear here.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
