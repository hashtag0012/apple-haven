"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { ArrowDown, Phone, Star } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

interface HeroSectionProps {
  onBookingToggle: () => void
}

export function HeroSection({ onBookingToggle }: HeroSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      {/* Location Badge */}
      <div className="mb-6">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          <MapPin className="w-4 h-4 mr-2" />
          Srinagar, Kashmir Valley
        </Badge>
      </div>

      {/* Main Heading */}
      <div className="text-center z-10 relative">
        <h1 ref={headingRef} className="mb-4 animate-fade-in">
          <span className="block relative">
            <MultiLineTypewriter
              lines={[
                { text: "Welcome to", className: "text-6xl md:text-8xl font-extrabold text-white/90 tracking-wide mb-2 glow-text" }
              ]}
              typeDelay={60}
              lineDelay={900}
            />
          </span>
          <span className="flex items-center justify-center gap-4 my-4" aria-hidden="true">
            <span className="block h-1 w-20 bg-white/40" />
            <span className="text-yellow-300 text-3xl md:text-5xl animate-bounce">✦</span>
            <span className="block h-1 w-20 bg-white/40" />
          </span>
          <span className="block">
            <MultiLineTypewriter
              lines={[
                { text: "APPLE HAVEN", className: "text-4xl md:text-6xl font-bold uppercase bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-lg mt-2 glow-text" }
              ]}
              typeDelay={60}
              lineDelay={900}
            />
          </span>
          <span className="block mt-6">
            <MultiLineTypewriter
              lines={[
                { text: "A home away from home in the heart of the valley.", className: "italic text-base md:text-xl text-white/80 glow-text" }
              ]}
              typeDelay={30}
              lineDelay={900}
            />
          </span>
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mb-12">
        <Button
          onClick={onBookingToggle}
          size="lg"
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg"
          aria-label="Book Your Stay"
        >
          Book Your Stay
        </Button>
      </div>

      {/* Heritage Badges - Removed */}

    </div>
  )
}
