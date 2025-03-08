"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { RSVP } from "./rsvp-dashboard"

export default function RSVPCharts({ rsvps }: { rsvps: RSVP[] }) {
  // Calculate data for attendance pie chart
  const attendanceData = [
    {
      name: "Attending",
      value: rsvps.filter((rsvp) => rsvp.attending).length,
      color: "#22c55e", // green-500
    },
    {
      name: "Declined",
      value: rsvps.filter((rsvp) => !rsvp.attending).length,
      color: "#ef4444", // red-500
    },
  ]

  // Calculate data for dietary restrictions
  const dietaryData = rsvps
    .filter((rsvp) => rsvp.attending && rsvp.dietary_restrictions)
    .reduce(
      (acc, rsvp) => {
        const restriction = rsvp.dietary_restrictions.trim()
        if (restriction) {
          const existing = acc.find((item) => item.name === restriction)
          if (existing) {
            existing.value += 1
          } else {
            acc.push({ name: restriction, value: 1 })
          }
        }
        return acc
      },
      [] as { name: string; value: number }[],
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  // Add colors to dietary data
  const colors = ["#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4", "#10b981"]
  dietaryData.forEach((item, index) => {
    item.color = colors[index % colors.length]
  })

  // Calculate data for guest count
  const guestCountData = Array.from({ length: 4 }, (_, i) => ({
    name: i === 0 ? "Just them" : `+${i} guests`,
    value: rsvps.filter((rsvp) => rsvp.attending && rsvp.guests === i).length,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
          <CardDescription>Overview of who's attending and who declined</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer>
            <ChartPie data={attendanceData} index="name" category="value" className="h-[300px]">
              <ChartTooltip>
                <ChartTooltipContent formatValues={(v) => `${v} responses`} />
              </ChartTooltip>
              <ChartLegend>
                {attendanceData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartPie>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest Count</CardTitle>
          <CardDescription>Number of guests each invitee is bringing</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={guestCountData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} invitees`, ""]} />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {dietaryData.length > 0 && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dietary Restrictions</CardTitle>
            <CardDescription>Most common dietary needs among your guests</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer>
              <ChartPie data={dietaryData} index="name" category="value" className="h-[300px]">
                <ChartTooltip>
                  <ChartTooltipContent formatValues={(v) => `${v} guests`} />
                </ChartTooltip>
                <ChartLegend>
                  {dietaryData.map((entry) => (
                    <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                  ))}
                </ChartLegend>
              </ChartPie>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

