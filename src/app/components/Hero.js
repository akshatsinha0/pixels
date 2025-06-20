'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const initHeroAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { SplitText } = await import('gsap/SplitText')
      
      gsap.registerPlugin(ScrollTrigger, SplitText)

      // Split text into characters
      const split = new SplitText(titleRef.current, { type: 'chars' })
      
      // Character animation
      gsap.fromTo(split.chars, {
        y: 100,
        opacity: 0,
        rotation: 15,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: "back.out(1.7)",
        delay: 0.5
      })

      // Parallax background effect
      gsap.to('.hero-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // 3D tilt effect on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        
        const xPercent = (clientX / innerWidth - 0.5) * 2
        const yPercent = (clientY / innerHeight - 0.5) * 2
        
        gsap.to(titleRef.current, {
          rotationY: xPercent * 5,
          rotationX: -yPercent * 5,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      if (heroRef.current) {
        heroRef.current.addEventListener('mousemove', handleMouseMove)
      }

      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener('mousemove', handleMouseMove)
        }
      }
    }

    initHeroAnimations()
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg"></div>
      <div className="section">
        <div className="hero-content">
          <h1 
            ref={titleRef} 
            className="hero-title savate-display"
            style={{ perspective: '1000px' }}
          >
            PIXELATE
          </h1>
          <div className="hero-subtitle-container">
            <p className="hero-subtitle savate-body glitch-text" data-text="REVOLUTIONARY DIGITAL COLLECTIVE">
              Revolutionary digital collective crafting immersive experiences through 
              bleeding-edge technology and fearless creativity.
            </p>
          </div>
          <div className="hero-cta">
            <a 
              href="#projects" 
              className="morph-btn magnetic"
              data-cursor-text="Explore Magic"
            >
              <span>Experience Our Universe</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          perspective: 1000px;
        }

        .hero-bg {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: 
            radial-gradient(circle at 30% 40%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(247, 147, 30, 0.15) 0%, transparent 50%);
          z-index: -1;
        }

        .hero-content {
          text-align: center;
          width: 100%;
          z-index: 2;
        }

        .hero-subtitle-container {
          margin: 3rem 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          color: #cccccc;
          line-height: 1.4;
        }

        .hero-cta {
          margin-top: 4rem;
        }

        .morph-btn svg {
          margin-left: 1rem;
          transition: transform 0.3s ease;
        }

        .morph-btn:hover svg {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(3rem, 10vw, 6rem);
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
