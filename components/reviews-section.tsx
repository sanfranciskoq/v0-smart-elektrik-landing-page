'use client'

import { motion } from 'framer-motion'

const reviews = [
    { id: 1, src: '/images/review1.png', large: true },
    { id: 2, src: '/images/review2.png', large: false },
    { id: 3, src: '/images/review3.png', large: false },
    { id: 4, src: '/images/review4.png', large: false },
    { id: 5, src: '/images/review5.png', large: false },
    { id: 6, src: '/images/review6.png', large: true },
]

export function ReviewsSection() {
    return (
        <section id="reviews" className="py-24 relative overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Відгуки наших клієнтів
                    </h2>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`${review.large ? 'md:col-span-2' : 'md:col-span-1'
                                } group relative rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5`}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={review.src}
                                    alt={`Відгук клієнта ${review.id}`}
                                    className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                                    loading="lazy"
                                />
                            </div>

                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
