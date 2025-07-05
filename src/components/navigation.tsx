"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface NavigationProps {
  onSectionChange: (section: string) => void
  onBookingToggle: () => void
}

export function Navigation({ onSectionChange, onBookingToggle }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
        : 'bg-white/90 backdrop-blur-sm shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Book Now */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSectionChange("home")}>
              <div className="relative">
                <Image 
                  src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png" 
                  alt="Apple Haven Logo" 
                  width={45} 
                  height={45} 
                  className="rounded-full bg-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  Apple Haven
                </h1>
                <p className="text-xs text-gray-500">Kashmir Valley</p>
              </div>
            </div>
            
            {/* Book Now Button */}
            <button
              onClick={onBookingToggle}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Book Now
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
                  activeSection === item.id
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-orange-500 transform origin-left transition-transform duration-300 ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Contact & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-gray-600 animate-fade-in">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+91 194 xxx xxxx</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transform hover:scale-110 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left font-medium transition-all duration-300 hover:translate-x-2 py-2 px-4 rounded-lg ${
                    activeSection === item.id 
                      ? "text-red-600 bg-red-50 font-semibold" 
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}