"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [slideOut, setSlideOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Optimized progress animation with fewer updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 25 + 10 // Faster increments
      })
    }, 80) // Reduced interval for smoother animation

    // Even faster slide out
    timeoutRef.current = setTimeout(() => {
      setSlideOut(true)
      setTimeout(() => {
        onFinish?.()
      }, 400)
    }, 1200) // Further reduced to 1.2s

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      clearInterval(progressInterval)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 z-[100] flex flex-col items-center justify-center loading-optimized">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`text-center ${slideOut ? "animate-slide-out-right" : "animate-scale-in"}`}>
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <Image
              src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png"
              alt="Apple Haven Inn Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-full shadow-2xl"
              priority
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Hotel Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-glow">
          Apple Haven Inn
        </h1>
        <p className="text-xl text-white/90 mb-8 font-medium">
          Kashmir Valley
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-sm mt-2 font-medium">
            Loading your Kashmir experience... {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Loading Text */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/70 text-sm">
          Preparing your journey to paradise
        </p>
      </div>
    </div>
  )
}