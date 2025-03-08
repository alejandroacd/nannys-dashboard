import type * as React from "react"

type ChartProps = {
  children: React.ReactNode
  className?: string
}

export const Chart = ({ children, className }: ChartProps) => {
  return <div className={className}>{children}</div>
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

type ChartLegendProps = {
  children: React.ReactNode
}

export const ChartLegend = ({ children }: ChartLegendProps) => {
  return <div>{children}</div>
}

type ChartLegendItemProps = {
  name: string
  color: string
}

export const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
      <div
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: color,
          marginRight: "8px",
        }}
      />
      <span>{name}</span>
    </div>
  )
}

type ChartPieProps = {
  data: any[]
  index: string
  category: string
  className?: string
  children?: React.ReactNode
}

export const ChartPie = ({ data, index, category, className, children }: ChartPieProps) => {
  return <div className={className}>{children}</div>
}

type ChartTooltipProps = {
  children: React.ReactNode
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <div>{children}</div>
}

type ChartTooltipContentProps = {
  formatValues?: (value: number) => string
}

export const ChartTooltipContent = ({ formatValues }: ChartTooltipContentProps) => {
  return <div>{formatValues ? formatValues(100) : "100"}</div>
}

type ChartTooltipItemProps = {
  name: string
  value: number
}

export const ChartTooltipItem = ({ name, value }: ChartTooltipItemProps) => {
  return (
    <div>
      {name}: {value}
    </div>
  )
}

