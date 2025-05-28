"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { supabase, type Opportunity } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react"

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { user, profile } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchOpportunities()
  }, [])

  useEffect(() => {
    filterOpportunities()
  }, [opportunities, searchTerm, categoryFilter])

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("status", "active")
        .order("date_time", { ascending: true })

      if (error) throw error
      setOpportunities(data || [])
    } catch (error) {
      console.error("Error fetching opportunities:", error)
      toast({
        title: "Error",
        description: "Failed to load opportunities.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterOpportunities = () => {
    let filtered = opportunities

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredOpportunities(filtered)
  }

  const handleSignUp = async (opportunityId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to sign up for opportunities.",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase.from("volunteer_signups").insert({
        opportunity_id: opportunityId,
        volunteer_id: user.id,
      })

      if (error) throw error

      toast({
        title: "Success!",
        description: "You have successfully signed up for this opportunity.",
      })

      // Refresh opportunities to update counts
      fetchOpportunities()
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "Already signed up",
          description: "You are already signed up for this opportunity.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to sign up for opportunity.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find meaningful ways to give back to the Charlotte community. Every contribution makes a difference.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No opportunities found" : "No opportunities available"}
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms or filters."
                  : "Check back soon for new volunteer opportunities."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
                    <Badge
                      variant={
                        opportunity.current_volunteers >= (opportunity.max_volunteers || 0) ? "destructive" : "default"
                      }
                      className="ml-2 flex-shrink-0"
                    >
                      {opportunity.current_volunteers >= (opportunity.max_volunteers || 0) ? "Full" : "Open"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-6">
                    {opportunity.date_time && (
                      <>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>
                            {new Date(opportunity.date_time).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>
                            {new Date(opportunity.date_time).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </>
                    )}
                    {opportunity.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{opportunity.location}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {opportunity.current_volunteers} / {opportunity.max_volunteers || "∞"} volunteers
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSignUp(opportunity.id)}
                    disabled={
                      !user || opportunity.current_volunteers >= (opportunity.max_volunteers || Number.MAX_SAFE_INTEGER)
                    }
                    className="w-full"
                  >
                    {!user
                      ? "Sign In to Register"
                      : opportunity.current_volunteers >= (opportunity.max_volunteers || Number.MAX_SAFE_INTEGER)
                        ? "Full"
                        : "Sign Up"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
