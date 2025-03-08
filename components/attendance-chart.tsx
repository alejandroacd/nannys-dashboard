"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RSVP } from "@/lib/supabase"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AttendanceChartProps {
  rsvps: RSVP[]
}

export function AttendanceChart({ rsvps }: AttendanceChartProps) {
  const attending = rsvps.filter((rsvp) => rsvp.attending).length
  const notAttending = rsvps.filter((rsvp) => !rsvp.attending).length

  const data = [
    { name: "Attending", value: attending, color: "var(--chart-1)" },
    { name: "Not Attending", value: notAttending, color: "var(--chart-2)" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Breakdown of attendance responses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attending: {
              label: "Attending",
              color: "hsl(var(--chart-1))",
            },
            notAttending: {
              label: "Not Attending",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

