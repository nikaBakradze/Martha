import { Heart, LockKeyhole } from 'lucide-react'
import { motion } from 'motion/react'

export function LettersSection() {
  return (
    <section className="letters-section section-shell" id="letters" aria-labelledby="letters-title">
      <motion.div
        className="letters-placeholder"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-icon"><Heart size={22} fill="currentColor" strokeWidth={1} aria-hidden="true" /></div>
        <p className="eyebrow dark-eyebrow">A keepsake for later</p>
        <h2 id="letters-title">Letters filled<br /><em>with love</em></h2>
        <p>This little corner is being saved for the wishes, stories, and love notes from our favourite people.</p>
        <span className="letters-coming"><LockKeyhole size={13} strokeWidth={1.2} /> Coming soon</span>
      </motion.div>
    </section>
  )
}
