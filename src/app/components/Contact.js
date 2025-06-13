'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Contact() {
  const contactRef = useRef(null)
  const penRef = useRef(null)
  const textPathRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const initGodLevelContactAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin')
      const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')
      
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin)

      
      const penElement = penRef.current
      const textPath = textPathRef.current
      
      if (penElement && textPath) {
        
        gsap.set(penElement, {
          scale: 0,
          rotation: 45,
          transformOrigin: '50% 100%'
        })

        
        gsap.set('.text-path', {
          drawSVG: '0%'
        })

        
        const penWritingTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onStart: () => setIsAnimating(true),
            onComplete: () => setIsAnimating(false)
          }
        })

        
        penWritingTimeline
          .to(penElement, {
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          })
          
          .to(penElement, {
            motionPath: {
              path: textPath,
              align: textPath,
              alignOrigin: "0.5 1",
              autoRotate: true
            },
            duration: 6,
            ease: "none"
          }, "-=0.2")
          
          .to('.text-path', {
            drawSVG: '100%',
            duration: 6,
            ease: "none"
          }, "-=6")
          
          .to(penElement, {
            y: -50,
            rotation: 45 + 360,
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "power3.in"
          })
      }

      
      const formFields = document.querySelectorAll('.quantum-form-field')
      formFields.forEach((field, index) => {
        gsap.fromTo(field,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.5,
            delay: index * 0.2 + 2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      
      const contactInfo = document.querySelector('.contact-info-enhanced')
      if (contactInfo) {
        gsap.fromTo(contactInfo,
          {
            x: -200,
            opacity: 0,
            rotateY: -45,
            filter: 'blur(20px)'
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 2,
            delay: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      
      const createContactParticles = () => {
        const container = document.querySelector('.contact-particles-bg')
        if (!container) return

        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div')
          particle.className = 'contact-particle'
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: radial-gradient(circle, rgba(255,107,53,0.8), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `
          container.appendChild(particle)

          gsap.to(particle, {
            x: `random(-150, 150)`,
            y: `random(-150, 150)`,
            scale: `random(0.5, 2)`,
            opacity: `random(0.3, 0.8)`,
            rotation: `random(0, 360)`,
            duration: `random(10, 20)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      }

      createContactParticles()
    }

    initGodLevelContactAnimations()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    
    const { gsap } = await import('gsap')
    const submitBtn = document.querySelector('.quantum-submit-btn')
    
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
      
      
      gsap.to('.form-processing', {
        opacity: 1,
        duration: 0.3
      })
    }
    
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFieldFocus = async (e) => {
    const { gsap } = await import('gsap')
    const field = e.target
    
    gsap.to(field, {
      scale: 1.02,
      borderColor: 'rgba(255, 107, 53, 0.8)',
      boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleFieldBlur = async (e) => {
    const { gsap } = await import('gsap')
    const field = e.target
    
    gsap.to(field, {
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 0 rgba(255, 107, 53, 0)',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  return (
    <section id="contact" className="contact-section quantum-enhanced" ref={contactRef}>
      <div className="contact-particles-bg"></div>
      <div className="cosmic-contact-overlay"></div>
      
      <div className="section">
        {}
        <div className="pen-writing-container">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 1200 200"
            className="pen-writing-svg"
          >
            {}
            <path
              ref={textPathRef}
              d="M50,150 Q100,50 150,100 Q200,150 250,100 Q300,50 350,120 Q400,180 450,120 Q500,60 550,130 Q600,190 650,130 Q700,70 750,140 Q800,200 850,140 Q900,80 950,150 Q1000,220 1050,150 Q1100,90 1150,160"
              fill="none"
              stroke="transparent"
              strokeWidth="2"
              className="pen-path"
            />
            
            {}
            <path
              d="M50,150 Q100,50 150,100 Q200,150 250,100 Q300,50 350,120 Q400,180 450,120 Q500,60 550,130 Q600,190 650,130 Q700,70 750,140 Q800,200 850,140 Q900,80 950,150 Q1000,220 1050,150 Q1100,90 1150,160"
              fill="none"
              stroke="url(#inkGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-path"
            />
            
            {}
            <defs>
              <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#f7931e" />
                <stop offset="100%" stopColor="#ff1744" />
              </linearGradient>
            </defs>
          </svg>
          
          {}
          <div className="fountain-pen" ref={penRef}>
            <Image
              src="/fountainPen.png"
              alt="Fountain Pen"
              width={40}
              height={40}
              style={{
                width: '40px',
                height: '40px',
                filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.8))'
              }}
            />
            <div className="ink-trail"></div>
          </div>
          
          {}
          <h2 className="pen-written-title savate-display">Let's Create Together</h2>
        </div>

        <div className="contact-grid quantum-layout">
          {}
          <div className="contact-info-enhanced">
            <div className="info-hologram">
              <div className="hologram-lines"></div>
              <div className="info-content">
                <h3 className="info-title savate-display">Ready to Transcend Reality?</h3>
                <p className="info-description savate-body">
                  We transform impossibilities into digital masterpieces. Join us in creating 
                  experiences that redefine the boundaries between imagination and reality.
                </p>
                
                <div className="contact-methods">
                  <div className="contact-method quantum-card">
                    <div className="method-icon">📧</div>
                    <div className="method-content">
                      <strong className="method-label">Communication</strong>
                      <span className="method-value">hello@pixelateclub.com</span>
                    </div>
                    <div className="method-glow"></div>
                  </div>
                  
                  <div className="contact-method quantum-card">
                    <div className="method-icon">📍</div>
                    <div className="method-content">
                      <strong className="method-label"> Location </strong>
                      <span className="method-value">Innovation District, Digital Realm</span>
                    </div>
                    <div className="method-glow"></div>
                  </div>
                  
                  <div className="contact-method quantum-card">
                    <div className="method-icon">🌐</div>
                    <div className="method-content">
                      <strong className="method-label">Digital Presence</strong>
                      <div className="social-links">
                        <span className="social-link">Instagram</span>
                        <span className="social-link">LinkedIn</span>
                        <span className="social-link">Discord</span>
                      </div>
                    </div>
                    <div className="method-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {}
          <div className="quantum-form-container">
            <form onSubmit={handleSubmit} className="quantum-contact-form">
              <div className="form-processing">Processing your vision...</div>
              
              <div className="quantum-form-field">
                <div className="field-container">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    required
                    className="quantum-input"
                  />
                  <label className="quantum-label">Your Identity</label>
                  <div className="field-glow"></div>
                  <div className="field-particles"></div>
                </div>
              </div>
              
              <div className="quantum-form-field">
                <div className="field-container">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    required
                    className="quantum-input"
                  />
                  <label className="quantum-label">Digital Gateway</label>
                  <div className="field-glow"></div>
                  <div className="field-particles"></div>
                </div>
              </div>
              
              <div className="quantum-form-field">
                <div className="field-container">
                  <textarea
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    required
                    rows="5"
                    className="quantum-textarea"
                  />
                  <label className="quantum-label">Your Vision</label>
                  <div className="field-glow"></div>
                  <div className="field-particles"></div>
                </div>
              </div>
              
              <button type="submit" className="quantum-submit-btn magnetic">
                <span className="btn-content">Initiate Creation</span>
                <div className="btn-energy"></div>
                <div className="btn-particles"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 12rem 2rem;
          position: relative;
          overflow: hidden;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(255,107,53,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(247,147,30,0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
        }

        .quantum-enhanced {
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .contact-particles-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .cosmic-contact-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            conic-gradient(from 0deg at 50% 50%, 
              rgba(255,107,53,0.1) 0deg, 
              transparent 90deg, 
              rgba(247,147,30,0.1) 180deg, 
              transparent 270deg, 
              rgba(255,107,53,0.1) 360deg);
          animation: cosmicRotation 30s linear infinite;
          z-index: 1;
        }

        @keyframes cosmicRotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .section {
          position: relative;
          z-index: 3;
          max-width: 1600px;
          margin: 0 auto;
        }

        .pen-writing-container {
          position: relative;
          margin-bottom: 8rem;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pen-writing-svg {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .fountain-pen {
          position: absolute;
          z-index: 3;
          pointer-events: none;
        }

        .ink-trail {
          position: absolute;
          top: 100%;
          left: 50%;
          width: 3px;
          height: 20px;
          background: linear-gradient(to bottom, #ff6b35, transparent);
          transform: translateX(-50%);
          border-radius: 0 0 50% 50%;
          opacity: 0.8;
        }

        .pen-written-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(3rem, 8vw, 8rem);
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,107,53,0.3);
          z-index: 1;
          pointer-events: none;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        .quantum-layout {
          perspective: 1000px;
        }

        .contact-info-enhanced {
          position: relative;
          transform-style: preserve-3d;
        }

        .info-hologram {
          position: relative;
          padding: 4rem;
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(30px);
          border: 2px solid rgba(255,107,53,0.3);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 
            0 30px 80px rgba(0,0,0,0.4),
            0 0 100px rgba(255,107,53,0.2),
            inset 0 0 50px rgba(255,255,255,0.03);
        }

        .hologram-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(0,255,255,0.03) 1px,
            transparent 2px,
            transparent 10px
          );
          animation: hologramScan 3s linear infinite;
        }

        @keyframes hologramScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .info-content {
          position: relative;
          z-index: 2;
        }

        .info-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255,107,53,0.5));
        }

        .info-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #e0e0e0;
          margin-bottom: 3rem;
          text-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
        }

        .quantum-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,107,53,0.6);
          transform: translateY(-5px) rotateX(5deg);
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.3),
            0 0 50px rgba(255,107,53,0.3);
        }

        .method-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(255,107,53,0.5));
        }

        .method-content {
          flex-grow: 1;
        }

        .method-label {
          display: block;
          color: #ff6b35;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .method-value {
          color: #e0e0e0;
          font-size: 1.1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          color: #ff6b35;
          font-size: 0.9rem;
          padding: 0.3rem 0.8rem;
          background: rgba(255,107,53,0.1);
          border-radius: 15px;
          transition: all 0.3s ease;
          cursor: none;
        }

        .social-link:hover {
          background: rgba(255,107,53,0.2);
          transform: translateY(-2px);
        }

        .method-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,107,53,0.1), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-method:hover .method-glow {
          opacity: 1;
          animation: methodGlow 2s ease-in-out infinite;
        }

        @keyframes methodGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
        }

        .quantum-form-container {
          position: relative;
          transform-style: preserve-3d;
        }

        .quantum-contact-form {
          position: relative;
          padding: 4rem;
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(30px);
          border: 2px solid rgba(255,107,53,0.3);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 
            0 30px 80px rgba(0,0,0,0.4),
            0 0 100px rgba(255,107,53,0.2),
            inset 0 0 50px rgba(255,255,255,0.03);
        }

        .form-processing {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #ff6b35;
          font-size: 1.2rem;
          opacity: 0;
          z-index: 10;
          transition: opacity 0.3s ease;
        }

        .quantum-form-field {
          margin-bottom: 3rem;
          position: relative;
        }

        .field-container {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
        }

        .quantum-input,
        .quantum-textarea {
          width: 100%;
          padding: 1.5rem 2rem;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          color: #ffffff;
          font-size: 1.1rem;
          font-family: 'Savate', sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          resize: vertical;
        }

        .quantum-input:focus,
        .quantum-textarea:focus {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,107,53,0.6);
          transform: translateY(-2px);
        }

        .quantum-label {
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          transition: all 0.3s ease;
          pointer-events: none;
          font-family: 'Savate', sans-serif;
        }

        .quantum-input:focus + .quantum-label,
        .quantum-input:not(:placeholder-shown) + .quantum-label,
        .quantum-textarea:focus + .quantum-label,
        .quantum-textarea:not(:placeholder-shown) + .quantum-label {
          top: -0.5rem;
          left: 1.5rem;
          font-size: 0.8rem;
          color: #ff6b35;
          background: rgba(10,10,10,0.9);
          padding: 0 0.5rem;
          border-radius: 10px;
        }

        .field-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(255,107,53,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px;
        }

        .quantum-input:focus ~ .field-glow,
        .quantum-textarea:focus ~ .field-glow {
          opacity: 1;
          animation: fieldGlow 2s ease-in-out infinite;
        }

        @keyframes fieldGlow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        .field-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          border-radius: 20px;
        }

        .quantum-submit-btn {
          width: 100%;
          padding: 2rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff1744);
          background-size: 200% 200%;
          border: none;
          border-radius: 25px;
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 700;
          font-family: 'Savate', sans-serif;
          cursor: none;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 
            0 20px 60px rgba(255,107,53,0.3),
            0 0 50px rgba(255,107,53,0.2);
        }

        .quantum-submit-btn:hover {
          background-position: 100% 0%;
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 30px 80px rgba(255,107,53,0.4),
            0 0 80px rgba(255,107,53,0.3);
        }

        .btn-content {
          position: relative;
          z-index: 2;
        }

        .btn-energy {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .quantum-submit-btn:hover .btn-energy {
          left: 100%;
        }

        .btn-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 30%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .quantum-submit-btn:hover .btn-particles {
          opacity: 1;
          animation: btnParticles 2s ease-in-out infinite;
        }

        @keyframes btnParticles {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .pen-written-title {
            font-size: clamp(2rem, 6vw, 4rem);
          }

          .info-hologram,
          .quantum-contact-form {
            padding: 3rem;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 8rem 1rem;
          }

          .contact-methods {
            gap: 1.5rem;
          }

          .contact-method {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .social-links {
            justify-content: center;
          }

          .info-hologram,
          .quantum-contact-form {
            padding: 2rem;
          }

          .quantum-form-field {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
