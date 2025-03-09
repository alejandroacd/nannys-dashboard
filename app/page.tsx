import { DashboardStats } from "@/components/dashboard-stats"
import { AttendanceChart } from "@/components/attendance-chart"
import { GuestsChart } from "@/components/guests-chart"
import { RSVPTable } from "@/components/rsvp-table"
import { DietaryRestrictionsChart } from "@/components/dietary-restrictions-chart"
import { getRSVPs, supabase } from "@/lib/supabase"
import { HeartHandshake, AlertTriangle, Music } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function Home() {
  const rsvps = await getRSVPs()
  const isUsingMockData = !supabase

  const songRequests = rsvps
    .filter((rsvp) => rsvp.song_request && rsvp.song_request.trim() !== "")
    .map((rsvp) => rsvp.song_request.trim())

  const displayedSongs = songRequests.slice(0, 5)
  const moreSongsCount = songRequests.length - displayedSongs.length

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-semibold">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span> Hecho con amor por tu hermano y tu mamá 💖</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of all your wedding RSVP responses</p>
          </div>

          {isUsingMockData && (
            <Alert variant="warning" className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Invalid API Key</AlertTitle>
              <AlertDescription className="text-amber-700">
                The Supabase API key appears to be invalid. Currently displaying mock data. Please check your
                environment variables and ensure the NEXT_PUBLIC_SUPABASE_ANON_KEY is correct.
              </AlertDescription>
            </Alert>
          )}

          <DashboardStats rsvps={rsvps} />

          <div className="grid gap-6 md:grid-cols-2">
            <AttendanceChart rsvps={rsvps} />
            <GuestsChart rsvps={rsvps} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DietaryRestrictionsChart rsvps={rsvps} />
            <Card className="p-6 bg-gradient-to-r from-[#4c4f69] to-[#2e2e48] text-white shadow-lg rounded-xl">
              <div className="flex items-center gap-3">
                <Music className="h-8 w-8 text-[#e6b422]" /> {/* Warm golden accent */}
                <h3 className="text-2xl font-semibold">Song Requests</h3>
              </div>

              {songRequests.length > 0 ? (
                <ul className="mt-4 space-y-1 text-lg">
                  {displayedSongs.map((song, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-[#e6b422]">🎶</span> {/* Matches icon color */}
                      {song}
                    </li>
                  ))}
                  {moreSongsCount > 0 && <li className="text-sm opacity-80">+{moreSongsCount} more...</li>}
                </ul>
              ) : (
                <p className="mt-4 text-muted-foreground">No song requests yet 🎧</p>
              )}
            </Card>
          </div>

          <RSVPTable rsvps={rsvps} />
        </div>
      </main>
    </div>
  )
}

export const revalidate = 600; // 600 seconds = 10 minutes
