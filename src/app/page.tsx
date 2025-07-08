"use client"

import { Suspense, useState, useCallback, useEffect } from "react"
import { Navigation } from "../components/navigation"
import { HeroSection } from "../components/hero-section"
import { RoomsSection } from "../components/rooms-section"
import { AmenitiesSection } from "../components/amenities-section"
import { GallerySection } from "../components/gallery-section"
import { ContactSection } from "../components/contact-section"
import { BookingModal } from "../components/booking-modal"
import ModelViewer from "@/components/model-viewer"
import { Instagram, Facebook } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"
import { ChinarLeaves } from "@/components/chinar-leaves"
import Image from "next/image"

// Enhanced intersection observer for fade-in animations
const useIntersectionObserver = () => {
  useEffect(() => {
    // Use passive event listeners for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
            // Unobserve after animation to reduce overhead
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.05, // Reduced threshold for earlier trigger
        rootMargin: '20px' // Reduced margin for better performance
      }
    )

    const elements = document.querySelectorAll('.fade-in-section')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// Main Component
export default function AppleHavenInn() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modelLoaded, setModelLoaded] = useState(false)

  useIntersectionObserver()

  const handleLoadingFinish = () => setIsLoading(false)

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleBooking = () => {
    setShowBookingModal(!showBookingModal)
  }

  return (
    <div className="min-h-screen relative">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-[200]">
          <LoadingScreen onFinish={handleLoadingFinish} />
        </div>
      )}
      
      {/* Floating Leaves Animation */}
      {modelLoaded && <ChinarLeaves />}
      
      {/* Navigation */}
      <Navigation onSectionChange={scrollToSection} onBookingToggle={toggleBooking} />

      {/* Hero Section with Enhanced 3D Scene */}
      <section id="home" className="relative">
        <div className="relative h-screen w-full overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/unnamed (1).jpg"
              alt="Kashmir Valley Background"
              fill
              style={{ objectFit: "cover" }}
              className="z-0"
              priority
            />
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-0" />
            <div className="absolute inset-0" style={{ 
              backdropFilter: 'blur(1px)', 
              WebkitBackdropFilter: 'blur(1px)' 
            }} />
          </div>
          
          {/* Enhanced 3D Model - Synced with loading screen */}
          <div className="absolute inset-0 z-5">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-lg animate-pulse">Preparing 3D Apple Model...</div>
              </div>
            }>
              <ModelViewer
                modelUrls={["/models/countryside/kashmiri_apple_very_r_0629101439_texture.glb"]}
                onLoaded={handleModelLoaded}
                className="border-0"
                loadingDuration={4000} // Increased to sync with longer loading screen
              />
            </Suspense>
          </div>
          
          {/* Hero Content */}
          <HeroSection onBookingToggle={toggleBooking} />
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="fade-in-section">
        <RoomsSection />
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="fade-in-section">
        <AmenitiesSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="fade-in-section">
        <GallerySection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="fade-in-section">
        <ContactSection />
      </section>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal onClose={toggleBooking} />}

      {/* Enhanced Footer - Complete Gap Filled */}
      <footer className="w-full relative bg-gradient-to-br from-white via-orange-50 to-red-50 text-gray-800 pt-16 pb-8 mt-16 border-t border-orange-200 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Hotel Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png" 
                    alt="Apple Haven Inn Logo" 
                    className="w-20 h-20 rounded-full shadow-lg hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-red-700">Apple Haven Inn</h3>
                  <p className="text-lg text-gray-600">Your Home in Paradise</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Reram Gulmarg, Kashmir Valley 193403
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  📞 +91 194 xxx xxxx
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  ✉️ applehavenkashmir@gmail.com
                </p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-red-700 mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['home', 'rooms', 'amenities', 'gallery', 'contact'].map((section) => (
                  <button 
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-gray-600 hover:text-red-600 transition-colors duration-300 capitalize"
                  >
                    {section === 'home' ? 'Home' : section}
                  </button>
                ))}
                <button 
                  onClick={toggleBooking}
                  className="block font-semibold text-red-600 hover:text-red-700 transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
            
            {/* Social Media & Contact */}
            <div>
              <h4 className="text-xl font-bold text-red-700 mb-6">Follow Us</h4>
              <div className="flex gap-4 mb-6">
                <a 
                  href="https://www.instagram.com/apple.haven.kashmir/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Instagram
                  </span>
                </a>
                <a 
                  href="https://facebook.com/applehaveninn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Facebook
                  </span>
                </a>
              </div>
              
              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Check-in:</strong> 2:00 PM</p>
                <p><strong>Check-out:</strong> 12:00 PM</p>
                <p><strong>Reception:</strong> 24/7</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Apple Haven Inn. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>Cancellation Policy</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span>Designed with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>in Kashmir</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}