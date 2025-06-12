'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Domains() {
  const domainsRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const initGodLevelDomainAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { SplitText } = await import('gsap/SplitText')
      const { Physics2DPlugin } = await import('gsap/Physics2DPlugin')
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin')
      
      gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin, MotionPathPlugin)

      // QUANTUM FLOATING CARDS SYSTEM
      const domainCards = document.querySelectorAll('.quantum-domain-card')
      const domainLogos = document.querySelectorAll('.domain-logo')
      
      // Initialize cards in quantum field (scattered across space-time)
      domainCards.forEach((card, index) => {
        const angle = (index / domainCards.length) * Math.PI * 2
        const radius = 800
        const startX = Math.cos(angle) * radius
        const startY = Math.sin(angle) * radius
        
        gsap.set(card, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0.1,
          rotation: Math.random() * 720 - 360,
          rotationX: Math.random() * 180 - 90,
          rotationY: Math.random() * 180 - 90,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          z: -500
        })

        // Logo quantum entanglement initialization
        const logo = card.querySelector('.domain-logo')
        if (logo) {
          gsap.set(logo, {
            scale: 0,
            rotation: 360,
            opacity: 0,
            filter: 'blur(20px) brightness(0.3)'
          })
        }
      })

      // SCROLL-TRIGGERED QUANTUM CONVERGENCE
      ScrollTrigger.create({
        trigger: domainsRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          setIsInView(true)
          initQuantumCardConvergence()
        },
        onLeave: () => setIsInView(false),
        onEnterBack: () => {
          setIsInView(true)
          initQuantumCardConvergence()
        },
        onLeaveBack: () => setIsInView(false)
      })

      // REVOLUTIONARY QUANTUM CONVERGENCE ANIMATION
      const initQuantumCardConvergence = () => {
        const masterTimeline = gsap.timeline()

        domainCards.forEach((card, index) => {
          const delay = index * 0.3
          const logo = card.querySelector('.domain-logo')
          
          // PHASE 1: Quantum teleportation to position
          masterTimeline.to(card, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            z: 0,
            duration: 2.5,
            ease: "power4.out",
            delay: delay,
            onComplete: () => {
              // Add floating animation
              gsap.to(card, {
                y: "random(-15, 15)",
                rotation: "random(-2, 2)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              })
            }
          }, 0)

          // PHASE 2: Logo materialization with quantum effects
          if (logo) {
            masterTimeline.to(logo, {
              scale: 1,
              rotation: 0,
              opacity: 1,
              filter: 'blur(0px) brightness(1)',
              duration: 1.8,
              ease: "elastic.out(1, 0.3)",
              delay: delay + 0.5
            }, 0)
          }

          // PHASE 3: Particle burst effect on arrival
          masterTimeline.call(() => {
            createCardParticleBurst(card)
          }, null, delay + 1)

          // PHASE 4: Holographic scan effect
          masterTimeline.call(() => {
            createHolographicScan(card)
          }, null, delay + 1.5)
        })
      }

      // PARTICLE BURST SYSTEM
      const createCardParticleBurst = (card) => {
        const particleCount = 20
        const rect = card.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div')
          particle.className = 'quantum-particle'
          particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: radial-gradient(circle, #ff6b35, #f7931e);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
          `
          document.body.appendChild(particle)

          const angle = (i / particleCount) * Math.PI * 2
          const velocity = Math.random() * 150 + 50
          const endX = centerX + Math.cos(angle) * velocity
          const endY = centerY + Math.sin(angle) * velocity

          gsap.to(particle, {
            x: endX - centerX,
            y: endY - centerY,
            scale: 0,
            opacity: 0,
            duration: Math.random() * 1.5 + 0.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
          })
        }
      }

      // HOLOGRAPHIC SCAN EFFECT
      const createHolographicScan = (card) => {
        const scanLine = document.createElement('div')
        scanLine.className = 'holographic-scan'
        scanLine.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          box-shadow: 0 0 20px #00ffff;
          z-index: 10;
        `
        card.appendChild(scanLine)

        gsap.fromTo(scanLine, 
          { y: 0, opacity: 0 },
          { 
            y: card.offsetHeight,
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => scanLine.remove()
          }
        )
      }

      // CONTINUOUS AMBIENT ANIMATIONS
      const createAmbientEffects = () => {
        // Floating energy orbs
        for (let i = 0; i < 10; i++) {
          const orb = document.createElement('div')
          orb.className = 'energy-orb'
          orb.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: radial-gradient(circle, rgba(255,107,53,0.6), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `
          
          const container = document.querySelector('.domains-ambient-container')
          if (container) {
            container.appendChild(orb)

            gsap.to(orb, {
              x: `random(-100, 100)`,
              y: `random(-100, 100)`,
              scale: `random(0.5, 1.5)`,
              opacity: `random(0.2, 0.8)`,
              duration: `random(5, 10)`,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            })
          }
        }
      }

      createAmbientEffects()

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    initGodLevelDomainAnimations()
  }, [])

  const domains = [
    {
      title: 'Design',
      description: 'Crafting visual symphonies that transcend the ordinary. Our design alchemists transform concepts into breathtaking realities through pixel-perfect precision and boundless creativity.',
      logoPath: '/DomainImages/PaintPallette.png',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e, #ff1744)',
      skills: ['UI/UX Mastery', 'Visual Storytelling', 'Brand Alchemy', 'Motion Poetry', 'Color Psychology'],
      opportunities: 'International design competitions, Fortune 500 client projects, Adobe partnership programs'
    },
    {
      title: 'Tech',
      description: 'Engineering the impossible through lines of code that bend reality. Our digital architects build tomorrow\'s solutions using today\'s cutting-edge technologies and quantum innovation.',
      logoPath: '/DomainImages/LaptopLogo.png',
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35, #9c27b0)',
      skills: ['Full-Stack Sorcery', 'AI Integration', 'Blockchain Innovation', 'Cloud Architecture', 'Quantum Computing'],
      opportunities: 'Silicon Valley internships, startup incubators, Google Developer programs, patent applications'
    },
    {
      title: 'PR & Sponsorship',
      description: 'Amplifying voices across the digital cosmos. Our communication virtuosos orchestrate campaigns that resonate through every channel, creating ripples that become waves of change.',
      logoPath: '/DomainImages/Horn.png',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e, #4caf50)',
      skills: ['Viral Campaign Mastery', 'Influencer Relations', 'Crisis Communication', 'Brand Evangelism', 'Media Psychology'],
      opportunities: 'Global brand partnerships, TED Talk opportunities, media house collaborations, startup PR leadership'
    },
    {
      title: 'Management',
      description: 'Orchestrating symphonies of success through visionary leadership. Our strategic masterminds transform chaos into order, guiding teams toward extraordinary achievements.',
      logoPath: '/DomainImages/ArcheryTarget.png',
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35, #ff5722)',
      skills: ['Visionary Leadership', 'Agile Mastery', 'Innovation Strategy', 'Team Orchestration', 'Future Forecasting'],
      opportunities: 'McKinsey leadership programs, startup founding opportunities, executive mentorship, board positions'
    }
  ]

  return (
    <section id="domains" className="domains-section" ref={domainsRef}>
      <div className="domains-ambient-container"></div>
      <div className="quantum-field-bg"></div>
      
      <div className="section">
        <h2 className="domains-title section-title savate-display">Domains</h2>
        
        <div className="domains-intro">
          <p className="intro-text savate-body">
            Four realms of infinite possibility where passion meets purpose, talent transforms into mastery, 
            and ordinary students evolve into extraordinary innovators.
          </p>
        </div>

        <div className="domains-grid">
          {domains.map((domain, index) => (
            <div key={index} className="quantum-domain-card magnetic" data-cursor-text={`Enter ${domain.title}`}>
              <div className="card-hologram"></div>
              <div className="card-energy-field"></div>
              
              <div className="domain-content">
                <div className="domain-logo-container">
                  <div 
                    className="domain-logo-bg"
                    style={{ background: domain.gradient }}
                  >
                    <Image
                      src={domain.logoPath}
                      alt={`${domain.title} Logo`}
                      width={80}
                      height={80}
                      className="domain-logo"
                      style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))'
                      }}
                    />
                  </div>
                  <div className="logo-energy-ring"></div>
                </div>
                
                <h3 className="domain-title savate-display">{domain.title}</h3>
                <p className="domain-description savate-body">{domain.description}</p>
                
                <div className="domain-skills">
                  <h4 className="skills-heading">Core Mastery</h4>
                  <div className="skills-constellation">
                    {domain.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-star">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="domain-opportunities">
                  <h4 className="opportunities-heading">Infinite Possibilities</h4>
                  <p className="opportunities-text">{domain.opportunities}</p>
                </div>
                
                <div className="quantum-portal-btn">
                  <span>Enter This Realm</span>
                  <div className="portal-energy"></div>
                </div>
              </div>
              
              <div className="quantum-particles-field"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .domains-section {
          padding: 12rem 2rem;
          position: relative;
          overflow: hidden;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,107,53,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(247,147,30,0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          perspective: 1500px;
        }

        .domains-ambient-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .quantum-field-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: quantumField 20s linear infinite;
          z-index: 1;
        }

        @keyframes quantumField {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-60px) translateY(-60px); }
        }

        .section {
          position: relative;
          z-index: 3;
          max-width: 1600px;
          margin: 0 auto;
        }

        .domains-title {
          font-size: clamp(4rem, 10vw, 12rem);
          margin-bottom: 4rem;
          text-align: center;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff1744, #9c27b0);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: quantumGradient 8s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.5));
          text-shadow: 0 0 60px rgba(255, 107, 53, 0.3);
        }

        @keyframes quantumGradient {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 50% 0%; }
        }

        .domains-intro {
          text-align: center;
          margin-bottom: 8rem;
        }

        .intro-text {
          font-size: 1.4rem;
          color: #e0e0e0;
          line-height: 1.9;
          max-width: 900px;
          margin: 0 auto;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .domains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 5rem;
          margin-bottom: 10rem;
        }

        .quantum-domain-card {
          position: relative;
          padding: 0;
          border-radius: 25px;
          cursor: none;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .quantum-domain-card:hover {
          transform: translateY(-20px) rotateX(8deg) rotateY(3deg) scale(1.02);
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.5),
            0 0 120px rgba(255, 107, 53, 0.3),
            inset 0 0 100px rgba(255, 255, 255, 0.05);
        }

        .card-hologram {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            transparent, 
            rgba(0, 255, 255, 0.2), 
            transparent, 
            rgba(255, 0, 255, 0.2), 
            transparent
          );
          border-radius: 25px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .quantum-domain-card:hover .card-hologram {
          opacity: 1;
          animation: hologramShift 2s ease-in-out infinite;
        }

        @keyframes hologramShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .card-energy-field {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255,107,53,0.1) 0%, transparent 70%);
          border-radius: 25px;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2;
        }

        .quantum-domain-card:hover .card-energy-field {
          opacity: 1;
          animation: energyPulse 3s ease-in-out infinite;
        }

        @keyframes energyPulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }

        .domain-content {
          padding: 4rem 3rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 25px;
          height: 100%;
          position: relative;
          z-index: 3;
          transition: all 0.5s ease;
        }

        .quantum-domain-card:hover .domain-content {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 107, 53, 0.5);
        }

        .domain-logo-container {
          position: relative;
          margin: 0 auto 3rem;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .domain-logo-bg {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 
            0 0 40px rgba(255, 107, 53, 0.4),
            inset 0 0 40px rgba(255, 255, 255, 0.1);
          transition: all 0.5s ease;
        }

        .quantum-domain-card:hover .domain-logo-bg {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 
            0 0 60px rgba(255, 107, 53, 0.8),
            inset 0 0 60px rgba(255, 255, 255, 0.2);
        }

        .domain-logo {
          transition: all 0.5s ease;
          z-index: 2;
        }

        .quantum-domain-card:hover .domain-logo {
          transform: scale(1.1);
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.8)) brightness(1.2);
        }

        .logo-energy-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid rgba(255, 107, 53, 0.3);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.5s ease;
          animation: energyRing 4s linear infinite;
        }

        .quantum-domain-card:hover .logo-energy-ring {
          opacity: 1;
        }

        @keyframes energyRing {
          0% { transform: rotate(0deg) scale(1); opacity: 0.3; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.3; }
        }

        .domain-title {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          color: #ff6b35;
          text-align: center;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
        }

        .domain-description {
          font-size: 1.15rem;
          color: #e0e0e0;
          line-height: 1.8;
          margin-bottom: 3rem;
          text-align: center;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .domain-skills {
          margin-bottom: 3rem;
        }

        .skills-heading {
          font-size: 1.2rem;
          color: #ff6b35;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-align: center;
        }

        .skills-constellation {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          justify-content: center;
        }

        .skill-star {
          padding: 0.6rem 1.2rem;
          background: rgba(255, 107, 53, 0.15);
          border: 1px solid rgba(255, 107, 53, 0.4);
          border-radius: 20px;
          font-size: 0.85rem;
          color: #ff6b35;
          font-weight: 600;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }

        .skill-star:hover::before {
          left: 100%;
        }

        .skill-star:hover {
          background: rgba(255, 107, 53, 0.3);
          border-color: rgba(255, 107, 53, 0.8);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
          color: #ffffff;
        }

        .domain-opportunities {
          margin-bottom: 3rem;
        }

        .opportunities-heading {
          font-size: 1.2rem;
          color: #f7931e;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-align: center;
        }

        .opportunities-text {
          font-size: 1rem;
          color: #cccccc;
          line-height: 1.7;
          text-align: center;
        }

        .quantum-portal-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 3rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff1744);
          background-size: 200% 200%;
          border-radius: 30px;
          color: #ffffff;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: none;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .quantum-portal-btn:hover {
          transform: translateY(-5px) scale(1.05);
          background-position: 100% 0%;
          box-shadow: 
            0 20px 50px rgba(255, 107, 53, 0.5),
            0 0 60px rgba(255, 107, 53, 0.3);
        }

        .portal-energy {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .quantum-portal-btn:hover .portal-energy {
          transform: translateX(100%);
        }

        .quantum-particles-field {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .quantum-domain-card:hover .quantum-particles-field {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .domains-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .domain-content {
            padding: 3rem 2rem;
          }

          .domain-logo-container {
            width: 100px;
            height: 100px;
          }

          .domain-logo-bg {
            width: 80px;
            height: 80px;
          }

          .quantum-domain-card:hover {
            transform: translateY(-10px) scale(1.02);
          }
        }
      `}</style>
    </section>
  )
}
