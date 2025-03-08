"use client"

import { useState } from "react"
import type { RSVP } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, X, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RSVPTableProps {
  rsvps: RSVP[]
}

export function RSVPTable({ rsvps }: RSVPTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof RSVP>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null)

  // Filter RSVPs based on search term
  const filteredRSVPs = rsvps.filter(
    (rsvp) =>
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rsvp.message && rsvp.message.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Sort RSVPs based on sort field and direction
  const sortedRSVPs = [...filteredRSVPs].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortDirection === "asc"
        ? aValue === bValue
          ? 0
          : aValue
            ? -1
            : 1
        : aValue === bValue
          ? 0
          : aValue
            ? 1
            : -1
    }

    return 0
  })

  // Handle sort click
  const handleSort = (field: keyof RSVP) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field: keyof RSVP) => {
    if (field !== sortField) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>RSVP Responses</CardTitle>
        <CardDescription>View and manage all your wedding RSVPs</CardDescription>
        <div className="flex items-center space-x-2 mt-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    Name
                    {renderSortIndicator("name")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("attending")}>
                  <div className="flex items-center">
                    Attending
                    {renderSortIndicator("attending")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("guests")}>
                  <div className="flex items-center">
                    Guests
                    {renderSortIndicator("guests")}
                  </div>
                </TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRSVPs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No RSVPs found
                  </TableCell>
                </TableRow>
              ) : (
                sortedRSVPs.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell className="font-medium">{rsvp.name}</TableCell>
                    <TableCell>
                      {rsvp.attending ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <X className="h-3 w-3 mr-1" /> No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{rsvp.guests}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRSVP(rsvp)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        {selectedRSVP && (
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>{selectedRSVP.name}'s RSVP</DialogTitle>
                              <DialogDescription>
                                Submitted on {new Date(selectedRSVP.created_at).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <div className="font-medium">Email:</div>
                                <div className="col-span-3">{selectedRSVP.email}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <div className="font-medium">Attending:</div>
                                <div className="col-span-3">
                                  {selectedRSVP.attending ? (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      <Check className="h-3 w-3 mr-1" /> Yes
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                      <X className="h-3 w-3 mr-1" /> No
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <div className="font-medium">Guests:</div>
                                <div className="col-span-3">{selectedRSVP.guests}</div>
                              </div>
                              {selectedRSVP.dietary_restrictions && (
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <div className="font-medium">Dietary Restrictions:</div>
                                  <div className="col-span-3">{selectedRSVP.dietary_restrictions}</div>
                                </div>
                              )}
                              {selectedRSVP.song_request && (
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <div className="font-medium">Song Request:</div>
                                  <div className="col-span-3">{selectedRSVP.song_request}</div>
                                </div>
                              )}
                              {selectedRSVP.message && (
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <div className="font-medium">Message:</div>
                                  <div className="col-span-3">
                                    <ScrollArea className="h-24 rounded-md border p-2">
                                      {selectedRSVP.message}
                                    </ScrollArea>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

