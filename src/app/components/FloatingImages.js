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

  
  const calculateGroundFlipPhysics = useCallback((index, mouseX, mouseY, imgElement) => {
    if (!imgElement) return {}

    const rect = imgElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + 
      Math.pow(mouseY - centerY, 2)
    )
    
    
    const maxDistance = 400
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    const flipIntensity = 1 - normalizedDistance
    
    
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX)
    const rotationForce = flipIntensity * 180 
    
    
    const perspectiveZ = flipIntensity * 150
    const rotationX = flipIntensity * -90 
    
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

  
  const calculateMagneticField = useCallback((mouseX, mouseY, imageElements) => {
    const magneticFields = {}
    
    imageElements.forEach((img, index) => {
      if (!img) return
      
      const rect = img.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      
      const dx = mouseX - centerX
      const dy = mouseY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      
      const fieldStrength = Math.max(0, 500 - distance) / 500
      const magneticForce = fieldStrength * 100
      
      
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
      const { Physics2DPlugin } = await import('gsap/Physics2DPlugin') 
      
      gsap.registerPlugin(ScrollTrigger, Physics2DPlugin)
      
      const container = containerRef.current
      if (!container) return

      
      imagesRef.current.forEach((img, index) => {
        if (img) {
          const randomX = Math.random() * (window.innerWidth - 120)
          const randomY = Math.random() * (window.innerHeight - 120)
          const randomRotation = Math.random() * 360
          
          gsap.set(img, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            rotationX: -90, 
            rotationY: 0,
            rotationZ: 0,
            scale: 0.6,
            opacity: 0.1,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            perspective: 1000,
            z: -100, 
            filter: "blur(2px) brightness(0.3) contrast(0.8)"
          })
        }
      })

      
      let mouseTracker = { x: 0, y: 0, vx: 0, vy: 0 }
      let lastMouseTime = Date.now()
      
      const advancedMouseHandler = (e) => {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastMouseTime
        
        
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
          
          imagesRef.current.forEach((img, index) => {
            if (!img) return
            
            const flipPhysics = calculateGroundFlipPhysics(index, e.clientX, e.clientY, img)
            const magneticField = calculateMagneticField(e.clientX, e.clientY, imagesRef.current)[index]
            
            if (!magneticField) return
            
            
            const combinedTransform = {
              
              rotationX: flipPhysics.rotationX + (flipPhysics.intensity * 90), 
              rotationY: flipPhysics.rotationY + (Math.sin(Date.now() * 0.001 + index) * 15),
              rotationZ: flipPhysics.rotationZ + magneticField.rotationalVelocity * 0.01,
              
              
              x: magneticField.orbitalX + (Math.sin(Date.now() * 0.002 + index) * 20),
              y: magneticField.orbitalY + (Math.cos(Date.now() * 0.002 + index) * 15),
              z: flipPhysics.translateZ + (flipPhysics.intensity * 200),
              
              
              scale: flipPhysics.scale + (magneticField.fieldStrength * 0.3),
              opacity: flipPhysics.opacity + (magneticField.fieldStrength * 0.2),
              
              
              filter: `blur(${2 - flipPhysics.intensity * 2}px) brightness(${0.3 + flipPhysics.intensity * 0.7}) contrast(${0.8 + flipPhysics.intensity * 0.4}) saturate(${0.5 + flipPhysics.intensity * 0.8})`,
              
              
              boxShadow: `
                0 ${flipPhysics.translateZ * 0.3}px ${flipPhysics.translateZ * 0.6}px rgba(0,0,0,${0.1 + flipPhysics.intensity * 0.4}),
                0 0 ${flipPhysics.intensity * 50}px rgba(255,107,53,${flipPhysics.intensity * 0.3}),
                inset 0 0 ${flipPhysics.intensity * 20}px rgba(255,255,255,${flipPhysics.intensity * 0.1})
              `
            }
            
            
            gsap.to(img, {
              ...combinedTransform,
              duration: 0.6 + (flipPhysics.intensity * 0.4),
              ease: flipPhysics.intensity > 0.5 ? "elastic.out(1, 0.3)" : "power2.out",
              transformOrigin: "center center",
              force3D: true 
            })
          })
        }
      }

      
      const heroSection = document.querySelector('#home')
      if (heroSection) {
        
        
        heroSection.addEventListener('mouseenter', () => {
          setIsHovering(true)
          
          
          if (groundFlipTimelineRef.current) groundFlipTimelineRef.current.kill()
          
          
          groundFlipTimelineRef.current = gsap.timeline({
            onComplete: () => setIsInitialized(true)
          })
          
          imagesRef.current.forEach((img, index) => {
            if (!img) return
            
            const delay = index * 0.08 
            const randomIntensity = 0.3 + Math.random() * 0.7
            
            groundFlipTimelineRef.current.to(img, {
              
              rotationX: 0, 
              rotationY: Math.random() * 30 - 15, 
              rotationZ: Math.random() * 20 - 10, 
              
              
              y: `-=${50 + Math.random() * 100}`, 
              z: 50 + Math.random() * 100, 
              scale: 0.9 + Math.random() * 0.3,
              opacity: 0.7 + Math.random() * 0.3,
              
              
              filter: `blur(0px) brightness(${0.8 + randomIntensity * 0.4}) contrast(1.2) saturate(1.1)`,
              
              
              duration: 1.2 + Math.random() * 0.8,
              ease: "elastic.out(1.2, 0.4)",
              force3D: true,
              
              
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.3),
                0 0 30px rgba(255,107,53,0.2),
                inset 0 0 15px rgba(255,255,255,0.1)
              `
            }, delay)
          })
        })

        
        heroSection.addEventListener('mouseleave', () => {
          setIsHovering(false)
          setIsInitialized(false)
          
          
          if (floatingTimelineRef.current) floatingTimelineRef.current.kill()
          
          
          gsap.to(imagesRef.current, {
            rotationX: -90, 
            rotationY: 0,
            rotationZ: '+=360', 
            z: -100, 
            scale: 0.6,
            opacity: 0.1,
            filter: "blur(2px) brightness(0.3) contrast(0.8)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 1.5,
            stagger: 0.05,
            ease: "power3.in"
          })
        })

        
        let mouseMoveTimeout
        heroSection.addEventListener('mousemove', (e) => {
          if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
          mouseMoveTimeout = setTimeout(() => advancedMouseHandler(e), 16) 
        })
      }

      
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
                rotationX: -90 + (Math.random() * 20 - 10), 
                duration: 12 + Math.random() * 8,
                ease: "none",
                delay: index * 0.3
              })
            }
          })
        }
      }

      
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
          
          {}
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
          
          {}
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
          
          {}
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

      {}
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
