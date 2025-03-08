import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Users, UtensilsCrossed, Music, MessageSquare } from "lucide-react"
import type { RSVP } from "./rsvp-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function RSVPCards({ rsvps, isLoading }: { rsvps: RSVP[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <RSVPCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (rsvps.length === 0) {
    return <div className="text-center py-8 text-gray-500">No RSVPs found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rsvps.map((rsvp) => (
        <Card key={rsvp.id} className={rsvp.attending ? "border-green-200" : "border-red-100"}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{rsvp.name}</h3>
                <p className="text-sm text-gray-500">{rsvp.email}</p>
              </div>
              {rsvp.attending ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="mr-1 h-3 w-3" /> Attending
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-800 border-red-200 bg-red-50 hover:bg-red-50">
                  <XCircle className="mr-1 h-3 w-3" /> Declined
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            {rsvp.attending && (
              <div className="grid gap-2">
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span>
                    {rsvp.guests + 1} {rsvp.guests + 1 === 1 ? "guest" : "guests"} total
                  </span>
                </div>

                {rsvp.dietary_restrictions && (
                  <div className="flex items-center text-sm">
                    <UtensilsCrossed className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{rsvp.dietary_restrictions}</span>
                  </div>
                )}

                {rsvp.song_request && (
                  <div className="flex items-center text-sm">
                    <Music className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{rsvp.song_request}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {rsvp.message && (
            <CardFooter className="border-t pt-4 text-sm">
              <div className="flex items-start">
                <MessageSquare className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                <p className="italic">{rsvp.message}</p>
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}

function RSVPCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-16 w-full" />
      </CardFooter>
    </Card>
  )
}

