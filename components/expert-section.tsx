'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { FileText, Award, Briefcase, Phone } from 'lucide-react'
import { LeadModal } from '@/components/lead-modal'

const badges = [
  {
    icon: FileText,
    label: 'ФОП | Офіційний договір',
    description: 'Працюємо офіційно з усією документацією',
  },
  {
    icon: Award,
    label: '11 років досвіду',
    description: 'Постійне вдосконалення навичок та знань',
  },
  {
    icon: Briefcase,
    label: '280+ проєктів',
    description: 'Від квартир до комерційних об\'єктів',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ExpertSection() {
  return (
    <section id="expert" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary opacity-[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            {'Експерт'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">
            {'Поліщук Дмитро'}
          </h2>
          <a
            href="tel:+380636311132"
            className="inline-flex items-center gap-2 text-lg font-mono text-primary hover:underline"
          >
            <Phone className="size-4" />
            {'063-631-11-32'}
          </a>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-pretty leading-relaxed">
            {'Електромонтажник з багаторічним досвідом. Кожен проєкт виконується з повною відповідальністю, від консультації до здачі об\'єкта.'}
          </p>
        </motion.div>

        {/* Trust signal cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={cardVariants}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:border-primary/30 transition-colors"
            >
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="size-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">
                {badge.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <LeadModal />
        </motion.div>
      </div>
    </section>
  )
}
