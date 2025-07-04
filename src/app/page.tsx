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

// Main Component
export default function AppleHavenInn() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modelLoaded, setModelLoaded] = useState(false)

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
      {/* Always render main content, overlay loading screen if needed */}
      {isLoading && (
        <div className="fixed inset-0 z-[200]">
          <LoadingScreen onFinish={handleLoadingFinish} />
        </div>
      )}
      {modelLoaded && <ChinarLeaves />}
      <Navigation onSectionChange={scrollToSection} onBookingToggle={toggleBooking} />

      {/* Hero Section with 3D Scene */}
      <section id="home" className="relative">
        <div className="relative h-screen w-full">
          {/* Background image behind 3D model */}
          <Image
            src="/images/unnamed (1).jpg"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            className="z-0"
            priority
          />
          {/* Blur and overlay only on background */}
          <div className="absolute inset-0 z-0" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />
          <div className="absolute inset-0 bg-black/20 z-0" />
          <Suspense fallback={<div>Loading 3D Scene...</div>}>
            <ModelViewer
              modelUrls={[
                "/models/countryside/kashmiri_apple_very_r_0629101439_texture.glb" // Kashmiri apple
              ]}
              onLoaded={handleModelLoaded}
            />
          </Suspense>
          <HeroSection onBookingToggle={toggleBooking} />
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms">
        <RoomsSection />
      </section>

      {/* Amenities Section */}
      <section id="amenities">
        <AmenitiesSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <GallerySection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal onClose={toggleBooking} />}

      {/* Footer */}
      <footer className="w-full relative bg-white text-gray-800 pt-10 pb-4 mt-16 fade-in-section border-t border-orange-200 shadow-inner overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-6 lg:gap-8 relative z-10 min-h-[140px]">
          <div className="flex flex-col items-center md:items-start gap-1 justify-center flex-1 min-w-[180px]">
            <img src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png" alt="Apple Haven Inn Logo" className="w-16 h-16 rounded-full shadow-md mb-1" />
            <span className="text-xl font-bold">Apple Haven Inn</span>
            <span className="text-sm text-gray-600">Reram Gulmarg, Kashmir Valley 193403</span>
            <span className="text-sm text-gray-600">📞 +91 194 xxx xxxx</span>
          </div>
          <div className="flex flex-col items-center gap-1 justify-center flex-1 min-w-[180px]">
            <span className="text-lg font-semibold mb-1">Follow Us</span>
            <div className="flex gap-3">
            <a 
              href="https://www.instagram.com/apple.haven.kashmir/" 
              target="_blank" 
              rel="noopener noreferrer"
                className="text-pink-600 hover:text-orange-500 transition-colors duration-200 bg-white rounded-full p-2 shadow hover:scale-110"
            >
                <Instagram className="w-7 h-7" />
            </a>
            <a 
              href="https://facebook.com/applehaveninn" 
              target="_blank" 
              rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-400 transition-colors duration-200 bg-white rounded-full p-2 shadow hover:scale-110"
            >
                <Facebook className="w-7 h-7" />
            </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1 justify-center flex-1 min-w-[180px]">
            <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Apple Haven Inn. All rights reserved.</span>
            <span className="text-xs text-gray-400">Designed with ❤️ in Kashmir</span>
          </div>
        </div>
      </footer>
    </div>
  )
}