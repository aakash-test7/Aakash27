'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects } from '@/lib/data'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'mle', label: 'Machine Learning' },
  { id: 'sw', label: 'Software' },
]

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  category: string
  colSpan: number
  rowSpan: number
}

function ProjectCard({ title, description, image, link, tags, colSpan = 1, rowSpan = 1 }: ProjectCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block relative overflow-hidden rounded-2xl min-h-[300px] md:min-h-[400px] h-full group shadow-lg hover:shadow-2xl transition-shadow duration-300"
      transition={{ duration: 0.3 }}
    >
      {/* Background Image - FULLY VISIBLE by default, no scale on hover */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1f2937'
        }}
      />

      {/* Intense Glassmorphism Overlay - Only visible on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-2xl" />

      {/* Content */}
      <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
        {/* Tags - Top Left - Only visible on hover */}
        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs md:text-sm font-medium bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-white shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Section - Description, Title and Link */}
        <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {/* Description - Above Title */}
          <p className="text-sm md:text-base text-white/90 italic leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {description}
          </p>

          {/* Title and Link Button Row */}
          <div className="flex items-end justify-between gap-4">
            {/* Title - Bottom Left - Only visible on hover */}
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Projects2() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" className="section-container bg-gray-50 dark:bg-gray-900">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 mx-auto rounded-full" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category.id
                ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105'
                }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-5 auto-rows-[450px] gap-6"
        >
          {filteredProjects.map((project, index) => {
            // Special handling for the last card (7th card) when showing all 7 projects
            const isLastCard = index === 6 && filteredProjects.length === 7;

            return (
              <motion.div
                key={index}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`
                  ${project.colSpan === 2 ? 'md:col-span-3' : 'md:col-span-2'}
                  ${project.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'}
                  ${isLastCard ? 'md:col-start-2' : ''}
                `}
              >
                <ProjectCard {...project} />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 text-gray-600 dark:text-gray-400"
          >
            <p className="text-xl">No projects found in this category.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
