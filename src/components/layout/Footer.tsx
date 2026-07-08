'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { RiGithubLine, RiLinkedinLine, RiYoutubeLine, RiMailLine } from 'react-icons/ri'
import { personalInfo } from '@/lib/data'

// Translation cycling component
function TranslatingQuote({
  english,
  hindi,
  punjabi
}: {
  english: string
  hindi: string
  punjabi: string
}) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [cycleState, setCycleState] = useState<0 | 1>(0) // 0: next is hindi, 1: next is punjabi
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getTranslation = () => {
    return cycleState === 0 ? hindi : punjabi
  }

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Show translation after a brief delay (300ms)
    timeoutRef.current = setTimeout(() => {
      setShowTranslation(true)
    }, 300)
  }

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before translation shows
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Hide translation immediately
    if (showTranslation) {
      setShowTranslation(false)
      // Cycle to next language for next hover
      setCycleState((prev) => (prev === 0 ? 1 : 0))
    }
  }

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative text-lg md:text-xl font-inter font-light italic text-gray-700 dark:text-gray-300 cursor-pointer select-none transition-all duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* English text - fades when translation shows */}
      <motion.p
        animate={{
          opacity: showTranslation ? 0.2 : 1,
          y: showTranslation ? -5 : 0
        }}
        transition={{ duration: 0.4 }}
        className="font-light"
      >
        "{english}"
      </motion.p>

      {/* Translation - slides in below */}
      <AnimatePresence>
        {showTranslation && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4 }}
            className="text-base md:text-lg mt-1 font-inter font-extralight text-gray-600 dark:text-gray-400"
          >
            "{getTranslation()}"
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest)
    })
  }, [scrollYProgress])

  // Hide quotes during initial page load (zoom intro)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 3000) // Hide quotes for first 3 seconds (zoom intro duration)

    return () => clearTimeout(timer)
  }, [])

  // Animate "AA" and "SH" moving towards "KA"
  // When scrollProgress = 0, AA is below, when = 1, AA combines with KA
  const aaTranslateY = useTransform(scrollYProgress, [0, 0.8], [200, 0])
  const shTranslateY = useTransform(scrollYProgress, [0, 0.8], [200, 0])
  const aaOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.5, 1])
  const shOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.5, 1])

  // Hide AAKASH text completely when not in footer section
  const aakashContainerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // Quote opacity - fades in after letters settle - starts hidden AND waits for initial load
  const baseQuoteOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.8], [0, 0, 0, 1])

  // Combine with initial load state - quotes only appear after zoom intro is done
  const [quoteOpacity, setQuoteOpacity] = useState(0)

  useEffect(() => {
    if (isInitialLoad) {
      setQuoteOpacity(0)
    } else {
      const unsubscribe = baseQuoteOpacity.on('change', (v) => setQuoteOpacity(v))
      return unsubscribe
    }
  }, [isInitialLoad, baseQuoteOpacity])

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Giant AAKASH Text Background - Fixed Position */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none z-0 pb-20 md:pb-24"
        style={{ opacity: aakashContainerOpacity }}
      >
        <div className="relative flex items-center justify-center">
          {/* AA - Animates from bottom */}
          <motion.span
            style={{
              y: aaTranslateY,
              opacity: aaOpacity
            }}
            className="text-[15vw] md:text-[20vw] font-black text-black dark:text-white leading-none"
          >
            AA
          </motion.span>

          {/* KA - Always fixed in center - Completely black */}
          <span className="text-[15vw] md:text-[20vw] font-black text-black dark:text-white leading-none">
            KA
          </span>

          {/* SH - Animates from bottom */}
          <motion.span
            style={{
              y: shTranslateY,
              opacity: shOpacity
            }}
            className="text-[15vw] md:text-[20vw] font-black text-black dark:text-white leading-none"
          >
            SH
          </motion.span>
        </div>
      </motion.div>

      {/* Inspirational Quotes - Above AAKASH text */}
      <motion.div
        className="fixed top-[18%] md:top-[15%] left-0 right-0 flex items-center justify-center z-20 px-8 pointer-events-none"
        style={{ opacity: quoteOpacity }}
        animate={{ opacity: quoteOpacity }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-3 pointer-events-auto">
          <TranslatingQuote
            english="Talent is God given, be Humble"
            hindi="प्रतिभा ईश्वर प्रदत्त है, विनम्र रहें।"
            punjabi="ਪ੍ਰਤਿਭਾ ਈਸ਼ਵਰ ਪ੍ਰਦੱਤ ਹੈ, ਨਿਮਰ ਰਹੋ।"
          />
          <TranslatingQuote
            english="Fame is man given, be Thankful"
            hindi="प्रसिद्धि मनुष्य प्रदत्त है, आभारी रहें।"
            punjabi="ਪ੍ਰਸਿੱਧੀ ਮਨੁੱਖ ਪ੍ਰਦੱਤ ਹੈ, ਆਭਾਰੀ ਰਹੋ।"
          />
          <TranslatingQuote
            english="Concentration is self given, be very very Careful"
            hindi="एकाग्रता स्वयं प्रदत्त है, अत्यंत सावधान रहें।"
            punjabi="ਏਕਾਗ੍ਰਤਾ ਆਪ ਪ੍ਰਦੱਤ ਹੈ, ਬਹੁਤ ਸਾਵਧਾਨ ਰਹੋ।"
          />
          <TranslatingQuote
            english="Motivation is temporary but Discipline is permanent"
            hindi="प्रेरणा अस्थायी है, पर अनुशासन स्थायी है।"
            punjabi="ਪ੍ਰੇਰਣਾ ਅਸਥਾਈ ਹੈ, ਪਰ ਅਨੁਸ਼ਾਸਨ ਸਥਾਈ ਹੈ।"
          />
          <TranslatingQuote
            english="Nobody is perfect in this world, you must learn and keep move forward"
            hindi="इस संसार में कोई भी पूर्ण नहीं है; आपको निरंतर सीखते हुए आगे बढ़ते रहना चाहिए।"
            punjabi="ਇਸ ਸੰਸਾਰ ਵਿੱਚ ਕੋਈ ਵੀ ਪੂਰਨ ਨਹੀਂ ਹੈ; ਤੁਹਾਨੂੰ ਨਿਰੰਤਰ ਸਿੱਖਦੇ ਹੋਏ ਅੱਗੇ ਵੱਧਦੇ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ।"
          />
          <TranslatingQuote
            english="All fame reaches God and God is great."
            hindi="सारी प्रसिद्धि ईश्वर तक पहुँचती है, और ईश्वर महान है।"
            punjabi="ਸਾਰੀ ਪ੍ਰਸਿੱਧੀ ਈਸ਼ਵਰ ਤੱਕ ਪਹੁੰਚਦੀ ਹੈ, ਅਤੇ ਈਸ਼ਵਰ ਮਹਾਨ ਹੈ।"
          />
        </div>
      </motion.div>

      {/* Footer Content - Minimal - At Very Bottom */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-end"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1])
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-4">
          {/* Bottom Bar - Only this remains */}
          <div className="flex flex-row justify-center items-center gap-6">
            <p className="font-inter font-extralight text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <RiGithubLine className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <RiLinkedinLine className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <RiYoutubeLine className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <RiMailLine className="w-5 h-5" />
              </a>
            </div>

            <p className="font-inter font-extralight text-gray-600 dark:text-gray-400 text-sm">
              Designed & Built by{' '}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-900 dark:text-white font-semibold hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
              >
                {personalInfo.shortName}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-500 ease-out"></span>
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
