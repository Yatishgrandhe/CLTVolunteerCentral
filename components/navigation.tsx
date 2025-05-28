"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Settings, Calendar, Heart, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const { user, profile, signOut, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = profile?.role === "admin" || profile?.role === "leadership"

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">CLT Volunteer Central</span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">CLT VC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/opportunities">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Opportunities
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                About
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Contact
              </Button>
            </Link>

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse ml-4"></div>
            ) : user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{profile?.full_name || "User"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-signups">
                        <Calendar className="w-4 h-4 mr-2" />
                        My Signups
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link href="/opportunities" className="block">
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  Opportunities
                </Button>
              </Link>
              <Link href="/about" className="block">
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  About
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  Contact
                </Button>
              </Link>

              {loading ? (
                <div className="p-2">Loading...</div>
              ) : user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="block">
                      <Button variant="ghost" className="w-full justify-start text-gray-700">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/profile" className="block">
                    <Button variant="ghost" className="w-full justify-start text-gray-700">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/my-signups" className="block">
                    <Button variant="ghost" className="w-full justify-start text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Signups
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-gray-700" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="block">
                    <Button variant="ghost" className="w-full justify-start text-gray-700">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="block">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
