"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Mail, Users, Settings, Plus } from "lucide-react"

export default function AdminDashboard() {
  const { profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!profile || (profile.role !== "admin" && profile.role !== "leadership"))) {
      router.push("/")
    }
  }, [profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  if (!profile || (profile.role !== "admin" && profile.role !== "leadership")) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage volunteer opportunities, email templates, and system settings.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Opportunities Management */}
          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Opportunities</CardTitle>
              <CardDescription>Create and manage volunteer opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/opportunities">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View All Opportunities
                  </Button>
                </Link>
                <Link href="/admin/opportunities/new">
                  <Button className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Opportunity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Email Management */}
          <Card>
            <CardHeader>
              <Mail className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Email Management</CardTitle>
              <CardDescription>Manage email templates and campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/email-templates">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Templates
                  </Button>
                </Link>
                <Link href="/admin/email-campaigns">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Campaigns
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage volunteer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View All Users
                  </Button>
                </Link>
                <Link href="/admin/signups">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Volunteer Signups
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Settings (Admin Only) */}
          {profile.role === "admin" && (
            <Card>
              <CardHeader>
                <Settings className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure email servers and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/admin/email-servers">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Email Servers
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
