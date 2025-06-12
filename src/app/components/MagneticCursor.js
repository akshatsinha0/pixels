'use client'
import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const cursorText = textRef.current

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let followerX = 0, followerY = 0

    const updateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      if (cursor && follower) {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`
      }

      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (cursorText) {
        cursorText.style.left = e.clientX + 'px'
        cursorText.style.top = e.clientY - 50 + 'px'
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      const text = target.getAttribute('data-cursor-text')
      
      if (cursor && follower) {
        cursor.style.transform += ' scale(1.5)'
        follower.style.transform += ' scale(1.8)'
        follower.style.borderColor = '#ff6b35'
        follower.style.backgroundColor = 'rgba(255, 107, 53, 0.1)'
      }

      if (text && cursorText) {
        cursorText.textContent = text
        cursorText.style.opacity = '1'
        cursorText.style.transform = 'translateX(-50%) translateY(-100%) scale(1)'
      }

      // Magnetic effect for specific elements
      if (target.classList.contains('magnetic')) {
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        target.style.transform = `translate(${(mouseX - centerX) * 0.1}px, ${(mouseY - centerY) * 0.1}px)`
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      
      if (cursor && follower) {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '')
        follower.style.transform = follower.style.transform.replace(' scale(1.8)', '')
        follower.style.borderColor = 'rgba(255, 107, 53, 0.3)'
        follower.style.backgroundColor = 'transparent'
      }

      if (cursorText) {
        cursorText.style.opacity = '0'
        cursorText.style.transform = 'translateX(-50%) translateY(-100%) scale(0.8)'
      }

      if (target.classList.contains('magnetic')) {
        target.style.transform = 'translate(0px, 0px)'
      }
    }

    // Initialize
    updateCursor()
    document.addEventListener('mousemove', handleMouseMove)
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .morph-btn, .project-card, .magnetic')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="magnetic-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
      <div ref={textRef} className="cursor-text"></div>
    </>
  )
}
