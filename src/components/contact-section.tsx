"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Plane, Star, Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
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
    <div ref={sectionRef} className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/decorations/Screenshot 2025-06-25 010036 (1) (1) (1).png"
          alt="Contact Us Background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0 opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/40" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Star className="w-8 h-8 text-yellow-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Heart className="w-6 h-6 text-red-300 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
          <MapPin className="w-7 h-7 text-blue-300 opacity-40" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 font-display transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}>
            Contact Us
          </h1>
          <p className={`text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}>
            For bookings, questions, or special requests, please reach out to us. We look forward to welcoming you to paradise!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hotel Information */}
          <Card className={`card-hover shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0'
          }`}>
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Hotel Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 text-lg mb-2">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Apple Haven Inn<br />
                    Reram Gulmarg, Kashmir Valley<br />
                    Jammu & Kashmir 193403, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg mb-2">Phone</h3>
                  <p className="text-gray-600">+91 194 xxx xxxx</p>
                  <p className="text-gray-600">+91 194 xxx xxxy (Reservations)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg mb-2">Email</h3>
                  <p className="text-gray-600">applehavenkashmir@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 text-lg mb-2">Reception Hours</h3>
                  <p className="text-gray-600">24/7 Front Desk Service</p>
                  <p className="text-gray-600">Check-in: 2:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Here */}
          <Card className={`card-hover shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-1000 delay-600 ${
            isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0'
          }`}>
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Car className="w-6 h-6" />
                Getting Here
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg mb-2">By Air</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Srinagar Airport (SXR) - 56 km<br />
                    Airport transfer available on request<br />
                    <span className="text-green-600 font-medium">Complimentary pickup for 3+ night stays</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                  <Car className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg mb-2">By Road</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From Srinagar: 56 km (1.5 hours)<br />
                    From Jammu: 290 km (8 hours)<br />
                    <span className="text-blue-600 font-medium">Free secure parking available</span>
                  </p>
                </div>
              </div>

              {/* Special Features */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">Special Services</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 24/7 concierge assistance</li>
                  <li>• Local tour arrangements</li>
                  <li>• Traditional welcome ceremony</li>
                  <li>• Multilingual staff support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience Kashmir?</h3>
            <p className="text-gray-200 mb-6">Contact us today to plan your perfect getaway in the heart of paradise.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Book Now
              </button>
              <button className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}