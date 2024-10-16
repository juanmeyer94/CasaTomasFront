'use client'

import { useState, useEffect } from 'react'
import ExitOfferCarousel from '../Components/carrousel/ExitOfferCarrousel'
export default function ExitIntentOfferModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only activate on desktop devices
      if (window.innerWidth > 1024 && e.clientY <= 0) {
        // 40% chance of showing the modal
        if (Math.random() < 0.20) {
          setIsOpen(true)
        }
      }
    }

    // Add the event listener
    document.addEventListener('mouseleave', handleMouseLeave)

    // Clean up the event listener
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ExitOfferCarousel />
      </div>
    </div>
  )
}