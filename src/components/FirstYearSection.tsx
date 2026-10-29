import { Fragment } from 'react'
import { MonthPhotoCard } from './MonthPhotoCard'
import { TeddyBearQuote } from './TeddyBearQuote'

const months = Array.from({ length: 12 }, (_, index) => `Month ${index + 1}`)

export function FirstYearSection() {
  return (
    <section className="first-year-section section-shell" id="first-year" aria-labelledby="first-year-title">
      <div className="section-heading">
        <p className="eyebrow dark-eyebrow">The little moments</p>
        <h2 id="first-year-title">My first <em>year</em></h2>
        <p>Every month brought a new little wonder to our world.</p>
      </div>
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
