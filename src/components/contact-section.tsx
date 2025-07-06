"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Plane, Star, Heart, MessageCircle, Users, Headphones } from "lucide-react"
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
      { threshold: 0.1, rootMargin: '20px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Enhanced Background with People Contacting Theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        
        {/* Animated Communication Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <MessageCircle className="w-12 h-12 text-blue-300 opacity-20" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
            <Phone className="w-10 h-10 text-green-300 opacity-25" />
          </div>
          <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <Mail className="w-14 h-14 text-yellow-300 opacity-20" />
          </div>
          <div className="absolute top-60 left-1/2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }}>
            <Users className="w-16 h-16 text-purple-300 opacity-15" />
          </div>
          <div className="absolute bottom-40 right-32 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}>
            <Headphones className="w-11 h-11 text-pink-300 opacity-20" />
          </div>
        </div>

        {/* Communication Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-white animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full border-2 border-blue-300 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-purple-300 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 font-display transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Contact Us
          </h1>
          <p className={`text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '0.1s' }}>
            For bookings, questions, or special requests, please reach out to us. We look forward to welcoming you to paradise!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hotel Information */}
          <Card className={`card-hover shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`} style={{ transitionDelay: '0.2s' }}>
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
          <Card className={`card-hover shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '0.3s' }}>
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
        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '0.4s' }}>
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