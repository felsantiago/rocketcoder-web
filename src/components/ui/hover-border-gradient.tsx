import * as React from "react"

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function HoverBorderGradient({ children, className = "", ...props }: HoverBorderGradientProps) {
  return (
    <div
      className={`relative p-[2px] rounded-lg transition-shadow duration-300 hover:shadow-lg bg-gradient-to-r from-primary to-secondary ${className}`}
      {...props}
    >
      <div className="rounded-lg bg-background w-full h-full">
        {children}
      </div>
    </div>
  )
}