import { ImagePlus } from 'lucide-react'
import { motion } from 'motion/react'

type GalleryPhotoCardProps = {
  slot: number
  index: number
}

export function GalleryPhotoCard({ slot, index }: GalleryPhotoCardProps) {
  return (
    <motion.div
      className={`gallery-card gallery-card-${(index % 3) + 1}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="gallery-placeholder">
        <ImagePlus size={18} strokeWidth={1.1} aria-hidden="true" />
        <span>Memory {String(slot).padStart(2, '0')}</span>
      </div>
    </motion.div>
  )
}
