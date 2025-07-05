"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const galleryImages = [
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.46_a6a10a9c.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.45_9ff550a7.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.37_64bdfa53.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.36_d868f42a.jpg",
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
              }, index * 200)
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover the beauty of Kashmir through our curated collection of moments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                visibleImages.includes(i) ? 'animate-scale-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="image-hover relative h-64 sm:h-72 lg:h-80">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">Kashmir Beauty</h3>
                  <p className="text-sm text-gray-200">Experience the magic</p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-lg text-gray-600 mb-6">Want to see more? Visit us and create your own memories!</p>
          <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Plan Your Visit
          </button>
        </div>
      </div>
    </section>
  )
}