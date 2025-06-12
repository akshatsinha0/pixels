'use client'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const aboutRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const initCinematicScrollAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { SplitText } = await import('gsap/SplitText')
      const { TextPlugin } = await import('gsap/TextPlugin')
      
      gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)

      // REVOLUTIONARY TEXT SPLITTING AND REVEAL SYSTEM
      const aboutTexts = document.querySelectorAll('.cinematic-text')
      const skillItems = document.querySelectorAll('.quantum-skill-item')
      
      // Create split text instances for each paragraph
      const splitInstances = []
      aboutTexts.forEach((text, index) => {
        const split = new SplitText(text, { 
          type: 'words,chars,lines',
          linesClass: 'line-wrapper'
        })
        splitInstances.push(split)

        // Set initial states for characters
        gsap.set(split.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: '50% 100%',
          scale: 0.3
        })
      })

      // MASTER TIMELINE FOR ORCHESTRATED ANIMATIONS
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: false,
          onEnter: () => setIsInView(true),
          onLeave: () => setIsInView(false),
          onEnterBack: () => setIsInView(true),
          onLeaveBack: () => setIsInView(false)
        }
      })

      // SECTION TITLE CINEMATIC REVEAL
      const titleSplit = new SplitText('.about-title', { type: 'words,chars' })
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 150,
        rotationY: 90,
        transformOrigin: '50% 50%'
      })

      masterTimeline
        .to(titleSplit.chars, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(2)",
          transformOrigin: '50% 50%'
        })

      // LEFT-TO-RIGHT TEXT REVEAL (First paragraph)
      if (splitInstances[0]) {
        masterTimeline
          .to(splitInstances[0].chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 1.5,
              from: "start",
              ease: "power2.out"
            },
            ease: "elastic.out(1, 0.5)"
          }, "-=0.3")
      }

      // RIGHT-TO-LEFT TEXT REVEAL (Second paragraph)
      if (splitInstances[1]) {
        masterTimeline
          .to(splitInstances[1].chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 1.5,
              from: "end",
              ease: "power2.out"
            },
            ease: "elastic.out(1, 0.5)"
          }, "-=1")
      }

      // QUANTUM SKILLS CONSTELLATION ANIMATION
      skillItems.forEach((skill, index) => {
        const angle = (index / skillItems.length) * Math.PI * 2
        const radius = 200
        const startX = Math.cos(angle) * radius
        const startY = Math.sin(angle) * radius

        gsap.set(skill, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0,
          rotation: Math.random() * 360
        })

        masterTimeline
          .to(skill, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.1
          }, "-=1.5")
      })

      // FLOATING PARTICLE BACKGROUND ANIMATION
      const createFloatingParticles = () => {
        const particleContainer = document.querySelector('.particle-container')
        if (!particleContainer) return

        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div')
          particle.className = 'floating-particle'
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `
          particleContainer.appendChild(particle)

          // Animate each particle
          gsap.to(particle, {
            y: `random(-50, 50)`,
            x: `random(-50, 50)`,
            duration: `random(8, 15)`,
            repeat: -1,
            yoyo: true,
            ease: "none"
          })
        }
      }

      createFloatingParticles()

      // CONTINUOUS MORPHING BACKGROUND GRADIENT
      const morphingGradient = () => {
        gsap.to('.morphing-bg', {
          background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                      rgba(255, 107, 53, 0.1) 0%, 
                      rgba(247, 147, 30, 0.05) 50%, 
                      transparent 70%)`,
          duration: 8,
          ease: "none",
          onComplete: morphingGradient
        })
      }

      morphingGradient()

      // EXPERTISE SECTION REVEAL WITH PHYSICS
      const expertiseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.expertise-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      })

      expertiseTimeline
        .from('.expertise-title', {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
          duration: 1,
          ease: "back.out(2)"
        })
        .from('.skill-constellation', {
          opacity: 0,
          scale: 0,
          rotation: 360,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.5")

      return () => {
        splitInstances.forEach(split => split.revert())
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    initCinematicScrollAnimations()
  }, [])

  const skills = [
    { name: 'UI/UX Design', level: 95, color: '#ff6b35' },
    { name: 'Web Development', level: 90, color: '#f7931e' },
    { name: 'Brand Identity', level: 88, color: '#ff6b35' },
    { name: 'Motion Graphics', level: 92, color: '#f7931e' },
    { name: 'Digital Strategy', level: 85, color: '#ff6b35' },
    { name: '3D Visualization', level: 87, color: '#f7931e' }
  ]

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="morphing-bg"></div>
      <div className="particle-container"></div>
      
      <div className="section">
        <h2 className="about-title section-title savate-display">About Pixelate</h2>
        
        <div className="cinematic-content">
          <div className="story-grid">
            <div className="story-column left-story">
              <div className="story-wrapper">
                <p className="cinematic-text savate-body">
                  We are a collective of creative minds passionate about pushing the boundaries 
                  of digital design. Our mission is to transform ideas into engaging digital 
                  experiences that inspire and connect across infinite possibilities.
                </p>
              </div>
            </div>
            
            <div className="story-column right-story">
              <div className="story-wrapper">
                <p className="cinematic-text savate-body">
                  From concept to execution, we blend artistic vision with technical expertise 
                  to deliver solutions that not only look exceptional but perform flawlessly 
                  across all platforms, creating digital magic that transcends expectations.
                </p>
              </div>
            </div>
          </div>

          <div className="expertise-section">
            <h3 className="expertise-title savate-display">Our Quantum Expertise</h3>
            <div className="skill-constellation">
              {skills.map((skill, index) => (
                <div key={index} className="quantum-skill-item">
                  <div className="skill-orb">
                    <div className="skill-glow" style={{ background: skill.color }}></div>
                    <div className="skill-content">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">
                        <div 
                          className="skill-progress" 
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                          }}
                        ></div>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 10rem 2rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg, 
            rgba(10, 10, 10, 0.95) 0%, 
            rgba(20, 20, 30, 0.95) 100%
          );
        }

        .morphing-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .particle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .section {
          position: relative;
          z-index: 3;
          max-width: 1400px;
          margin: 0 auto;
        }

        .about-title {
          font-size: clamp(3rem, 8vw, 8rem);
          margin-bottom: 6rem;
          text-align: center;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.3));
        }

        .cinematic-content {
          position: relative;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          margin-bottom: 8rem;
          align-items: center;
        }

        .story-column {
          position: relative;
        }

        .story-wrapper {
          position: relative;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          border: 1px solid rgba(255, 107, 53, 0.2);
          overflow: hidden;
        }

        .story-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 107, 53, 0.1),
            transparent
          );
          transition: left 0.8s ease;
        }

        .story-wrapper:hover::before {
          left: 100%;
        }

        .cinematic-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #cccccc;
          margin: 0;
          position: relative;
        }

        .left-story .story-wrapper {
          transform: perspective(1000px) rotateY(-5deg);
          margin-right: -2rem;
        }

        .right-story .story-wrapper {
          transform: perspective(1000px) rotateY(5deg);
          margin-left: -2rem;
        }

        .expertise-section {
          text-align: center;
          margin-top: 8rem;
        }

        .expertise-title {
          font-size: clamp(2rem, 5vw, 4rem);
          margin-bottom: 4rem;
          color: #ff6b35;
          position: relative;
        }

        .expertise-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #ff6b35, #f7931e);
          border-radius: 2px;
        }

        .skill-constellation {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .quantum-skill-item {
          position: relative;
          cursor: none;
        }

        .skill-orb {
          position: relative;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border-radius: 25px;
          border: 1px solid rgba(255, 107, 53, 0.3);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .skill-orb:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 107, 53, 0.6);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(255, 107, 53, 0.2);
        }

        .skill-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(30px);
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        .skill-orb:hover .skill-glow {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(1.5);
        }

        .skill-content {
          position: relative;
          z-index: 2;
        }

        .skill-name {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
          font-family: 'Savate', sans-serif;
        }

        .skill-level {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin: 1rem 0;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          border-radius: 3px;
          transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .skill-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .skill-percentage {
          font-size: 0.9rem;
          color: #ff6b35;
          font-weight: 600;
        }

        .floating-particle {
          animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(0px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }

        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .left-story .story-wrapper,
          .right-story .story-wrapper {
            transform: none;
            margin: 0;
          }

          .skill-constellation {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .cinematic-text {
            font-size: 1.1rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  )
}
