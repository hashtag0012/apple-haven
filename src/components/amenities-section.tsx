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
import { useRef } from "react"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

export function AmenitiesSection() {
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

  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/decorations/Screenshot 2025-06-25 005150.png"
          alt="Amenities Background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0 opacity-20 animate-fade-in"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div ref={headingRef} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            <MultiLineTypewriter lines={[{ text: "Amenities & Services", className: "" }]} />
          </div>
          <div ref={descRef} className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            <MultiLineTypewriter lines={[{ text: "Enjoy a range of amenities designed for your comfort and convenience.", className: "" }]} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {amenities.map((amenity, index) => (
            <Card key={index} className="flex flex-col items-center p-6 bg-white/80 border-0 shadow-md">
              <div className="mb-4">{amenity.icon}</div>
              <p className="font-semibold text-lg text-gray-800 text-center">{amenity.title}</p>
            </Card>
          ))}
        </div>
        <Card className="relative bg-gradient-to-br from-green-50 to-yellow-50 border-4 border-yellow-400 shadow-2xl p-8 max-w-3xl mx-auto mt-8 overflow-hidden">
          {/* Decorative Apple/Orchard Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <Sparkles className="w-16 h-16 text-yellow-300 drop-shadow-lg" />
          </div>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-green-900 mb-2 text-center drop-shadow-lg">
              <span className="text-red-700">Apple</span> Handpicking & <span className="text-green-700">Orchard</span> Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-800 mb-6 text-center italic">
              <span className="font-semibold text-green-800">During apple season</span>, guests are invited to enjoy <span className="text-red-700 font-semibold">fresh fruits</span> served daily and can join our staff for a magical <span className="text-green-700 font-semibold">hand-picking experience</span> in the nearby orchard.<br />
              <span className="text-yellow-700">The best time to visit is during the harvest</span>, when the air is filled with the scent of ripe apples—an enchanting experience unique to our hotel.
            </p>
            <ul className="list-disc pl-8 text-gray-800 space-y-2 text-base">
              <li><span className="font-semibold text-red-700">Guided hand-picking</span> in our orchard</li>
              <li><span className="font-semibold text-green-700">Fresh fruits</span> served daily during the season</li>
              <li><span className="font-semibold text-yellow-700">Learn about local apple varieties & traditions</span></li>
              <li><span className="font-semibold text-green-800">Perfect for families & nature lovers</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}