'use client'
import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const fieldRef = useRef(null)

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      const size = Math.random() * 4 + 1
      const opacity = Math.random() * 0.5 + 0.2
      const duration = Math.random() * 10 + 10
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${Math.random() * 5}s;
      `

      field.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        if (field.contains(particle)) {
          field.removeChild(particle)
        }
      }, duration * 1000)
    }

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      createParticle()
    }

    // Continuously create new particles
    const interval = setInterval(createParticle, 800)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={fieldRef} className="particle-field"></div>
}
