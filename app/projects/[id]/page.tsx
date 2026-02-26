'use client'

import { useParams, useRouter } from 'next/navigation'
import { projects } from '@/lib/projects-data'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Phone } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ProjectPage() {
    const { id } = useParams()
    const router = useRouter()
    const project = projects.find((p) => p.id === Number(id))

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-white">
                <h1 className="text-2xl font-bold mb-4">Проєкт не знайдено</h1>
                <Button onClick={() => router.push('/')}>Повернутися на головну</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen text-foreground">
            <Header />

            <main className="pt-24">
                {/* Breadcrumbs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <Link href="/" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors group">
                        <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                        <span>До всіх проєктів</span>
                    </Link>
                </div>

                {/* Hero Section - Preserving full image context with premium blurred backdrop */}
                <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/50"
                    >
                        {/* Layer 1: Blurred Backdrop (Texture) */}
                        <img
                            src={project.image}
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110"
                        />

                        {/* Layer 2: Main Image (Fully Visible) */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                            />
                        </div>

                        {/* Layer 3: Overlay Gradient for Depth and Readability */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />

                        {/* Project Title Overlay Integrated into Backdrop */}
                        <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-12">
                            <div className="max-w-4xl">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg"
                                >
                                    {project.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg sm:text-xl text-slate-200 font-medium drop-shadow-md"
                                >
                                    {project.subtitle}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Project Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl">
                        {/* About Project */}
                        <section className="mb-20">
                            <h2 className="text-3xl font-bold mb-8 text-primary border-l-4 border-primary pl-4">
                                Про проєкт
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                {project.about}
                            </p>
                        </section>

                        {/* Technical Solutions - Simplified without icons/grid */}
                        {project.technicalSolutions.length > 0 && (
                            <section className="mb-20">
                                <h2 className="text-3xl font-bold mb-8 text-primary border-l-4 border-primary pl-4">
                                    Технічні рішення
                                </h2>
                                <div className="space-y-10">
                                    {project.technicalSolutions.map((solution, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {solution.title}
                                            </h3>
                                            <p className="text-slate-400 text-lg leading-relaxed">
                                                {solution.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Final CTA Section */}
                <section className="py-24 relative border-t border-white/5 bg-slate-900/40">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                            Бажаєте реалізувати подібний проєкт?
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 text-balance">
                            Хочете такий самий результат? Отримайте безкоштовну консультацію від фахівця вже сьогодні.
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xl px-12 h-16 shadow-[0_0_25px_rgba(255,122,0,0.3)] transition-all hover:scale-105"
                            asChild
                        >
                            <a href="tel:+380636311132">
                                <Phone className="size-5 mr-3" />
                                <span>Отримати консультацію</span>
                            </a>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
