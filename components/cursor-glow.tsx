'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring configuration for smooth "floating" effect
    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [mouseX, mouseY, isVisible])

    return (
        <motion.div
            style={{
                translateX: x,
                translateY: y,
                left: -150, // Half of width to center on cursor
                top: -150,  // Half of height
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.15 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed pointer-events-none z-0 w-[300px] h-[300px] bg-[#FF8C00] rounded-full blur-[80px]"
        />
    )
}
