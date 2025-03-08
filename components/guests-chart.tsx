"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RSVP } from "@/lib/supabase"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface GuestsChartProps {
  rsvps: RSVP[]
}

export function GuestsChart({ rsvps }: GuestsChartProps) {
  // Only include attending RSVPs
  const attendingRsvps = rsvps.filter((rsvp) => rsvp.attending)

  // Count RSVPs by guest count
  const guestCounts = attendingRsvps.reduce(
    (acc, rsvp) => {
      const count = rsvp.guests
      acc[count] = (acc[count] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  // Convert to chart data format
  const data = Object.entries(guestCounts)
    .map(([guests, count]) => ({
      guests: `${guests} ${Number(guests) === 1 ? "guest" : "guests"}`,
      count,
    }))
    .sort((a, b) => {
      const aNum = Number.parseInt(a.guests)
      const bNum = Number.parseInt(b.guests)
      return aNum - bNum
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Distribution</CardTitle>
        <CardDescription>Number of RSVPs by guest count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "RSVPs",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="guests" angle={-45} textAnchor="end" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" name="RSVPs" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

