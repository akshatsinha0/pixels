'use client'
import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Domains from './components/Domains'
import Events from './components/Events'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import BoardMembers from './components/BoardMembers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import MagneticCursor from './components/MagneticCursor'
import ParticleField from './components/ParticleField'
import FloatingImages from './components/FloatingImages'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)

  useEffect(() => {
    const initializeInnovations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { ScrollSmoother } = await import('gsap/ScrollSmoother')
      const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')
      
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin)

      // Preloader Animation Sequence
      const preloaderTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
          document.getElementById('preloader').style.display = 'none'
        }
      })

      // Logo Drawing Animation
      preloaderTl
        .set('#logo-path', { drawSVG: '0%' })
        .to('#logo-path', { 
          drawSVG: '100%', 
          duration: 3, 
          ease: "power2.inOut" 
        })
        .from('.logo-text', {
          opacity: 0,
          scale: 0.5,
          rotation: 360,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)"
        }, "-=1")
        .from('.loading-text', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out"
        }, "-=0.5")
        .to('#preloader', {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          delay: 1,
          ease: "power3.inOut"
        })

      // Initialize Smooth Scrolling
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
      })
    }

    initializeInnovations()
  }, [])

  if (isLoading) {
    return null // Preloader will show
  }

  return (
    <main ref={mainRef} className="main-container">
      <ParticleField />
      <FloatingImages />
      <MagneticCursor />
      <Navigation />
      <Hero />
      <Menu />
      <About />
      <Domains />
      <Events />
      <Projects />
      <Gallery />
      <BoardMembers />
      <Contact />
      <Footer />
    </main>
  )
}
