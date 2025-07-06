"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Camera, Image as ImageIcon, Aperture, Focus } from "lucide-react"

const galleryImages = [
  {
    src: "/gallery/WhatsApp Image 2025-06-29 at 16.01.46_a6a10a9c.jpg",
    title: "Front View of Cottage",
    description: "Beautiful front facade of Apple Haven Inn"
  },
  {
    src: "/gallery/WhatsApp Image 2025-06-29 at 16.01.45_9ff550a7.jpg", 
    title: "Welcome Refreshments",
    description: "Coffee, sugar and tea bottles arrangement"
  },
  {
    src: "/gallery/WhatsApp Image 2025-06-29 at 16.01.37_64bdfa53.jpg",
    title: "Garden Flowers",
    description: "Beautiful flowers in our garden"
  },
  {
    src: "/gallery/WhatsApp Image 2025-06-29 at 16.01.36_d868f42a.jpg",
    title: "Side View of Cottage", 
    description: "Scenic side view of the cottage"
  },
];

export function GallerySection() {
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            galleryImages.forEach((_, index) => {
              setTimeout(() => {
                setVisibleImages(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden min-h-[700px]">
      {/* Enhanced Camera-themed Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900"></div>
        
        {/* Camera lens effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-8 border-white/10 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-white/5 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-white/5 opacity-40"></div>
        
        {/* Floating camera elements */}
        <div className="absolute top-20 left-20 opacity-10">
          <Camera className="w-16 h-16 text-white animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute top-32 right-32 opacity-10">
          <Aperture className="w-12 h-12 text-white animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        </div>
        <div className="absolute bottom-40 left-40 opacity-10">
          <Focus className="w-14 h-14 text-white animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <ImageIcon className="w-10 h-10 text-white animate-bounce" style={{ animationDelay: '3s', animationDuration: '2.8s' }} />
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-6 transform transition-all duration-500 opacity-100 translate-y-0">
            Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto transform transition-all duration-700 opacity-100 translate-y-0" style={{ transitionDelay: '0.1s' }}>
            Capturing the essence of Kashmir through our lens
          </p>
          
          {/* Camera-themed subtitle */}
          <div className="flex items-center justify-center gap-4 mt-6 transform transition-all duration-700 opacity-100 translate-y-0" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Professional Photography</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Aperture className="w-4 h-4 text-white" />
              <span className="text-white text-sm">High Resolution</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                visibleImages.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="image-hover relative h-64 sm:h-72 lg:h-80">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Enhanced overlay with camera effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Camera shutter effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                  </div>
                </div>
                
                {/* Hover Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200 flex items-center gap-2">
                    <Camera className="w-3 h-3" />
                    {image.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16 transform transition-all duration-700 opacity-100 translate-y-0" style={{ transitionDelay: '0.5s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Create Your Own Memories</h3>
            </div>
            <p className="text-lg text-gray-200 mb-6">
              Every corner of our hotel offers a perfect photo opportunity. Visit us and capture your own Kashmir story!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Plan Your Visit
              </button>
              <button className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                View More Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}