import { Camera, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

type MonthPhotoCardProps = {
  month: string
  index: number
}

export function MonthPhotoCard({ month, index }: MonthPhotoCardProps) {
  return (
    <motion.article
      className={`month-card month-card-${(index % 4) + 1}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07 }}
      whileHover={{ y: -4 }}
    >
      <div className="photo-placeholder">
        <Camera size={19} strokeWidth={1.1} aria-hidden="true" />
        <span>Photo {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="month-label">
        <Sparkles size={11} strokeWidth={1.2} aria-hidden="true" />
        <span>{month}</span>
      </div>
    </motion.article>
  )
}
