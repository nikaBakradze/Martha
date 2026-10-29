import { Star } from 'lucide-react'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="martha home">
        <Star size={12} fill="currentColor" strokeWidth={1} aria-hidden="true" />
        <span>martha</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#first-year">My First Year</a>
        <a href="#letters">Letters</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
  )
}
