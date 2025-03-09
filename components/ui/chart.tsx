import type * as React from "react"

type ChartProps = {
  children: React.ReactNode
  className?: string
}
type ChartContainerProps = {
  children: React.ReactNode;
  config?: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
  className?: string;
};
export const ChartContainer = ({ children, config, className }: ChartContainerProps) => {
  // component implementation
  // you can use the config prop here if needed
  return <div className={className}>{children}</div>;
};

export const Chart = ({ children, className }: ChartProps) => {
  return <div className={className}>{children}</div>
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

