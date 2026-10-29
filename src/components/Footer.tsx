import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <Heart size={15} fill="currentColor" strokeWidth={1} aria-hidden="true" />
      <span>Made with love, for your little world.</span>
      <span className="footer-year">A first birthday keepsake</span>
    </footer>
  )
}
