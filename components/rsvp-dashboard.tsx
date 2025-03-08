"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import RSVPStats from "./rsvp-stats"
import RSVPCharts from "./rsvp-charts"
import RSVPTable from "./rsvp-table"
import RSVPCards from "./rsvp-cards"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { generateMockRSVPs } from "@/lib/supabase"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Only create client if we have valid config
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export type RSVP = {
  id: number
  name: string
  email: string
  attending: boolean
  guests: number
  dietary_restrictions: string
  song_request: string
  message: string
  created_at: string
}

export default function RSVPDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        if (!supabase) {
          console.warn("Supabase client not initialized. Using mock data.")
          const mockData = generateMockRSVPs()
          setRsvps(mockData)
          setFilteredRsvps(mockData)
          setIsUsingMockData(true)
          return
        }

        const { data, error } = await supabase.from("rsvp").select("*").order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          setRsvps(data)
          setFilteredRsvps(data)
        }
      } catch (error) {
        console.error("Error fetching RSVPs:", error)
        // If we can't fetch real data, use mock data for demonstration
        const mockData = generateMockRSVPs()
        setRsvps(mockData)
        setFilteredRsvps(mockData)
        setIsUsingMockData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRSVPs()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = rsvps.filter(
        (rsvp) =>
          rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rsvp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rsvp.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredRsvps(filtered)
    } else {
      setFilteredRsvps(rsvps)
    }
  }, [searchQuery, rsvps])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="space-y-6">
      {isUsingMockData && (
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Using Mock Data</AlertTitle>
          <AlertDescription className="text-amber-700">
            Unable to connect to Supabase. Please check your API key and URL. Currently displaying mock data.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RSVPStats rsvps={rsvps} />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Guest Responses</CardTitle>
              <CardDescription>Manage and view all your wedding RSVP responses</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <RSVPTable rsvps={filteredRsvps} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="cards">
              <RSVPCards rsvps={filteredRsvps} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="charts">
              <RSVPCharts rsvps={rsvps} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

