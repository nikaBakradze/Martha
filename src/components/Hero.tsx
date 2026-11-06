import { ArrowDown, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { softRevealVariants } from '../lib/motion'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

const scrollToGreeting = () => {
  const target = document.getElementById('first-year')

  if (!target) {
    console.error('Section with id="first-year" was not found.')
    return
  }

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}



  return (
    <section
      className="hero-section"
      id="top"
      aria-labelledby="page-title"
    >
      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          variants={softRevealVariants}
          transition={{ duration: 0.72, delay: shouldReduceMotion ? 0 : 0.12 }}
        >
          <Sparkles size={14} strokeWidth={1.3} aria-hidden="true" />
          <span>A little fairytale</span>
        </motion.div>

        <motion.h1
          id="page-title"
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          variants={softRevealVariants}
          transition={{ duration: 0.9, delay: shouldReduceMotion ? 0 : 0.25 }}
        >
          My First
          <em>Birthday</em>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          variants={softRevealVariants}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.44 }}
        >
          One tiny year, one big love, and a little world made brighter by you.
        </motion.p>

        <motion.button
          className="primary-button"
          type="button"
          onClick={scrollToGreeting}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          variants={softRevealVariants}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.62 }}
        >
          Open my fairytale
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  )
}