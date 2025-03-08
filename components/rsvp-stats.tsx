import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UtensilsCrossed, Music, CheckCircle } from "lucide-react"
import type { RSVP } from "./rsvp-dashboard"

export default function RSVPStats({ rsvps }: { rsvps: RSVP[] }) {
  // Calculate statistics
  const totalInvited = rsvps.length
  const totalAttending = rsvps.filter((rsvp) => rsvp.attending).length
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.attending ? rsvp.guests + 1 : 0), 0)
  const totalDietaryRestrictions = rsvps.filter(
    (rsvp) => rsvp.dietary_restrictions && rsvp.dietary_restrictions.trim() !== "",
  ).length
  const totalSongRequests = rsvps.filter((rsvp) => rsvp.song_request && rsvp.song_request.trim() !== "").length

  const stats = [
    {
      title: "Total Responses",
      value: totalInvited,
      description: `${totalAttending} attending (${Math.round((totalAttending / totalInvited) * 100) || 0}%)`,
      icon: <CheckCircle className="h-4 w-4 text-rose-600" />,
    },
    {
      title: "Total Guests",
      value: totalGuests,
      description: "Including plus ones",
      icon: <Users className="h-4 w-4 text-blue-600" />,
    },
    {
      title: "Dietary Needs",
      value: totalDietaryRestrictions,
      description: `${Math.round((totalDietaryRestrictions / totalAttending) * 100) || 0}% of guests`,
      icon: <UtensilsCrossed className="h-4 w-4 text-amber-600" />,
    },
    {
      title: "Song Requests",
      value: totalSongRequests,
      description: `${Math.round((totalSongRequests / totalAttending) * 100) || 0}% participation`,
      icon: <Music className="h-4 w-4 text-purple-600" />,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

