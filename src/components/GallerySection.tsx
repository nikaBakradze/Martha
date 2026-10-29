import { motion } from 'motion/react'
import { GalleryPhotoCard } from './GalleryPhotoCard'

const gallerySlots = Array.from({ length: 12 }, (_, index) => index + 1)

export function GallerySection() {
  return (
    <section className="gallery-section section-shell" id="gallery" aria-labelledby="gallery-title">
      <div className="section-heading gallery-heading">
        <p className="eyebrow dark-eyebrow">Little glimpses</p>
        <h2 id="gallery-title">A gallery of <em>magic</em></h2>
        <p>A place for the moments we never want to forget.</p>
      </div>
      <div className="gallery-grid">
        {gallerySlots.map((slot, index) => (
          <GalleryPhotoCard key={slot} slot={slot} index={index} />
        ))}
      </div>
      <motion.p
        className="gallery-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        More memories to come
      </motion.p>
    </section>
  )
}
