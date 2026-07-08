'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  FaPython,
  FaHtml5,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaApple,
  FaWindows,
  FaComments,
  FaChartLine,
} from 'react-icons/fa'
import {
  SiCplusplus,
  SiMysql,
  SiR,
  SiGooglecloud,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiStreamlit,
  SiSelenium,
} from 'react-icons/si'
import { MdRemoveRedEye, MdChatBubble, MdCloud, MdCode } from 'react-icons/md'
import { LuBrainCircuit } from 'react-icons/lu'
import { skills } from '@/lib/data'

const iconMap: Record<string, any> = {
  FaPython: FaPython,
  SiCplusplus: SiCplusplus,
  SiMysql: SiMysql,
  FaHtml5: FaHtml5,
  SiR: SiR,
  SiGooglecloud: SiGooglecloud,
  MdCloud: MdCloud,
  FaDocker: FaDocker,
  SiKubernetes: SiKubernetes,
  SiTensorflow: SiTensorflow,
  SiPytorch: SiPytorch,
  MdRemoveRedEye: MdRemoveRedEye,
  MdChatBubble: MdChatBubble,
  LuBrainCircuit: LuBrainCircuit,
  FaComments: FaComments,
  FaChartLine: FaChartLine,
  SiStreamlit: SiStreamlit,
  SiSelenium: SiSelenium,
  MdCode: MdCode,
  FaGitAlt: FaGitAlt,
  FaLinux: FaLinux,
  FaApple: FaApple,
  FaWindows: FaWindows,
}

// Flatten all skills into rows
const allSkills = [
  ...skills.development,
  ...skills.cloudDevOps,
  ...skills.aiDataScience,
  ...skills.toolsOS,
]

// Create rows with different skill distributions
const createRows = () => {
  const rows: any[] = []
  let currentIndex = 0
  const rowSizes = [12, 11, 12] // 3 balanced rows

  rowSizes.forEach((size) => {
    rows.push(allSkills.slice(currentIndex, currentIndex + size))
    currentIndex += size
  })

  return rows
}

const skillRows = createRows()

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-container bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 mx-auto rounded-full" />
      </motion.div>

      {/* Parallax Skill Rows */}
      <div className="space-y-6 max-w-7xl mx-auto">
        {skillRows.map((row, rowIndex) => {
          // Alternate direction: even rows left-to-right, odd rows right-to-left
          const direction = rowIndex % 2 === 0 ? 1 : -1

          // Create parallax effect based on scroll
          const x = useTransform(
            scrollYProgress,
            [0, 1],
            [direction * -100, direction * 100]
          )

          return (
            <motion.div
              key={rowIndex}
              style={{ x }}
              className="flex gap-4 justify-center flex-wrap px-4"
            >
              {row.map((skill: any, skillIndex: number) => {
                const Icon = iconMap[skill.icon]

                // Larger sizes for bigger pills
                const sizes = [
                  'px-8 py-4 text-lg',
                  'px-10 py-5 text-xl',
                  'px-9 py-4.5 text-lg',
                  'px-11 py-5 text-xl',
                  'px-8 py-4 text-lg',
                ]
                const size = sizes[skillIndex % sizes.length]

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: skillIndex * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    className={`
                      group relative ${size}
                      bg-gray-100 dark:bg-gray-900
                      border-2 border-gray-300 dark:border-gray-700
                      hover:border-gray-400 dark:hover:border-gray-600
                      rounded-full
                      flex items-center gap-3
                      cursor-default
                      transition-colors duration-300
                      shadow-sm hover:shadow-lg
                    `}
                  >
                    {/* Icon */}
                    {Icon && (
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-gray-900 dark:text-white"
                      >
                        <Icon className="text-2xl" />
                      </motion.div>
                    )}

                    {/* Skill Name */}
                    <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {skill.name}
                    </span>

                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200/0 via-gray-200/50 to-gray-200/0 dark:from-gray-800/0 dark:via-gray-800/50 dark:to-gray-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                )
              })}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}