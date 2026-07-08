'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isProjectCard, setIsProjectCard] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default to true for SSR

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check for mobile/touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isMobileScreen = window.innerWidth < 768 // Tailwind md breakpoint

    // Disable on mobile or touch devices
    if (isTouch || isMobileScreen) {
      setIsMobile(true)
      return
    }

    setIsMobile(false)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Check on every mouse move for more reliable detection
      const target = e.target as HTMLElement
      const isOverProjectCard = target.classList.contains('project-card') || target.closest('.project-card')

      if (isOverProjectCard) {
        setIsProjectCard(true)
        setIsHovering(true)
      } else {
        setIsProjectCard(false)
        // Check if hovering over other interactive elements
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('cursor-pointer')
        ) {
          setIsHovering(true)
        } else {
          setIsHovering(false)
        }
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // ✅ KEEP DEFAULT CURSOR - Don't hide it
    // The custom dot is an enhancement, not a replacement

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  // Don't render anything on mobile
  if (isMobile || !isVisible) return null

  return (
    <>
      {isProjectCard ? (
        // Link icon for project cards - Glassmorphism effect
        <motion.div
          key="project-cursor"
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="w-12 h-12 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg"
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          >
            <FiArrowUpRight className="w-6 h-6 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>
      ) : (
        // Regular cursor dot with blend mode
        <motion.div
          key="regular-cursor"
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isHovering ? 50 : 16,
              height: isHovering ? 50 : 16,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          />
        </motion.div>
      )}
    </>
  )
}
