import { MotionConfig, motion } from 'motion/react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FirstYearSection } from './components/FirstYearSection'
import { GallerySection } from './components/GallerySection'
import { LettersSection } from './components/LettersSection'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="birthday-page">
        <div className="photo-backdrop" aria-hidden="true" />
        <div className="page-wash" aria-hidden="true" />
        <Header />
        <Hero />
        <FirstYearSection />
        <LettersSection />
        <GallerySection />
        <Footer />
        <motion.div
          className="floating-heart"
          aria-hidden="true"
          animate={{ y: [0, -8, 0], rotate: [-4, 3, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♡
        </motion.div>
        <a className="skip-link" href="#first-year">Skip to first year</a>
      </main>
    </MotionConfig>
  )
}

export default App
