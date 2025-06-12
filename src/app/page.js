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
    const loadScrollToPlugin = async () => {
      const { gsap } = await import("gsap")
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin")
      gsap.registerPlugin(ScrollToPlugin)
    }

    loadScrollToPlugin()
  }, [])

  useEffect(() => {
    const initializeInnovations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { ScrollSmoother } = await import('gsap/ScrollSmoother')
      const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')
      
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin)

      
      const preloaderTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
          const preloader = document.getElementById('preloader')
          if (preloader) {
            preloader.style.display = 'none'
          }
        }
      })

      
      const logoPath = document.querySelector('#logo-path')
      const logoText = document.querySelector('.logo-text')
      const loadingText = document.querySelector('.loading-text')
      const preloaderElement = document.querySelector('#preloader')

      if (logoPath && logoText && loadingText && preloaderElement) {
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
      } else {
        
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      }

      
      const smoothWrapper = document.querySelector("#smooth-wrapper")
      const smoothContent = document.querySelector("#smooth-content")
      
      if (smoothWrapper && smoothContent) {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5, 
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: false, 
          ignoreMobileResize: true 
        })
      }
    }

    
    const timer = setTimeout(() => {
      initializeInnovations()
    }, 100)

    return () => {
      clearTimeout(timer)
      
      if (typeof window !== 'undefined') {
        const ScrollTrigger = window.ScrollTrigger
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
      }
    }
  }, [])

  
  if (isLoading) {
    return (
      <div id="preloader">
        <div className="logo-container">
          <svg viewBox="0 0 400 200" className="animated-logo">
            <path 
              id="logo-path" 
              d="M50,150 Q100,50 150,150 T250,150 Q300,50 350,150" 
              stroke="#ff6b35" 
              strokeWidth="4" 
              fill="none" 
            />
            <text x="200" y="100" textAnchor="middle" className="logo-text">
              PIXELATE
            </text>
          </svg>
          <div className="loading-text">Crafting Digital Dreams...</div>
        </div>
      </div>
    )
  }

  return (
    <main ref={mainRef} className="main-container">
      {}
      <ParticleField />
      <FloatingImages />
      
      {}
      <MagneticCursor />
      
      {}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {}
          <Navigation />
          
          {}
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
        </div>
      </div>
    </main>
  )
}
