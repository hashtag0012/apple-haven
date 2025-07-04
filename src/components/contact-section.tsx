"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Plane } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

export function ContactSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/decorations/Screenshot 2025-06-25 010036 (1) (1) (1).png"
        alt="Contact Us Background"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0 opacity-30 animate-fade-in"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 ref={headingRef} className="text-5xl font-bold text-black mb-4 font-display">
            <MultiLineTypewriter lines={[{ text: "Contact Us", className: "" }]} />
          </h1>
          <p ref={descRef} className="text-xl text-gray-600 max-w-3xl mx-auto">
            <MultiLineTypewriter lines={[{ text: "For bookings, questions, or special requests, please reach out to us. We look forward to welcoming you!", className: "" }]} />
          </p>
        </div>

        {/* Centered Hotel Information */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* Hotel Information */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-red-800 text-center">Hotel Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Address</h3>
                  <p className="text-gray-600">
                    Apple Haven Inn
                    <br />
                    Reram Gulmarg, Kashmir Valley
                    <br />
                    Jammu & Kashmir 193403, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Phone</h3>
                  <p className="text-gray-600">+91 194 xxx xxxx</p>
                  <p className="text-gray-600">+91 194 xxx xxxy (Reservations)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Email</h3>
                  <p className="text-gray-600">applehavenkashmir@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Reception Hours</h3>
                  <p className="text-gray-600">24/7 Front Desk Service</p>
                  <p className="text-gray-600">Check-in: 2:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Here */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-red-800 text-center">Getting Here</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Plane className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">By Air</h3>
                  <p className="text-gray-600">
                    Srinagar Airport (SXR) - 56 km
                    <br />
                    Airport transfer available on request
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Car className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">By Road</h3>
                  <p className="text-gray-600">
                    From Srinagar: 56 km (1.5 hours)
                    <br />
                    From Jammu: 290 km (8 hours)
                    <br />
                    Free parking available
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 