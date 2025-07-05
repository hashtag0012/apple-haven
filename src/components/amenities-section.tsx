"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Wifi,
  UtensilsCrossed,
  ParkingCircle,
  ConciergeBell,
  Sun,
  Wind,
  Tv,
  Leaf,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function AmenitiesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const amenities = [
    { icon: <Wifi className="w-8 h-8 text-blue-500" />, title: "High-Speed Wi-Fi" },
    { icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />, title: "Kashmiri Cuisine" },
    { icon: <ParkingCircle className="w-8 h-8 text-gray-500" />, title: "24/7 Free Parking" },
    { icon: <ConciergeBell className="w-8 h-8 text-purple-500" />, title: "Staff Available 24/7" },
    { icon: <Wind className="w-8 h-8 text-teal-500" />, title: "Central Heating" },
    { icon: <Tv className="w-8 h-8 text-indigo-500" />, title: "HD TV in Every Room" },
    { icon: <Sun className="w-8 h-8 text-yellow-500" />, title: "Solar Powered" },
    { icon: <Leaf className="w-8 h-8 text-green-500" />, title: "Organic Farm" },
    { icon: <Sparkles className="w-8 h-8 text-blue-400" />, title: "Sanitized Rooms" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the card animations
            amenities.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/decorations/Screenshot 2025-06-25 005150.png"
          alt="Amenities Background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0 opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 animate-fade-in-up">
            Amenities & Services
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Enjoy a range of amenities designed for your comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {amenities.map((amenity, index) => (
            <Card 
              key={index} 
              className={`card-hover flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                visibleCards.includes(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                {amenity.icon}
              </div>
              <p className="font-semibold text-lg text-gray-800 text-center">{amenity.title}</p>
            </Card>
          ))}
        </div>

        {/* Enhanced Orchard Experience Card */}
        <Card className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 border-0 shadow-2xl p-8 max-w-4xl mx-auto mt-8 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-float"></div>
            <div className="absolute top-12 right-8 w-6 h-6 bg-yellow-300 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-12 w-10 h-10 bg-green-300 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Decorative Apple Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Apple Handpicking & Orchard Experience
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <p className="text-lg text-white/95 mb-6 text-center leading-relaxed">
              During apple season, guests are invited to enjoy fresh fruits served daily and can join our staff for a magical hand-picking experience in the nearby orchard. The best time to visit is during the harvest, when the air is filled with the scent of ripe apples—an enchanting experience unique to our hotel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Guided hand-picking in our orchard</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Fresh fruits served daily during the season</span>
                </li>
              </ul>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Learn about local apple varieties & traditions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Perfect for families & nature lovers</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}