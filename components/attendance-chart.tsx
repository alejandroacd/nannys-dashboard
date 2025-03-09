"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RSVP } from "@/lib/supabase"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface AttendanceChartProps {
  rsvps: RSVP[]
}

export function AttendanceChart({ rsvps }: AttendanceChartProps) {
  const attending = rsvps.filter((rsvp) => rsvp.attending).length
  const notAttending = rsvps.filter((rsvp) => !rsvp.attending).length
  const data = [
    { name: "Attending", value: attending, color: "#2E7D32" }, // Dark Green
    { name: "Not Attending", value: notAttending, color: "#D84315" }, // Dark Orange-Red
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Breakdown of attendance responses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
