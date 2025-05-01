import * as React from "react"

interface CompareProps {
  valueA: string | number
  valueB: string | number
  labelA?: string
  labelB?: string
}

export function Compare({ valueA, valueB, labelA = "A", labelB = "B" }: CompareProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-semibold">{labelA}</span>
        <span className="font-semibold">{labelB}</span>
      </div>
      <div className="flex justify-between bg-muted rounded p-2">
        <span>{valueA}</span>
        <span>{valueB}</span>
      </div>
    </div>
  )
}