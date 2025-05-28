"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { supabase, type Opportunity } from "@/lib/supabase"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

export function OpportunitiesPreview() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("status", "active")
        .order("date_time", { ascending: true })
        .limit(3)

      if (error) throw error
      setOpportunities(data || [])
    } catch (error) {
      console.error("Error fetching opportunities:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover ways to make a difference in your community today.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : opportunities.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <Badge variant="default">Open</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {opportunity.date_time && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(opportunity.date_time).toLocaleDateString()}
                        </div>
                      )}
                      {opportunity.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {opportunity.location}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {opportunity.current_volunteers} / {opportunity.max_volunteers || "∞"} volunteers
                      </div>
                    </div>
                    <Link href="/opportunities">
                      <Button className="w-full">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Link href="/opportunities">
                <Button size="lg" variant="outline">
                  View All Opportunities
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities available</h3>
            <p className="text-gray-600">Check back soon for new volunteer opportunities.</p>
          </div>
        )}
      </div>
    </section>
  )
}
