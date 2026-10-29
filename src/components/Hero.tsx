import { ArrowDown, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

export function Hero() {
  const scrollToGreeting = () => {
    document.getElementById('greeting')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section" id="top" aria-labelledby="page-title">
      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Sparkles size={14} strokeWidth={1.3} aria-hidden="true" />
          <span>A little fairytale</span>
        </motion.div>
        <motion.h1
          id="page-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
        >
          My First
          <em>Birthday</em>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          One tiny year, one big love, and a little world made brighter by you.
        </motion.p>
        <motion.button
          className="primary-button"
          type="button"
          onClick={scrollToGreeting}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62 }}
        >
          Open my fairytale
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </motion.button>
      </div>
      <button className="scroll-hint" type="button" onClick={scrollToGreeting}>
        <span>Scroll to discover</span>
        <ArrowDown size={15} strokeWidth={1.2} aria-hidden="true" />
      </button>
    </section>
  )
}
