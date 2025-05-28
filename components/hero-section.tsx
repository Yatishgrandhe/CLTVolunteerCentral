import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Make a Difference in
            <span className="block text-yellow-300">Charlotte</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with meaningful volunteer opportunities and help build a stronger community in the Queen City.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Find Opportunities
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
              >
                Join Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
