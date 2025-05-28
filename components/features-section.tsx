import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Heart, MapPin } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Volunteer with Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of volunteers making a positive impact in the Charlotte community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <CardTitle>Flexible Scheduling</CardTitle>
              <CardDescription>
                Find opportunities that fit your schedule, from one-time events to ongoing commitments.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <CardTitle>Community Impact</CardTitle>
              <CardDescription>
                Work alongside like-minded individuals to create lasting change in our community.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="w-12 h-12 text-red-600 mb-4 mx-auto" />
              <CardTitle>Personal Growth</CardTitle>
              <CardDescription>
                Develop new skills, meet new people, and gain valuable experience while helping others.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <CardTitle>Local Focus</CardTitle>
              <CardDescription>
                Make a direct impact in Charlotte neighborhoods and communities that need support most.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
