import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import bearPhoto from '../assets/bear-photo.png'

export function TeddyBearQuote() {
  return (
    <motion.aside
      className="teddy-quote"
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8 }}
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
