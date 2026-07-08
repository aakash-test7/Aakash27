'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { personalInfo } from '@/lib/data'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, subject, message } = formData

    // Validate all fields (trigger error animation without preventing default)
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setValidationError(true)
      setTimeout(() => setValidationError(false), 800)
      return
    }

    // Trigger success animation
    setIsSubmitting(true)

    // Wait for animation to complete
    setTimeout(() => {
      // Create mailto link with form data
      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

      // Open user's default email client
      window.location.href = mailtoLink

      // Show success message (keep it shown, don't auto-hide)
      setSubmitStatus('success')
      setIsSubmitting(false)
    }, 1500)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setSubmitStatus('idle')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
    <section id="contact" className="section-container bg-white dark:bg-gray-950">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 dark:bg-white flex-shrink-0">
                    <FiMapPin className="w-5 h-5 text-white dark:text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 dark:bg-white flex-shrink-0">
                    <FiMail className="w-5 h-5 text-white dark:text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="relative text-gray-900 dark:text-white font-medium hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group break-all inline-block"
                    >
                      {personalInfo.email}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-500 ease-out"></span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="mt-6 flex-1 min-h-[300px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1746.6826525578342!2d76.60862423420711!3d28.887490794263872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d852517f5181b%3A0x27def9e138440feb!2sMedical%20MoD!5e0!3m2!1sen!2sin!4v1744035571099!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="glass-effect rounded-2xl p-6 h-full">
              {submitStatus === 'success' ? (
                // Thank You Message
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center">
                    <FiSend className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      Thank You!
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Your email client has been opened. I appreciate you reaching out and look forward to connecting with you soon!
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You can also reach me directly at{' '}
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="relative text-gray-900 dark:text-white font-medium hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group inline-block"
                      >
                        {personalInfo.email}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-500 ease-out"></span>
                      </a>
                    </p>
                  </div>
                </motion.div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                        placeholder="A Kharb"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                        placeholder="aakash@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button with Animations */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    className="w-1/2 mx-auto px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:shadow-2xl disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <span>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>

                    {/* Airplane Icon - Rotates 45 degrees on click */}
                    <motion.div
                      animate={{
                        rotate: isSubmitting ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <FiSend className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}