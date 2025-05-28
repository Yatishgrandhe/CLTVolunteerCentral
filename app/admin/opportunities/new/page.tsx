"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function NewOpportunityPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [maxVolunteers, setMaxVolunteers] = useState("")
  const [loading, setLoading] = useState(false)

  const { profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("opportunities").insert({
        title,
        description,
        location,
        date_time: dateTime,
        max_volunteers: Number.parseInt(maxVolunteers),
        created_by: profile?.id,
      })

      if (error) throw error

      toast({
        title: "Success!",
        description: "Opportunity created successfully.",
      })

      router.push("/admin/opportunities")
    } catch (error) {
      console.error("Error creating opportunity:", error)
      toast({
        title: "Error",
        description: "Failed to create opportunity.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="dateTime">Date & Time</Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxVolunteers">Maximum Volunteers</Label>
                <Input
                  id="maxVolunteers"
                  type="number"
                  min="1"
                  value={maxVolunteers}
                  onChange={(e) => setMaxVolunteers(e.target.value)}
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Opportunity"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
