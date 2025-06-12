'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e) => {
      if (cursor && follower) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
        
        setTimeout(() => {
          follower.style.left = e.clientX + 'px'
          follower.style.top = e.clientY + 'px'
        }, 100)
      }
    }

    const handleMouseEnter = () => {
      if (cursor && follower) {
        cursor.style.transform = 'scale(1.5)'
        follower.style.transform = 'scale(1.5)'
      }
    }

    const handleMouseLeave = () => {
      if (cursor && follower) {
        cursor.style.transform = 'scale(1)'
        follower.style.transform = 'scale(1)'
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', moveCursor)
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  )
}
