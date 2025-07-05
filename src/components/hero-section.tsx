"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Award, Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  onBookingToggle: () => void
}

export function HeroSection({ onBookingToggle }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Heart className="w-5 h-5 text-red-300 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <Award className="w-7 h-7 text-orange-300 opacity-50" />
        </div>
      </div>

      {/* Location Badge */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-4 py-2 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          Srinagar, Kashmir Valley
        </Badge>
      </div>

      {/* Main Heading */}
      <div className="text-center z-10 relative max-w-6xl mx-auto">
        <div className={`mb-6 transition-all duration-1200 delay-300 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
          <div className="block relative mb-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white/95 tracking-wide leading-tight">
              Welcome to
            </h1>
          </div>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-6 my-6" aria-hidden="true">
            <span className="block h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/60 to-white/60 rounded-full" />
            <span className="text-yellow-300 text-2xl sm:text-4xl md:text-5xl animate-bounce-gentle">✦</span>
            <span className="block h-1 w-16 sm:w-24 bg-gradient-to-l from-transparent via-white/60 to-white/60 rounded-full" />
          </div>
          
          <div className="block mb-6">
            <h1 className="hero-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider drop-shadow-2xl">
              APPLE HAVEN
            </h1>
          </div>
          
          <div className="block">
            <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-white/90 italic">
              A home away from home in the heart of the valley
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Features - Removed 4.9 Rating */}
      <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <Award className="w-4 h-4 text-orange-300" />
          <span className="text-white text-sm font-medium">Premium Experience</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <Heart className="w-4 h-4 text-red-300 fill-current" />
          <span className="text-white text-sm font-medium">Authentic Kashmir</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
        <Button
          onClick={onBookingToggle}
          size="lg"
          className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
          aria-label="Book Your Stay"
        >
          Book Your Stay
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Gallery
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isVisible ? 'animate-bounce opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}