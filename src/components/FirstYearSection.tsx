import { Fragment } from 'react'
import { MonthPhotoCard } from './MonthPhotoCard'
import { TeddyBearQuote } from './TeddyBearQuote'
import { motion } from 'motion/react'
import { revealVariants, staggerContainerVariants } from '../lib/motion'

const months = Array.from({ length: 12 }, (_, index) => `Month ${index + 1}`)

export function FirstYearSection() {
  return (
    <section className="first-year-section section-shell" id="first-year" aria-labelledby="first-year-title">
      <motion.div
        className="section-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainerVariants}
      >
        <motion.p className="eyebrow dark-eyebrow" variants={revealVariants}>The little moments</motion.p>
        <motion.h2 id="first-year-title" variants={revealVariants}>My first <em>year</em></motion.h2>
        <motion.p variants={revealVariants}>Every month brought a new little wonder to our world.</motion.p>
      </motion.div>
      <div className="timeline-layout">
        <div className="timeline-grid">
          {months.map((month, index) => (
            <Fragment key={month}>
              <MonthPhotoCard key={month} month={month} index={index} />
              {index === 7 && <TeddyBearQuote />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
