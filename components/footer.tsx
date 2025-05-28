import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CLT Volunteer Central</span>
            </div>
            <p className="text-gray-400 mb-4">Connecting volunteers with meaningful opportunities in Charlotte, NC.</p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Charlotte, NC
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@cltvolunteercentral.org
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (704) 555-0123
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/opportunities" className="hover:text-white transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/volunteer-resources" className="hover:text-white transition-colors">
                  Volunteer Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Organizations</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/partner-with-us" className="hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/post-opportunity" className="hover:text-white transition-colors">
                  Post Opportunity
                </Link>
              </li>
              <li>
                <Link href="/organization-resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 CLT Volunteer Central. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
