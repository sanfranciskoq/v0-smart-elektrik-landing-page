'use client'

import { motion } from 'framer-motion'

export function AtmosphericBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {/* Hero Aura (Top Right) - Orange */}
            <motion.div
                initial={{ scale: 1, opacity: 0.15 }}
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[10%] -right-[10%] w-[1000px] h-[1000px] bg-[#FF8C00] rounded-full blur-[120px]"
            />

            {/* Calculator Aura (Bottom Left) - White */}
            <motion.div
                initial={{ scale: 1, opacity: 0.1 }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.25, 0.1],
                    x: [0, -60, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[5%] -left-[10%] w-[1100px] h-[1100px] bg-[#F8FAFC] rounded-full blur-[140px]"
            />

            {/* Center Aura (Middle) - Orange */}
            <motion.div
                initial={{ scale: 1, opacity: 0.08 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.08, 0.2, 0.08],
                    x: [40, -40, 40],
                    y: [-40, 40, -40],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F97316] rounded-full blur-[130px]"
            />
        </div>
    )
}
