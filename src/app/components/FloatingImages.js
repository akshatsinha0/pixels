'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

export default function FloatingImages() {
  const containerRef = useRef(null)
  const imagesRef = useRef([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const groundFlipTimelineRef = useRef(null)
  const floatingTimelineRef = useRef(null)
  const magneticForceRef = useRef({})

  const imageCount = 10
  const imageUrls = Array.from({ length: imageCount }, (_, i) => 
    `/home_sec_hov_images/${i + 1}.png`
  )

  // Revolutionary ground flip physics calculation
  const calculateGroundFlipPhysics = useCallback((index, mouseX, mouseY, imgElement) => {
    if (!imgElement) return {}

    const rect = imgElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Distance-based quantum field calculation
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + 
      Math.pow(mouseY - centerY, 2)
    )
    
    // Revolutionary physics: closer mouse = stronger flip force
    const maxDistance = 400
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    const flipIntensity = 1 - normalizedDistance
    
    // Angular momentum calculation for realistic flip
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX)
    const rotationForce = flipIntensity * 180 // Maximum 180deg flip
    
    // 3D perspective calculation for depth illusion
    const perspectiveZ = flipIntensity * 150
    const rotationX = flipIntensity * -90 // Flip from ground up
    
    return {
      rotationX: rotationX,
      rotationY: Math.sin(angle) * rotationForce * 0.3,
      rotationZ: Math.cos(angle) * rotationForce * 0.2,
      translateZ: perspectiveZ,
      scale: 0.8 + (flipIntensity * 0.7),
      opacity: 0.3 + (flipIntensity * 0.7),
      intensity: flipIntensity
    }
  }, [])

  // Advanced magnetic field simulation
  const calculateMagneticField = useCallback((mouseX, mouseY, imageElements) => {
    const magneticFields = {}
    
    imageElements.forEach((img, index) => {
      if (!img) return
      
      const rect = img.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Magnetic attraction/repulsion calculation
      const dx = mouseX - centerX
      const dy = mouseY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Quantum field strength with falloff
      const fieldStrength = Math.max(0, 500 - distance) / 500
      const magneticForce = fieldStrength * 100
      
      // Orbital mechanics simulation
      const angle = Math.atan2(dy, dx)
      const orbitalRadius = 80 + (fieldStrength * 120)
      
      magneticFields[index] = {
        forceX: Math.cos(angle + Math.PI) * magneticForce,
        forceY: Math.sin(angle + Math.PI) * magneticForce,
        orbitalX: mouseX + Math.cos(angle + Math.PI) * orbitalRadius,
        orbitalY: mouseY + Math.sin(angle + Math.PI) * orbitalRadius,
        fieldStrength,
        rotationalVelocity: fieldStrength * 360 * (index % 2 === 0 ? 1 : -1)
      }
    })
    
    return magneticFields
  }, [])

  useEffect(() => {
    const initAdvancedFloatingSystem = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { Physics2DPlugin } = await import('gsap/Physics2DPlugin') // Advanced physics
      
      gsap.registerPlugin(ScrollTrigger, Physics2DPlugin)
      
      const container = containerRef.current
      if (!container) return

      // REVOLUTIONARY INITIAL STATE: Images lying flat on ground (face down)
      imagesRef.current.forEach((img, index) => {
        if (img) {
          const randomX = Math.random() * (window.innerWidth - 120)
          const randomY = Math.random() * (window.innerHeight - 120)
          const randomRotation = Math.random() * 360
          
          gsap.set(img, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            rotationX: -90, // LYING FLAT FACE DOWN (KEY INNOVATION)
            rotationY: 0,
            rotationZ: 0,
            scale: 0.6,
            opacity: 0.1,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            perspective: 1000,
            z: -100, // Below ground level
            filter: "blur(2px) brightness(0.3) contrast(0.8)"
          })
        }
      })

      // ADVANCED MOUSE TRACKING WITH PREDICTION
      let mouseTracker = { x: 0, y: 0, vx: 0, vy: 0 }
      let lastMouseTime = Date.now()
      
      const advancedMouseHandler = (e) => {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastMouseTime
        
        // Velocity calculation for prediction
        mouseTracker.vx = (e.clientX - mouseTracker.x) / deltaTime
        mouseTracker.vy = (e.clientY - mouseTracker.y) / deltaTime
        
        mouseTracker.x = e.clientX
        mouseTracker.y = e.clientY
        lastMouseTime = currentTime
        
        setMousePosition({ 
          x: e.clientX, 
          y: e.clientY,
          vx: mouseTracker.vx,
          vy: mouseTracker.vy
        })

        if (isHovering) {
          // REVOLUTIONARY GROUND FLIP CALCULATION
          imagesRef.current.forEach((img, index) => {
            if (!img) return
            
            const flipPhysics = calculateGroundFlipPhysics(index, e.clientX, e.clientY, img)
            const magneticField = calculateMagneticField(e.clientX, e.clientY, imagesRef.current)[index]
            
            if (!magneticField) return
            
            // COMBINED PHYSICS: Ground flip + Magnetic attraction + Orbital mechanics
            const combinedTransform = {
              // Ground-to-front flip (MAIN INNOVATION)
              rotationX: flipPhysics.rotationX + (flipPhysics.intensity * 90), // From -90 to 0 degrees
              rotationY: flipPhysics.rotationY + (Math.sin(Date.now() * 0.001 + index) * 15),
              rotationZ: flipPhysics.rotationZ + magneticField.rotationalVelocity * 0.01,
              
              // Magnetic positioning with orbital mechanics
              x: magneticField.orbitalX + (Math.sin(Date.now() * 0.002 + index) * 20),
              y: magneticField.orbitalY + (Math.cos(Date.now() * 0.002 + index) * 15),
              z: flipPhysics.translateZ + (flipPhysics.intensity * 200),
              
              // Dynamic scaling and visual effects
              scale: flipPhysics.scale + (magneticField.fieldStrength * 0.3),
              opacity: flipPhysics.opacity + (magneticField.fieldStrength * 0.2),
              
              // Advanced visual filters
              filter: `blur(${2 - flipPhysics.intensity * 2}px) brightness(${0.3 + flipPhysics.intensity * 0.7}) contrast(${0.8 + flipPhysics.intensity * 0.4}) saturate(${0.5 + flipPhysics.intensity * 0.8})`,
              
              // Quantum shadow effect
              boxShadow: `
                0 ${flipPhysics.translateZ * 0.3}px ${flipPhysics.translateZ * 0.6}px rgba(0,0,0,${0.1 + flipPhysics.intensity * 0.4}),
                0 0 ${flipPhysics.intensity * 50}px rgba(255,107,53,${flipPhysics.intensity * 0.3}),
                inset 0 0 ${flipPhysics.intensity * 20}px rgba(255,255,255,${flipPhysics.intensity * 0.1})
              `
            }
            
            // GSAP ANIMATION WITH ADVANCED EASING
            gsap.to(img, {
              ...combinedTransform,
              duration: 0.6 + (flipPhysics.intensity * 0.4),
              ease: flipPhysics.intensity > 0.5 ? "elastic.out(1, 0.3)" : "power2.out",
              transformOrigin: "center center",
              force3D: true // GPU acceleration
            })
          })
        }
      }

      // HERO SECTION INTEGRATION WITH ADVANCED DETECTION
      const heroSection = document.querySelector('#home')
      if (heroSection) {
        
        // MOUSE ENTER: SPECTACULAR GROUND FLIP REVEAL
        heroSection.addEventListener('mouseenter', () => {
          setIsHovering(true)
          
          // Kill existing timelines
          if (groundFlipTimelineRef.current) groundFlipTimelineRef.current.kill()
          
          // REVOLUTIONARY GROUND FLIP TIMELINE
          groundFlipTimelineRef.current = gsap.timeline({
            onComplete: () => setIsInitialized(true)
          })
          
          imagesRef.current.forEach((img, index) => {
            if (!img) return
            
            const delay = index * 0.08 // Cascading reveal
            const randomIntensity = 0.3 + Math.random() * 0.7
            
            groundFlipTimelineRef.current.to(img, {
              // MAIN GROUND FLIP EFFECT
              rotationX: 0, // From -90 (lying down) to 0 (standing up)
              rotationY: Math.random() * 30 - 15, // Subtle side rotation
              rotationZ: Math.random() * 20 - 10, // Natural variation
              
              // Emergence animation
              y: `-=${50 + Math.random() * 100}`, // Rise from ground
              z: 50 + Math.random() * 100, // Forward depth
              scale: 0.9 + Math.random() * 0.3,
              opacity: 0.7 + Math.random() * 0.3,
              
              // Visual enhancement
              filter: `blur(0px) brightness(${0.8 + randomIntensity * 0.4}) contrast(1.2) saturate(1.1)`,
              
              // Advanced physics easing
              duration: 1.2 + Math.random() * 0.8,
              ease: "elastic.out(1.2, 0.4)",
              force3D: true,
              
              // Quantum shadow emergence
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.3),
                0 0 30px rgba(255,107,53,0.2),
                inset 0 0 15px rgba(255,255,255,0.1)
              `
            }, delay)
          })
        })

        // MOUSE LEAVE: GRACEFUL RETURN TO GROUND
        heroSection.addEventListener('mouseleave', () => {
          setIsHovering(false)
          setIsInitialized(false)
          
          // Kill floating timeline
          if (floatingTimelineRef.current) floatingTimelineRef.current.kill()
          
          // RETURN TO GROUND ANIMATION
          gsap.to(imagesRef.current, {
            rotationX: -90, // Return to lying flat
            rotationY: 0,
            rotationZ: '+=360', // Final spin
            z: -100, // Back below ground
            scale: 0.6,
            opacity: 0.1,
            filter: "blur(2px) brightness(0.3) contrast(0.8)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 1.5,
            stagger: 0.05,
            ease: "power3.in"
          })
        })

        // ADVANCED MOUSE MOVE WITH THROTTLING
        let mouseMoveTimeout
        heroSection.addEventListener('mousemove', (e) => {
          if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
          mouseMoveTimeout = setTimeout(() => advancedMouseHandler(e), 16) // 60fps throttling
        })
      }

      // AUTONOMOUS QUANTUM FIELD ANIMATION (when not hovering)
      const quantumFieldAnimation = () => {
        if (!isHovering && !isInitialized) {
          imagesRef.current.forEach((img, index) => {
            if (img) {
              const quantumX = Math.random() * window.innerWidth
              const quantumY = Math.random() * window.innerHeight
              const quantumRotation = Math.random() * 360
              
              gsap.to(img, {
                x: quantumX,
                y: quantumY,
                rotation: quantumRotation,
                rotationX: -90 + (Math.random() * 20 - 10), // Subtle ground movement
                duration: 12 + Math.random() * 8,
                ease: "none",
                delay: index * 0.3
              })
            }
          })
        }
      }

      // PERFORMANCE-OPTIMIZED INTERVAL
      const quantumInterval = setInterval(quantumFieldAnimation, 15000)
      
      return () => {
        clearInterval(quantumInterval)
        if (groundFlipTimelineRef.current) groundFlipTimelineRef.current.kill()
        if (floatingTimelineRef.current) floatingTimelineRef.current.kill()
      }
    }

    initAdvancedFloatingSystem()
  }, [isHovering, calculateGroundFlipPhysics, calculateMagneticField])

  return (
    <div 
      ref={containerRef} 
      className="revolutionary-floating-system"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
        perspective: '1500px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {imageUrls.map((url, index) => (
        <div
          key={index}
          ref={el => imagesRef.current[index] = el}
          className="quantum-floating-image"
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '25px',
            overflow: 'hidden',
            border: '4px solid rgba(255, 107, 53, 0.4)',
            backdropFilter: 'blur(15px)',
            transformStyle: 'preserve-3d',
            willChange: 'transform, filter, opacity',
            isolation: 'isolate'
          }}
        >
          <Image
            src={url}
            alt={`Quantum floating image ${index + 1}`}
            fill
            sizes="140px"
            style={{
              objectFit: 'cover',
              transformStyle: 'preserve-3d',
              willChange: 'filter'
            }}
            priority={index < 3}
          />
          
          {/* QUANTUM OVERLAY EFFECTS */}
          <div
            className="quantum-overlay-primary"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `
                linear-gradient(
                  ${45 + index * 36}deg, 
                  rgba(255,107,53,0.15) 0%, 
                  rgba(247,147,30,0.1) 50%,
                  rgba(255,107,53,0.05) 100%
                )
              `,
              mixBlendMode: 'overlay',
              opacity: 0.8
            }}
          />
          
          {/* HOLOGRAPHIC SHIMMER EFFECT */}
          <div
            className="holographic-shimmer"
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `
                linear-gradient(
                  ${index * 60}deg,
                  transparent 0%,
                  rgba(255,255,255,0.1) 30%,
                  rgba(255,107,53,0.2) 50%,
                  rgba(255,255,255,0.1) 70%,
                  transparent 100%
                )
              `,
              animation: `shimmer-${index} ${3 + index * 0.5}s linear infinite`,
              transformStyle: 'preserve-3d'
            }}
          />
          
          {/* QUANTUM PARTICLES EFFECT */}
          <div
            className="quantum-particles"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(circle at ${20 + index * 15}% ${30 + index * 10}%, 
                  rgba(255,107,53,0.3) 0%, transparent 30%),
                radial-gradient(circle at ${60 + index * 10}% ${70 + index * 15}%, 
                  rgba(247,147,30,0.2) 0%, transparent 25%)
              `,
              animation: `particles-${index} ${4 + index * 0.3}s ease-in-out infinite alternate`,
              mixBlendMode: 'screen'
            }}
          />
        </div>
      ))}

      {/* DYNAMIC CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes shimmer-0 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(360deg); } }
        @keyframes shimmer-1 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(320deg); } }
        @keyframes shimmer-2 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(280deg); } }
        @keyframes shimmer-3 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(240deg); } }
        @keyframes shimmer-4 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(200deg); } }
        @keyframes shimmer-5 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(160deg); } }
        @keyframes shimmer-6 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(120deg); } }
        @keyframes shimmer-7 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(80deg); } }
        @keyframes shimmer-8 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(40deg); } }
        @keyframes shimmer-9 { 0% { transform: translateX(-200%) rotate(0deg); } 100% { transform: translateX(200%) rotate(0deg); } }
        
        @keyframes particles-0 { 0% { opacity: 0.2; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.1); } }
        @keyframes particles-1 { 0% { opacity: 0.1; transform: scale(0.9); } 100% { opacity: 0.5; transform: scale(1.2); } }
        @keyframes particles-2 { 0% { opacity: 0.3; transform: scale(1.1); } 100% { opacity: 0.7; transform: scale(0.9); } }
        @keyframes particles-3 { 0% { opacity: 0.2; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.3); } }
        @keyframes particles-4 { 0% { opacity: 0.1; transform: scale(0.8); } 100% { opacity: 0.4; transform: scale(1.1); } }
        @keyframes particles-5 { 0% { opacity: 0.3; transform: scale(1.2); } 100% { opacity: 0.8; transform: scale(0.9); } }
        @keyframes particles-6 { 0% { opacity: 0.2; transform: scale(1); } 100% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes particles-7 { 0% { opacity: 0.1; transform: scale(0.9); } 100% { opacity: 0.6; transform: scale(1.2); } }
        @keyframes particles-8 { 0% { opacity: 0.3; transform: scale(1.1); } 100% { opacity: 0.7; transform: scale(0.8); } }
        @keyframes particles-9 { 0% { opacity: 0.2; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.1); } }
        
        .quantum-floating-image {
          transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .revolutionary-floating-system {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}
