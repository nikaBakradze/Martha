import { useEffect, useState } from 'react'
import { Camera, X, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { revealVariants } from '../lib/motion'
import month01 from '../assets/1month.jpeg'
import month02 from '../assets/2month.jpeg'
import month03 from '../assets/3month.jpeg'
import month04 from '../assets/4month.jpeg'
import month05 from '../assets/5month.jpeg'
import month06 from '../assets/6month.jpeg'
import month07 from '../assets/7month.jpeg'
import month08 from '../assets/8month.jpeg'
import month09 from '../assets/9month.jpeg'
import month10 from '../assets/10month.jpeg'
import month11 from '../assets/11month.jpeg'
import month12 from '../assets/12month.jpeg'

type MonthPhotoCardProps = {
  month: string
  index: number
}

const monthPhotos = [
  month01,
  month02,
  month03,
  month04,
  month05,
  month06,
  month07,
  month08,
  month09,
  month10,
  month11,
  month12,
]

export function MonthPhotoCard({ month, index }: MonthPhotoCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const photo = monthPhotos[index]

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
      <motion.article
        className={`month-card month-card-${(index % 4) + 1}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.18 }}
        variants={revealVariants}
        transition={{ duration: 0.72, delay: (index % 4) * 0.07 }}
        whileHover={{ y: -4, transition: { duration: 0.28 } }}
      >
        <button
          className="photo-placeholder photo-button"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open ${month} photo`}
        >
          <img src={photo} alt={`${month} memory`} />
          <span className="photo-overlay">
            <Camera size={19} strokeWidth={1.1} aria-hidden="true" />
            <span>View photo</span>
          </span>
        </button>
        <button
          className="month-label month-label-button"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open ${month} photo`}
        >
          <Sparkles size={11} strokeWidth={1.2} aria-hidden="true" />
          <span>{month}</span>
        </button>
      </motion.article>

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
            aria-label={`${month} photo`}
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
            <img src={photo} alt={`${month} memory`} />
            <p>{month}</p>
          </div>
        </div>
      )}
    </>
  )
}
