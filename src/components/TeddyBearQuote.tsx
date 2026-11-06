import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import bearPhoto from '../assets/bear-photo.png'
import { revealVariants } from '../lib/motion'

export function TeddyBearQuote() {
  return (
    <motion.aside
      className="teddy-quote"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      variants={revealVariants}
    >
      <div className="quote-decoration quote-star"><Sparkles size={15} strokeWidth={1.1} /></div>
      <div className="teddy-scene" aria-label="Teddy bear illustration">
        <img src={bearPhoto} alt="A teddy bear sitting on a cloud and holding a balloon" />
      </div>
      <Heart className="quote-heart" size={14} fill="currentColor" strokeWidth={1} aria-hidden="true" />
      <blockquote>“You are our <em>greatest adventure</em>”</blockquote>
    </motion.aside>
  )
}
