'use client'

import { useState, useEffect, useRef } from 'react'
import ExitOfferCarousel from '../Components/carrousel/ExitOfferCarrousel'
export default function ExitIntentOfferModal() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

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

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        ref={modalRef}
        className="rounded-lg max-w-6xl w-full relative"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors z-20 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl"
          aria-label="Cerrar modal"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <ExitOfferCarousel />
      </div>
    </div>
  )
}