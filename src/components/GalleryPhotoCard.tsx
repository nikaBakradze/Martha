import { useEffect, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { motion } from 'motion/react'
import { scaleRevealVariants } from '../lib/motion'

type GalleryPhotoCardProps = {
  photo: string
  slot: number
  index: number
}

export function GalleryPhotoCard({ photo, slot, index }: GalleryPhotoCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <motion.div
        className={`gallery-card gallery-card-${(index % 3) + 1}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={scaleRevealVariants}
        transition={{ duration: 0.72, delay: (index % 3) * 0.06 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <button
          className="gallery-placeholder gallery-photo-button"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open memory ${slot} photo`}
        >
          <img src={photo} alt={`Memory ${String(slot).padStart(2, '0')}`} />
          <span className="gallery-photo-overlay">
            <ImagePlus size={18} strokeWidth={1.1} aria-hidden="true" />
            <span>View photo</span>
          </span>
        </button>
      </motion.div>

      {isOpen && (
        <div
          className="month-photo-modal-backdrop"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="month-photo-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Memory ${slot} photo`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close photo"
            >
              <X size={21} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <img src={photo} alt={`Memory ${String(slot).padStart(2, '0')}`} />
            <p>Memory {String(slot).padStart(2, '0')}</p>
          </div>
        </div>
      )}
    </>
  )
}
