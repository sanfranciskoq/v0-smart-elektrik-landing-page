'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Zap, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const features = [
  { icon: Zap, label: 'Професійний монтаж' },
  { icon: Shield, label: 'Гарантія якості' },
  { icon: Clock, label: 'Точні терміни' },
]

export function Hero() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  // Premium parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={targetRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20 sm:py-32"
    >
      {/* Background Image with Parallax and Blur */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-[-2] scale-110"
      >
        <Image
          src="/images/download.png"
          alt="Електромонтажні роботи"
          fill
          priority
          className="object-cover blur-[4px]"
        />
      </motion.div>

      {/* Dark Overlay Gradient */}
      <div
        className="absolute inset-0 z-[-1] bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance tracking-tight"
          >
            {'Професійні'}
            <span className="block text-primary drop-shadow-[0_0_15px_rgba(255,122,0,0.3)]">
              {'Електромонтажні Послуги'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            {'Надійні електромонтажні роботи від досвідченого фахівця. Розраховуйте вартість послуг онлайн за кілька хвилин.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 h-14 shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all hover:scale-105"
            >
              {'Розрахувати вартість'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-white hover:bg-white/10 text-lg h-14 backdrop-blur-sm transition-all"
              asChild
            >
              <a href="tel:+380636311132">{'Зателефонувати'}</a>
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {features.map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-6 py-3 transition-colors hover:bg-white/10"
              >
                <feat.icon className="size-5 text-primary" />
                <span className="text-sm font-medium text-slate-200">{feat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
