import { motion } from 'motion/react'
import { GalleryPhotoCard } from './GalleryPhotoCard'
import { revealVariants, staggerContainerVariants } from '../lib/motion'
import memory01 from '../assets/memory1.jpeg'
import memory02 from '../assets/memory2.jpeg'
import memory03 from '../assets/memory3.jpeg'
import memory04 from '../assets/memory4.jpeg'
import memory05 from '../assets/memory5.jpeg'
import memory06 from '../assets/memory6.jpeg'
import memory07 from '../assets/memory7.jpeg'
import memory08 from '../assets/memory8.jpeg'
import memory09 from '../assets/memory9.jpeg'
import memory10 from '../assets/memory10.jpeg'
import memory11 from '../assets/memory11.jpeg'
import memory12 from '../assets/memory12.jpeg'

const galleryPhotos = [
  memory01,
  memory02,
  memory03,
  memory04,
  memory05,
  memory06,
  memory07,
  memory08,
  memory09,
  memory10,
  memory11,
  memory12,
]

export function GallerySection() {
  return (
    <section className="gallery-section section-shell" id="gallery" aria-labelledby="gallery-title">
      <motion.div
        className="section-heading gallery-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainerVariants}
      >
        <motion.p className="eyebrow dark-eyebrow" variants={revealVariants}>Little glimpses</motion.p>
        <motion.h2 id="gallery-title" variants={revealVariants}>A gallery of <em>magic</em></motion.h2>
        <motion.p variants={revealVariants}>A place for the moments we never want to forget.</motion.p>
      </motion.div>
      <div className="gallery-grid">
        {galleryPhotos.map((photo, index) => (
          <GalleryPhotoCard key={photo} photo={photo} slot={index + 1} index={index} />
        ))}
      </div>
      <motion.p
        className="gallery-note"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        variants={revealVariants}
      >
        More memories to come
      </motion.p>
    </section>
  )
}
