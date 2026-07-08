'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FiMapPin, FiMail, FiBook, FiCode, FiDatabase, FiBriefcase } from 'react-icons/fi'
import { personalInfo } from '@/lib/data'
import { withBasePath } from '@/lib/utils'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="section-container bg-white dark:bg-gray-950">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content - Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Image takes full height */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative group"
          >
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-2xl">
              {/* Profile Image */}
              <Image
                src={withBasePath('/images/profile.jpg')}
                alt={personalInfo.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
                priority
              />

              {/* Subtle overlay that fades on hover */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />

              {/* Decorative border that appears on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-gray-900 dark:group-hover:border-white transition-all duration-700 rounded-2xl opacity-0 group-hover:opacity-20" />
            </div>
          </motion.div>

          {/* Right Column - Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
            {/* Title Card - Spans full width */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-100"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black leading-tight mb-3">
                Machine Learning & AI Engineer
              </h3>
              <p className="text-gray-300 dark:text-gray-700 leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center mb-4">
                <FiMapPin className="w-6 h-6 text-white dark:text-black" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{personalInfo.location}</p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center mb-4">
                <FiMail className="w-6 h-6 text-white dark:text-black" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg break-all">{personalInfo.email}</p>
            </motion.div>

            {/* Education Card - Spans full width */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                  <FiBook className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Education</p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{personalInfo.degree}</p>
                </div>
              </div>
            </motion.div>

            {/* Tagline Card - Spans full width */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-900 dark:border-white"
            >
              <p className="text-2xl font-orbitron font-bold gradient-text text-center">
                "प्रौद्योगिकी संकल्प" - Creating TechWill
              </p>
            </motion.div>
          </div>
        </div>

        {/* Expertise Section - Full Width Below */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center mb-6">
              <FiCode className="w-7 h-7 text-white dark:text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Machine Learning
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Building intelligent systems with cutting-edge ML algorithms and deep learning frameworks
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center mb-6">
              <FiDatabase className="w-7 h-7 text-white dark:text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Data Science
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Transforming raw data into actionable insights through advanced analytics and visualization
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center mb-6">
              <FiBriefcase className="w-7 h-7 text-white dark:text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Research & Innovation
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Exploring novel approaches to solve complex problems in AI and computational biology
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
