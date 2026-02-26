'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useAnimationControls } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    image: '/images/project-1.jpg',
    title: 'ЖК RiverStone',
    caption: 'Повний електромонтаж квартири',
  },
  {
    id: 2,
    image: '/images/project-2.jpg',
    title: 'Котедж в Ірпені',
    caption: 'Розумний будинок',
  },
  {
    id: 3,
    image: '/images/project-3.jpg',
    title: 'ЖК Новопечерський Двір',
    caption: 'Дизайнерське освітлення',
  },
  {
    id: 4,
    image: '/images/project-4.jpg',
    title: 'Офіс IT-компанії',
    caption: 'Комерційний електромонтаж',
  },
  {
    id: 5,
    image: '/images/project-5.jpg',
    title: 'Приватний будинок',
    caption: 'Зовнішнє освітлення ділянки',
  },
]

const CARD_WIDTH = 400
const CARD_GAP = 24

export function ProjectsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const x = useMotionValue(0)
  const controls = useAnimationControls()

  const checkScrollBounds = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < maxScroll - 2)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    checkScrollBounds()
    el.addEventListener('scroll', checkScrollBounds)
    window.addEventListener('resize', checkScrollBounds)
    return () => {
      el.removeEventListener('scroll', checkScrollBounds)
      window.removeEventListener('resize', checkScrollBounds)
    }
  }, [checkScrollBounds])

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const scrollAmount = CARD_WIDTH + CARD_GAP
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="projects" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            {'Портфоліо'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {'Наші реалізовані проєкти'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {'Кожен проєкт виконаний з увагою до деталей, дотриманням стандартів безпеки та гарантією якості.'}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute -left-3 sm:left-0 top-1/2 -translate-y-1/2 z-10 size-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground shadow-lg hover:bg-muted transition-colors disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Попередній проєкт"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute -right-3 sm:right-0 top-1/2 -translate-y-1/2 z-10 size-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground shadow-lg hover:bg-muted transition-colors disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Наступний проєкт"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-12 pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[320px] sm:w-[400px] snap-center"
              >
                <div className="group flex flex-col transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.caption}`}
                      fill
                      sizes="(max-width: 640px) 320px, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Container Below Image */}
                  <div className="pt-4 px-1">
                    <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FF8C00]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {project.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
