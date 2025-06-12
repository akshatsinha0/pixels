'use client'
import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const cursor = cursorRef.current
    const follower = followerRef.current
    const cursorText = textRef.current

    if (!cursor || !follower || !cursorText) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let followerX = 0, followerY = 0

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      if (cursor && follower) {
        cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`
        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`
      }

      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      // Use clientX/Y instead of pageX/Y for ScrollSmoother compatibility
      mouseX = e.clientX
      mouseY = e.clientY

      if (cursorText) {
        cursorText.style.left = e.clientX + 'px'
        cursorText.style.top = e.clientY - 50 + 'px'
      }
    }

    // Attach to document.body instead of document for better ScrollSmoother compatibility
    document.body.addEventListener('mousemove', handleMouseMove, { passive: true })
    updateCursor()

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="magnetic-cursor-main"
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          backgroundColor: '#ff6b35',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483647,
          mixBlendMode: 'difference',
          willChange: 'transform',
          top: 0,
          left: 0
        }}
      />
      <div 
        ref={followerRef} 
        className="magnetic-cursor-follower"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255, 107, 53, 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483646,
          willChange: 'transform',
          top: 0,
          left: 0
        }}
      />
      <div 
        ref={textRef} 
        className="magnetic-cursor-text"
        style={{
          position: 'fixed',
          background: 'rgba(255, 107, 53, 0.9)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          pointerEvents: 'none',
          zIndex: 2147483645,
          opacity: 0,
          transform: 'translateX(-50%) translateY(-100%)',
          transition: 'all 0.3s ease'
        }}
      />
    </>
  )
}
