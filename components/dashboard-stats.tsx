import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RSVP } from "@/lib/supabase"
import { Check, X, Users, Music, UtensilsCrossed } from "lucide-react"

interface DashboardStatsProps {
  rsvps: RSVP[]
}

export function DashboardStats({ rsvps }: DashboardStatsProps) {
  const totalInvitations = rsvps.length
  const attending = rsvps.filter((rsvp) => rsvp.attending).length
  const notAttending = rsvps.filter((rsvp) => !rsvp.attending).length
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.attending ? rsvp.guests : 0), 0)
  const hasDietaryRestrictions = rsvps.filter(
    (rsvp) => rsvp.dietary_restrictions && rsvp.dietary_restrictions.trim() !== "",
  ).length
  const hasSongRequests = rsvps.filter((rsvp) => rsvp.song_request && rsvp.song_request.trim() !== "").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvitations}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attending</CardTitle>
          <Check className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{attending}</div>
          <p className="text-xs text-muted-foreground">
            {attending > 0 ? Math.round((attending / totalInvitations) * 100) : 0}% of invitations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Not Attending</CardTitle>
          <X className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notAttending}</div>
          <p className="text-xs text-muted-foreground">
            {notAttending > 0 ? Math.round((notAttending / totalInvitations) * 100) : 0}% of invitations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGuests}</div>
          <p className="text-xs text-muted-foreground">Including {attending} primary attendees</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dietary Restrictions</CardTitle>
          <UtensilsCrossed className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hasDietaryRestrictions}</div>
          <p className="text-xs text-muted-foreground">
            {hasDietaryRestrictions > 0 ? Math.round((hasDietaryRestrictions / attending) * 100) : 0}% of attendees
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Song Requests</CardTitle>
          <Music className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hasSongRequests}</div>
          <p className="text-xs text-muted-foreground">
            {hasSongRequests > 0 ? Math.round((hasSongRequests / attending) * 100) : 0}% of attendees
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

