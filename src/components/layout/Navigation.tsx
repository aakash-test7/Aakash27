'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { RiGithubLine, RiLinkedinLine, RiYoutubeLine } from 'react-icons/ri'
import { IoDocumentText, IoDocumentTextOutline } from 'react-icons/io5'
import { useTheme } from 'next-themes'
import { scrollToSection } from '@/lib/utils'
import { personalInfo } from '@/lib/data'

const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
]

// Helper function to interpolate between two values based on progress (0 to 1)
const interpolate = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      const scrollY = window.scrollY

      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop
        // Calculate progress from 0 to 1, completes when About section appears
        const progress = Math.min(Math.max(scrollY / aboutTop, 0), 1)
        setScrollProgress(progress)
      } else {
        // Fallback if about section not found (completes at 800px)
        const progress = Math.min(Math.max(scrollY / 800, 0), 1)
        setScrollProgress(progress)
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setIsOpen(false)
  }

  // Calculate all dynamic values based on scroll progress (0 to 1)
  const dynamicWidth = interpolate(100, 60, scrollProgress) // 100% → 60%
  const dynamicPaddingX = interpolate(48, 32, scrollProgress) // 48px → 32px  
  const dynamicPaddingY = interpolate(24, 12, scrollProgress) // 24px → 12px
  const dynamicBorderRadius = interpolate(0, 9999, scrollProgress) // 0 → 9999px (pill)
  const dynamicTop = interpolate(0, 16, scrollProgress) // 0px → 16px
  const dynamicLogoSize = interpolate(28, 22, scrollProgress) // 36px → 22px
  const dynamicNavFontSize = interpolate(16, 14, scrollProgress) // 18px → 14px
  const dynamicNavGap = interpolate(8, 4, scrollProgress) // 8px → 4px
  const dynamicIconSize = interpolate(20, 18, scrollProgress) // 20px → 18px
  const dynamicIconGap = interpolate(12, 8, scrollProgress) // 20px → 8px (increased top gap)
  const dynamicMaxWidth = interpolate(1280, 1100, scrollProgress) // max-w-7xl → reduced

  // Dynamic positioning and styling - PROPER CENTERING
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
    boxSizing: 'border-box',
  }

  // Separate positioning styles to avoid conflicts
  const scrolledPositionStyle: React.CSSProperties = scrollProgress > 0.10
    ? {
      // SCROLLED STATE - centered pill
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: `${dynamicWidth}vw`,
      maxWidth: `${dynamicMaxWidth}px`,
      paddingLeft: `${dynamicPaddingX}px`,
      paddingRight: `${dynamicPaddingX}px`,
      paddingTop: `${dynamicPaddingY}px`,
      paddingBottom: `${dynamicPaddingY}px`,
    }
    : {
      // TOP STATE - full-width
      left: 0,
      right: 0,
      width: '100%',
      paddingLeft: `${dynamicPaddingX}px`,
      paddingRight: `${dynamicPaddingX}px`,
      paddingTop: `${dynamicPaddingY}px`,
      paddingBottom: `${dynamicPaddingY}px`,
    }

  const combinedNavStyle = { ...navStyle, ...scrolledPositionStyle }

  return (
    <>
      {/* Desktop Navbar with Progressive Transformation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          top: dynamicTop,
          borderRadius: dynamicBorderRadius,
        }}
        transition={{
          y: { duration: 0.5, ease: 'easeOut' },
          opacity: { duration: 0.5, ease: 'easeOut' },
          top: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
          borderRadius: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        }}
        style={combinedNavStyle}
        className={`
          hidden lg:block
          backdrop-blur-xl
          ${scrollProgress === 0
            ? 'bg-white/50 dark:bg-gray-900/50 border-b border-white/20 dark:border-gray-700/20 shadow-lg shadow-black/5'
            : 'bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/30 shadow-xl shadow-black/10'
          }
        `}
      >
        <div className={scrollProgress === 0 ? 'max-w-7xl mx-auto' : ''}>
          <nav className="flex items-center justify-between w-full">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('hero')}
              style={{
                fontSize: `${dynamicLogoSize}px`,
              }}
              className="font-bold bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300
                     bg-clip-text text-transparent
                     hover:scale-105 focus:outline-none focus-visible:ring-2 
                     focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 rounded-lg
                     transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {personalInfo.shortName}
            </motion.button>

            {/* Navigation Links */}
            <ul
              style={{
                fontSize: `${dynamicNavFontSize}px`,
                gap: `${dynamicNavGap}px`,
              }}
              className="flex items-center"
            >
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`
                    relative px-4 py-2 rounded-full
                    transition-all duration-200
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    focus:outline-none focus-visible:ring-2 
                    focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2
                    ${activeSection === item.id
                        ? 'text-black dark:text-white font-semibold'
                        : 'text-gray-700 dark:text-gray-300'
                      }
                  `}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div
              style={{
                gap: `${dynamicIconGap}px`,
              }}
              className="flex items-center"
            >
              <motion.a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-black dark:focus-visible:ring-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <RiGithubLine size={18} />
              </motion.a>
              <motion.a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-black dark:focus-visible:ring-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <RiLinkedinLine size={18} />
              </motion.a>
              <motion.a
                href={personalInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-black dark:focus-visible:ring-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="YouTube"
              >
                <RiYoutubeLine size={18} />
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1NxHYh5jwY4EMHlYqW9lSG7sAh5cXVDss/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-black dark:focus-visible:ring-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Resume"
              >
                {mounted && theme === 'dark' ? <IoDocumentTextOutline size={18} /> : <IoDocumentText size={18} />}
              </motion.a>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Floating Theme Toggle - Desktop Only */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          top: scrollProgress === 0 ? 20 : dynamicTop + 12,
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          scale: { duration: 0.5, delay: 0.3 },
          top: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="hidden lg:flex fixed right-6 z-50 w-12 h-12 items-center justify-center rounded-full 
                   bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                   border border-white/20 dark:border-gray-700/30
                   text-gray-700 dark:text-gray-300 
                   hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                   shadow-xl shadow-black/10 hover:shadow-2xl
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white
                   transition-colors duration-300"
        whileHover={{ scale: 1.15, rotate: 360 }}
        whileTap={{
          scale: 0.85,
          rotate: 360,
          transition: {
            rotate: { duration: 0.6, ease: "easeInOut" },
            scale: { duration: 0.15 }
          }
        }}
        aria-label="Toggle theme"
        style={{
          filter: 'drop-shadow(0 0 0px transparent)',
        }}
      >
        {mounted && (
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 0px transparent)',
                'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
                'drop-shadow(0 0 0px transparent)',
              ],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.div>
        )}
      </motion.button>

      {/* Mobile/Tablet Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 
          lg:hidden
          transition-all duration-300
          ${scrollProgress > 0.1
            ? 'bg-white dark:bg-gray-900 shadow-md'
            : 'bg-white dark:bg-gray-900'
          }
          border-b border-gray-200 dark:border-gray-800
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="text-xl font-bold bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300
                       bg-clip-text text-transparent
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-black dark:focus-visible:ring-white rounded-lg"
            >
              {personalInfo.shortName}
            </button>

            {/* Mobile Theme Toggle & Animated Menu Button */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                         focus:outline-none focus-visible:ring-2 
                         focus-visible:ring-black dark:focus-visible:ring-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {mounted && (
                  theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />
                )}
              </motion.button>

              {/* Animated Two-Line to X Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center rounded-full bg-black dark:bg-white
                         hover:scale-105 transition-transform duration-200
                         focus:outline-none focus-visible:ring-2 
                         focus-visible:ring-black dark:focus-visible:ring-white"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="w-6 h-5 flex flex-col justify-center items-center">
                  {/* First line */}
                  <motion.span
                    animate={isOpen ? {
                      rotate: 45,
                      y: 4,
                    } : {
                      rotate: 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-6 h-0.5 bg-white dark:bg-black rounded-full block"
                    style={{ transformOrigin: 'center' }}
                  />
                  {/* Second line */}
                  <motion.span
                    animate={isOpen ? {
                      rotate: -45,
                      y: -4,
                    } : {
                      rotate: 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-6 h-0.5 bg-white dark:bg-black rounded-full block mt-2"
                    style={{ transformOrigin: 'center' }}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Backdrop Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            />
          )}
        </AnimatePresence>

        {/* Floating Menu Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 right-4 z-50 w-64 bg-white dark:bg-gray-900 
                       rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800
                       overflow-hidden"
            >
              {/* Menu Items */}
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg text-base
                      transition-all duration-200
                      ${activeSection === item.id
                        ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Social Icons */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center space-x-4">
                  <motion.a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub"
                  >
                    <RiGithubLine size={18} />
                  </motion.a>
                  <motion.a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn"
                  >
                    <RiLinkedinLine size={18} />
                  </motion.a>
                  <motion.a
                    href={personalInfo.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="YouTube"
                  >
                    <RiYoutubeLine size={18} />
                  </motion.a>
                  <motion.a
                    href="https://drive.google.com/file/d/1NxHYh5jwY4EMHlYqW9lSG7sAh5cXVDss/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Resume"
                  >
                    {mounted && theme === 'dark' ? <IoDocumentTextOutline size={18} /> : <IoDocumentText size={18} />}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
