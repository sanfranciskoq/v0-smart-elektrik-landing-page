'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Zap, Shield, Clock } from 'lucide-react'

const features = [
  { icon: Zap, label: 'Професійний монтаж' },
  { icon: Shield, label: 'Гарантія якості' },
  { icon: Clock, label: 'Точні терміни' },
]

export function Hero() {
  const scrollToCalculator = () => {
    const element = document.getElementById('calculator')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {'Професійні'}
            <span className="block text-primary">{'Електромонтажні Послуги'}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
            {'Надійні електромонтажні роботи від досвідченого фахівця. Розраховуйте вартість послуг онлайн за кілька хвилин.'}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8"
            >
              {'Розрахувати вартість'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base"
              asChild
            >
              <a href="tel:+380636311132">{'Зателефонувати'}</a>
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {features.map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5"
              >
                <feat.icon className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{feat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
