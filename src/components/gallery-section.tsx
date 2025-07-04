"use client"

import { Image as ImageIcon } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.46_a6a10a9c.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.45_9ff550a7.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.37_64bdfa53.jpg",
  "/gallery/WhatsApp Image 2025-06-29 at 16.01.36_d868f42a.jpg",
];

export function GallerySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-red-100 flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-4xl font-bold text-red-700 mb-8">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {galleryImages.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  )
} 