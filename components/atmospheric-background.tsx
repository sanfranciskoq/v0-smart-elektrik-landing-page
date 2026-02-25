'use client'

import { motion } from 'framer-motion'

export function AtmosphericBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {/* Hero Aura (Top Right) - Orange */}
            <motion.div
                initial={{ scale: 1, opacity: 0.08 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.08, 0.15, 0.08],
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-[#FF8C00] rounded-full blur-[120px]"
            />

            {/* Calculator Aura (Bottom Left) - White */}
            <motion.div
                initial={{ scale: 1, opacity: 0.05 }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.12, 0.05],
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
                className="absolute bottom-[10%] -left-[10%] w-[900px] h-[900px] bg-[#F8FAFC] rounded-full blur-[150px]"
            />

            {/* Center Aura (Middle) - Orange */}
            <motion.div
                initial={{ scale: 1, opacity: 0.03 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.03, 0.08, 0.03],
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F97316] rounded-full blur-[140px]"
            />
        </div>
    )
}
