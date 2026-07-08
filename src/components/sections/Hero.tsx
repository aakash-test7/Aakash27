'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiChevronDown } from 'react-icons/fi'
import { personalInfo } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Layers with Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black animate-gradient"
          style={{ backgroundSize: '400% 400%' }}
        />
      </motion.div>

      {/* Geometric Shapes - Parallax Layer 2 */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-gray-900/10 dark:bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-black/10 dark:bg-gray-200/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-800/5 to-black/5 dark:from-white/5 dark:to-gray-300/5 rounded-full blur-3xl animate-spin-slow" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: y3, opacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 md:pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-bold mb-6">
            <span className="inline-block">
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {personalInfo.name}
              </motion.span>
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-gray-600 dark:text-gray-400">
              <span className="gradient-text font-bold">
                I build AI that ships.
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 font-orbitron"
        >
          <span>Anything </span>
          <TypeAnimation
            sequence={[
              'Gen AI ',
              2000,
              'Software Logics ',
              2000,
              'Cloud Engineering ',
              2000,
              'Machine Learning ',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="gradient-text font-bold"
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <FiChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Wave SVG at bottom with Parallax */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
      >
        <svg
          className="w-full h-24 sm:h-32 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="50%" stopColor="rgba(100,100,100,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="50%" stopColor="rgba(150,150,150,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.07)" />
              <stop offset="50%" stopColor="rgba(200,200,200,0.07)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.07)" />
            </linearGradient>
            <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="50%" stopColor="rgba(220,220,220,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
            </linearGradient>
            <linearGradient id="waveGradientDark1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="50%" stopColor="rgba(200,200,200,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
            </linearGradient>
            <linearGradient id="waveGradientDark2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(180,180,180,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            <linearGradient id="waveGradientDark3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
              <stop offset="50%" stopColor="rgba(150,150,150,0.07)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.07)" />
            </linearGradient>
            <linearGradient id="waveGradientDark4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="50%" stopColor="rgba(120,120,120,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {/* Light mode waves */}
          <g className="dark:hidden">
            <use href="#wave" x="48" y="0" fill="url(#waveGradient1)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="-352 0"
                to="0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="0" fill="url(#waveGradient1)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="352 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="3" fill="url(#waveGradient2)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="-352 0"
                to="0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="3" fill="url(#waveGradient2)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="352 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="5" fill="url(#waveGradient3)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="352 0"
                to="0 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="5" fill="url(#waveGradient3)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="-352 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="7" fill="url(#waveGradient4)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="352 0"
                to="0 0"
                dur="21s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="7" fill="url(#waveGradient4)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="-352 0"
                dur="21s"
                repeatCount="indefinite"
              />
            </use>
          </g>
          {/* Dark mode waves */}
          <g className="hidden dark:block">
            <use href="#wave" x="48" y="0" fill="url(#waveGradientDark1)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="-352 0"
                to="0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="0" fill="url(#waveGradientDark1)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="352 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="3" fill="url(#waveGradientDark2)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="-352 0"
                to="0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="3" fill="url(#waveGradientDark2)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="352 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="5" fill="url(#waveGradientDark3)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="352 0"
                to="0 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="5" fill="url(#waveGradientDark3)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="-352 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" x="48" y="7" fill="url(#waveGradientDark4)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="352 0"
                to="0 0"
                dur="21s"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" x="48" y="7" fill="url(#waveGradientDark4)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="-352 0"
                dur="21s"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </motion.div>
    </section>
  )
}
