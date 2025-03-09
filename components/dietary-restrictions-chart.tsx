"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RSVP } from "@/lib/supabase"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DietaryRestrictionsChartProps {
  rsvps: RSVP[]
}

export function DietaryRestrictionsChart({ rsvps }: DietaryRestrictionsChartProps) {
  // Only include attending RSVPs
  const attendingRsvps = rsvps.filter((rsvp) => rsvp.attending)

  // Count RSVPs with and without dietary restrictions
  const withRestrictions = attendingRsvps.filter(
    (rsvp) => rsvp.dietary_restrictions && rsvp.dietary_restrictions.trim() !== "",
  ).length

  const withoutRestrictions = attendingRsvps.length - withRestrictions
  const data = [
    { name: "With Restrictions", value: withRestrictions, color: "#4B0082" }, // Dark Indigo
    { name: "No Restrictions", value: withoutRestrictions, color: "#1B5E20" }, // Deep Emerald Green
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Restrictions</CardTitle>
        <CardDescription>Guests with special dietary needs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attending: {
              label: "With Restrictions",
              color: "hsl(var(--chart-4))",
            },
            notAttending: {
              label: "No Restrictions",
              color: "hsl(var(--chart-5))",
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
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

