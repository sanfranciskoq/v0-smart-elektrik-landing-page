'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SE</span>
            </div>
            <span className="text-xl font-bold text-foreground">SMART ELEKTRIK</span>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground mb-1">
              {'Поліщук Дмитро'}
            </p>
            <a
              href="tel:+380636311132"
              className="text-primary font-mono text-lg hover:underline"
            >
              063 631 11 32
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/smart_elektrik.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/dmytro.vadimovych/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm hidden sm:inline">Facebook</span>
            </a>
            <a
              href="tel:+380636311132"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Телефон"
            >
              <Phone className="size-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm hidden sm:inline">Зателефонувати</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            {'© '}
            {new Date().getFullYear()}
            {' SMART ELEKTRIK. Всі права захищені.'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
