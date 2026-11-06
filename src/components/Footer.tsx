import { Heart } from 'lucide-react'
import { motion } from 'motion/react'
import { revealVariants } from '../lib/motion'

export function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
      variants={revealVariants}
    >
      <Heart size={15} fill="currentColor" strokeWidth={1} aria-hidden="true" />
      <span>Made with love, for your little world.</span>
    </motion.footer>
  )
}
