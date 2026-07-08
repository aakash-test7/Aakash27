'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin, FiAward, FiExternalLink } from 'react-icons/fi'
import { education } from '@/lib/data'

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="experience" className="section-container bg-white dark:bg-gray-950">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Education & <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black to-gray-700 dark:from-white dark:to-gray-300" />

            {/* Timeline Items */}
            {education.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-4 border-white dark:border-gray-950 transform -translate-x-1/2 z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}>
                  <div className="glass-effect rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-2">
                      <FiCalendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {item.degree}
                    </h3>

                    {item.field && (
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                        {item.field}
                      </p>
                    )}

                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 mb-3">
                      <FiMapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        {item.institution}, {item.location}
                      </p>
                    </div>

                    {(item.cgpa || item.percentage) && (
                      <div className="mb-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          {item.cgpa ? `CGPA: ${item.cgpa}` : `${item.percentage}`}
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>
                    )}

                    {item.activities && item.activities.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                          <FiAward className="w-4 h-4" />
                          <span className="text-sm font-medium">Activities & Achievements</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {item.activities.map((activity, actIndex) => (
                            <li key={actIndex}>
                              {typeof activity === 'string' ? (
                                activity
                              ) : (
                                <>
                                  {activity.main}
                                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                    {activity.sub.map((subItem: string, subIndex: number) => (
                                      <li key={subIndex}>{subItem}</li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Experience Placeholder */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Currently seeking opportunities to apply my skills in AI, Machine Learning, and Cloud Engineering.
              Open to internships and full-time positions.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
