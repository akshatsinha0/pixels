'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { gsap } from "gsap";
import React from 'react';

export default function BoardMembers() {
  const boardRef = useRef(null)
  const timelineRef = useRef(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [detailCard, setDetailCard] = useState(null)
  const cardRefs = useRef([])

  const ANIMATION_CONFIG = {
    SMOOTH_DURATION: 600,
    INITIAL_DURATION: 1500,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
  }

  const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max)
  const round = (value, precision = 3) => parseFloat(value.toFixed(precision))
  const adjust = (value, fromMin, fromMax, toMin, toMax) => 
    round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))
  const easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

  useEffect(() => {
    const initGodLevelBoardAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.central-timeline', 
        {
          scaleY: 0,
          transformOrigin: 'top',
          filter: 'blur(20px) brightness(0.3)'
        },
        {
          scaleY: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 3,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: boardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const leftMembers = document.querySelectorAll('.board-member.left')
      const rightMembers = document.querySelectorAll('.board-member.right')

      leftMembers.forEach((member, index) => {
        gsap.fromTo(member,
          {
            x: -800,
            opacity: 0,
            rotateY: -180,
            rotateX: 45,
            rotateZ: 30,
            scale: 0.1,
            filter: 'blur(30px) hue-rotate(180deg)'
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            filter: 'blur(0px) hue-rotate(0deg)',
            duration: 2.5,
            ease: "power4.out",
            delay: index * 0.4,
            scrollTrigger: {
              trigger: member,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      rightMembers.forEach((member, index) => {
        gsap.fromTo(member,
          {
            x: 800,
            opacity: 0,
            rotateY: 180,
            rotateX: -45,
            rotateZ: -30,
            scale: 0.1,
            filter: 'blur(30px) hue-rotate(-180deg)'
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            filter: 'blur(0px) hue-rotate(0deg)',
            duration: 2.5,
            ease: "power4.out",
            delay: index * 0.4,
            scrollTrigger: {
              trigger: member,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      ScrollTrigger.create({
        trigger: boardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          leftMembers.forEach((member, index) => {
            gsap.set(member, {
              x: -100 + (progress * 100),
              rotation: progress * 10 + Math.sin(progress * Math.PI * 4) * 5,
              scale: 0.9 + (progress * 0.2),
              filter: `hue-rotate(${progress * 30}deg) brightness(${0.8 + progress * 0.4})`
            })
          })
          
          rightMembers.forEach((member, index) => {
            gsap.set(member, {
              x: 100 - (progress * 100),
              rotation: -progress * 10 + Math.cos(progress * Math.PI * 4) * 5,
              scale: 0.9 + (progress * 0.2),
              filter: `hue-rotate(${-progress * 30}deg) brightness(${0.8 + progress * 0.4})`
            })
          })
        }
      })

      const createQuantumParticles = () => {
        const container = document.querySelector('.quantum-particles-bg')
        if (!container) return

        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div')
          particle.className = 'quantum-particle'
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 2}px;
            height: ${Math.random() * 8 + 2}px;
            background: radial-gradient(circle, rgba(255,107,53,0.8), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `
          container.appendChild(particle)

          gsap.to(particle, {
            x: `random(-200, 200)`,
            y: `random(-200, 200)`,
            scale: `random(0.5, 2)`,
            opacity: `random(0.2, 0.8)`,
            rotation: `random(0, 360)`,
            duration: `random(8, 15)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      }

      createQuantumParticles()
    }

    initGodLevelBoardAnimations()
  }, [])

  const handleMemberClick = (member, event) => {
    const clickedElement = event.currentTarget
    const rect = clickedElement.getBoundingClientRect()
    
    setSelectedMember(member)
    setDetailCard({
      ...member,
      scrollPosition: window.pageYOffset,
      clickPosition: rect.top + window.pageYOffset
    })

    setTimeout(() => {
      const detailCardElement = document.querySelector('.detail-card')
      if (detailCardElement) {
        gsap.fromTo(detailCardElement,
          {
            x: window.innerWidth,
            opacity: 0,
            rotateY: 90,
            scale: 0.5
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
          }
        )
      }
    }, 50)
  }

  const closeDetailCard = () => {
    const detailCardElement = document.querySelector('.detail-card')
    if (detailCardElement) {
      gsap.to(detailCardElement, {
        x: window.innerWidth,
        opacity: 0,
        rotateY: -90,
        scale: 0.5,
        duration: 1,
        ease: "power3.in",
        onComplete: () => {
          setSelectedMember(null)
          setDetailCard(null)
        }
      })
    }
  }

  const updateCardTransform = useCallback((offsetX, offsetY, card, wrap) => {
    if (!card || !wrap) return
    
    const width = card.clientWidth
    const height = card.clientHeight

    const percentX = clamp((100 / width) * offsetX)
    const percentY = clamp((100 / height) * offsetY)

    const centerX = percentX - 50
    const centerY = percentY - 50

    const properties = {
      "--pointer-x": `${percentX}%`,
      "--pointer-y": `${percentY}%`,
      "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
      "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
      "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      "--pointer-from-top": `${percentY / 100}`,
      "--pointer-from-left": `${percentX / 100}`,
      "--rotate-x": `${round(-(centerX / 5))}deg`,
      "--rotate-y": `${round(centerY / 4)}deg`,
      "--card-opacity": "1"
    }

    Object.entries(properties).forEach(([property, value]) => {
      wrap.style.setProperty(property, value)
    })
  }, [])

  const handlePointerMove = useCallback((event, index) => {
    const card = cardRefs.current[index]?.cardRef?.current
    const wrap = cardRefs.current[index]?.wrapRef?.current
    
    if (!card || !wrap) return
    
    const rect = card.getBoundingClientRect()
    updateCardTransform(
      event.clientX - rect.left,
      event.clientY - rect.top,
      card,
      wrap
    )
  }, [updateCardTransform])

  const handlePointerEnter = useCallback((index) => {
    const card = cardRefs.current[index]?.cardRef?.current
    const wrap = cardRefs.current[index]?.wrapRef?.current
    
    if (!card || !wrap) return
    
    wrap.classList.add("active")
    card.classList.add("active")
  }, [])

  const handlePointerLeave = useCallback((event, index) => {
    const card = cardRefs.current[index]?.cardRef?.current
    const wrap = cardRefs.current[index]?.wrapRef?.current
    
    if (!card || !wrap) return
    
    const createSmoothAnimation = (duration, startX, startY) => {
      const startTime = performance.now()
      const targetX = wrap.clientWidth / 2
      const targetY = wrap.clientHeight / 2

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = clamp(elapsed / duration)
        const easedProgress = easeInOutCubic(progress)

        const currentX = adjust(easedProgress, 0, 1, startX, targetY)
        const currentY = adjust(easedProgress, 0, 1, startY, targetY)

        updateCardTransform(currentX, currentY, card, wrap)

        if (progress < 1) {
          requestAnimationFrame(animationLoop)
        } else {
          wrap.style.setProperty("--card-opacity", "0")
        }
      }

      requestAnimationFrame(animationLoop)
    }
    
    createSmoothAnimation(
      ANIMATION_CONFIG.SMOOTH_DURATION,
      event.offsetX,
      event.offsetY
    )
    
    wrap.classList.remove("active")
    card.classList.remove("active")
  }, [ANIMATION_CONFIG.SMOOTH_DURATION, updateCardTransform])

  const boardMembers = [
    {
      name: 'Archit',
      position: 'Chairperson',
      image: '/board-members-imgs/Archit.png',
      side: 'left',
      description: 'Visionary leader orchestrating Pixelate\'s creative revolution with strategic brilliance and unwavering passion. Archit transforms ambitious dreams into groundbreaking realities, inspiring excellence across every domain.',
      achievements: ['Led 15+ successful design campaigns', 'Established industry partnerships', 'Grew club membership by 300%'],
      quote: '"Innovation begins where comfort zones end."'
    },
    {
      name: 'Kunal Singh Beniwal',
      position: 'Secretary',
      image: '/board-members-imgs/Kunal.png',
      side: 'right',
      description: 'Master coordinator weaving seamless organizational magic behind Pixelate\'s success. Kunal ensures every detail aligns perfectly with our grand vision, creating harmony from complexity.',
      achievements: ['Streamlined club operations', 'Organized 20+ major events', 'Implemented digital workflow systems'],
      quote: '"Excellence is in the details that others overlook."'
    },
    {
      name: 'Aditi Mishra',
      position: 'Vice-Chairperson',
      image: '/board-members-imgs/Aditi.png',
      side: 'left',
      description: 'Strategic powerhouse driving Pixelate\'s evolution with precision and creative insight. Aditi bridges vision with execution, ensuring every initiative reaches its maximum potential.',
      achievements: ['Launched mentorship programs', 'Secured funding for major projects', 'Built external partnerships'],
      quote: '"Strategy without creativity is planning; creativity without strategy is art."'
    },
    {
      name: 'Arshia Sarkar',
      position: 'Co-Secretary',
      image: '/board-members-imgs/Arshia.png',
      side: 'right',
      description: 'Dynamic facilitator amplifying communication and collaboration across Pixelate\'s diverse ecosystem. Arshia transforms ideas into actionable plans with remarkable efficiency.',
      achievements: ['Enhanced inter-team communication', 'Developed onboarding processes', 'Coordinated cross-domain projects'],
      quote: '"Great teams are built on great communication."'
    },
    {
      name: 'Aditya Sharma',
      position: 'Design Head',
      image: '/board-members-imgs/AdityaSharma.png',
      side: 'left',
      description: 'Creative genius sculpting visual narratives that captivate and inspire. Aditya pushes design boundaries, creating experiences that resonate deeply with audiences across digital realms.',
      achievements: ['Created award-winning brand identities', 'Led UI/UX innovation workshops', 'Mentored 50+ design students'],
      quote: '"Design is not just what it looks like — design is how it works."'
    },
    {
      name: 'Vivek Vattem',
      position: 'Events Head',
      image: '/board-members-imgs/Vivek.png',
      side: 'right',
      description: 'Experience architect crafting unforgettable moments that define Pixelate\'s legacy. Vivek transforms ordinary gatherings into extraordinary celebrations of creativity and innovation.',
      achievements: ['Organized flagship annual festival', 'Created immersive event experiences', 'Built vendor network ecosystem'],
      quote: '"Every event is a story waiting to be told."'
    },
    {
      name: 'Anagha R Warrier',
      position: 'Technical Head',
      image: '/board-members-imgs/Anagha.png',
      side: 'left',
      description: 'Technical virtuoso engineering the digital backbone of Pixelate\'s operations. Anagha merges cutting-edge technology with creative vision, building platforms that empower innovation.',
      achievements: ['Developed club\'s digital infrastructure', 'Led coding bootcamps', 'Created automated systems'],
      quote: '"Code is poetry written for machines and humans alike."'
    },
    {
      name: 'Disha Agarwal',
      position: 'Management Head',
      image: '/board-members-imgs/Disha.png',
      side: 'right',
      description: 'Operational maestro orchestrating Pixelate\'s complex ecosystem with grace and precision. Disha ensures resources flow seamlessly, enabling creativity to flourish without constraints.',
      achievements: ['Optimized resource allocation', 'Implemented project management systems', 'Reduced operational costs by 40%'],
      quote: '"Efficiency is doing things right; effectiveness is doing the right things."'
    },
    {
      name: 'Ananta Jaiswal',
      position: 'Finance Head',
      image: '/board-members-imgs/Ananta.png',
      side: 'left',
      description: 'Financial strategist securing Pixelate\'s sustainable growth through astute planning and resource optimization. Ananta transforms financial constraints into opportunities for creative solutions.',
      achievements: ['Increased budget efficiency by 60%', 'Secured sponsorship deals', 'Established financial tracking systems'],
      quote: '"Financial wisdom fuels creative freedom."'
    },
    {
      name: 'N Nandana',
      position: 'PR Head',
      image: '/board-members-imgs/Nandana.png',
      side: 'right',
      description: 'Communication catalyst amplifying Pixelate\'s voice across digital and traditional media landscapes. Nandana crafts compelling narratives that resonate with diverse audiences globally.',
      achievements: ['Grew social media following by 500%', 'Secured media coverage', 'Built influencer partnerships'],
      quote: '"Stories connect us; great stories transform us."'
    }
  ]

  // Ensure refs array matches the number of members
  if (cardRefs.current.length !== boardMembers.length) {
    cardRefs.current = boardMembers.map(
      (_, i) => cardRefs.current[i] || { wrapRef: React.createRef(), cardRef: React.createRef() }
    )
  }

  return (
    <section id="board-members" className="board-section" ref={boardRef}>
      <div className="quantum-particles-bg"></div>
      <div className="cosmic-gradient-overlay"></div>
      
      <div className="section">
        <h2 className="section-title savate-display">Quantum Leadership Collective</h2>
        
        <div className="board-timeline-container">
          <div className="central-timeline" ref={timelineRef}>
            <div className="timeline-core"></div>
            <div className="timeline-glow"></div>
            <div className="timeline-pulse"></div>
            <div className="energy-nodes">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="energy-node" style={{ top: `${10 + i * 8}%` }}></div>
              ))}
            </div>
          </div>
          
          <div className="board-members-grid">
            {boardMembers.map((member, index) => (
              <div 
                key={index}
                className={`board-member ${member.side} magnetic quantum-enhanced`}
                data-cursor-text={`Explore ${member.name}'s Universe`}
                onClick={(e) => handleMemberClick(member, e)}
                style={{ top: `${index * 180}px` }}
              >
                <div 
                  ref={cardRefs.current[index].wrapRef}
                  className="pc-card-wrapper member-card-wrapper"
                >
                  <div 
                    ref={cardRefs.current[index].cardRef}
                    className="pc-card member-card"
                    onPointerMove={(e) => handlePointerMove(e, index)}
                    onPointerEnter={() => handlePointerEnter(index)}
                    onPointerLeave={(e) => handlePointerLeave(e, index)}
                  >
                    <div className="pc-inside">
                      <div className="pc-shine"></div>
                      <div className="pc-glare"></div>
                      <div className="vertical-line-container">
                        <div className="vertical-line">
                          <div className="line-core"></div>
                          <div className="line-glow"></div>
                          <div className="line-particles"></div>
                        </div>
                      </div>
                      
                      <div className="member-content">
                        <div className="member-image-container">
                          <div className="image-frame quantum-border">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={200}
                              height={200}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                              }}
                            />
                            <div className="image-glow"></div>
                            <div className="image-pulse-ring"></div>
                          </div>
                          <div className="member-aura"></div>
                          <div className="orbital-rings">
                            <div className="ring ring-1"></div>
                            <div className="ring ring-2"></div>
                            <div className="ring ring-3"></div>
                          </div>
                        </div>
                        
                        <div className="member-info quantum-text">
                          <h3 className="member-name savate-display">{member.name}</h3>
                          <p className="member-position savate-body">{member.position}</p>
                          <div className="position-badge">
                            <div className="badge-glow"></div>
                            <span className="badge-text">{member.position}</span>
                          </div>
                          <div className="interaction-hint">
                            <span className="hint-text">Click to Explore</span>
                            <div className="hint-arrow">→</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pc-user-info">
                        <div className="pc-user-details">
                          <div className="pc-mini-avatar">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={48}
                              height={48}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                              }}
                            />
                          </div>
                          <div className="pc-user-text">
                            <div className="pc-handle">{member.name}</div>
                            <div className="pc-status">{member.position}</div>
                          </div>
                        </div>
                        <button className="pc-contact-btn" onClick={(e) => {
                          e.stopPropagation()
                          handleMemberClick(member, e)
                        }}>
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {detailCard && (
        <div 
          className="detail-card-overlay"
          style={{ top: `${detailCard.clickPosition - 100}px` }}
        >
          <div className="detail-card hyperdimensional">
            <button className="close-btn quantum-btn" onClick={closeDetailCard}>
              <span>×</span>
              <div className="close-ripple"></div>
            </button>
            
            <div className="detail-content">
              <div className="detail-header">
                <div className="detail-image-container">
                  <Image
                    src={detailCard.image}
                    alt={detailCard.name}
                    width={150}
                    height={150}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                  <div className="detail-image-glow"></div>
                </div>
                <div className="detail-title-section">
                  <h3 className="detail-name savate-display">{detailCard.name}</h3>
                  <p className="detail-position savate-body">{detailCard.position}</p>
                </div>
              </div>
              
              <div className="detail-body">
                <div className="description-section">
                  <p className="member-description">{detailCard.description}</p>
                </div>
                
                <div className="achievements-section">
                  <h4 className="achievements-title">Key Achievements</h4>
                  <ul className="achievements-list">
                    {detailCard.achievements.map((achievement, i) => (
                      <li key={i} className="achievement-item">
                        <span className="achievement-icon">⚡</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="quote-section">
                  <blockquote className="member-quote">
                    <span className="quote-mark">"</span>
                    {detailCard.quote.replace(/"/g, '')}
                    <span className="quote-mark">"</span>
                  </blockquote>
                </div>
              </div>
            </div>
            
            <div className="detail-card-effects">
              <div className="cosmic-particles"></div>
              <div className="energy-streams"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :root {
          --pointer-x: 50%;
          --pointer-y: 50%;
          --pointer-from-center: 0;
          --pointer-from-top: 0.5;
          --pointer-from-left: 0.5;
          --card-opacity: 0;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --background-x: 50%;
          --background-y: 50%;
          --sunpillar-1: hsl(2, 100%, 73%);
          --sunpillar-2: hsl(53, 100%, 69%);
          --sunpillar-3: hsl(93, 100%, 69%);
          --sunpillar-4: hsl(176, 100%, 76%);
          --sunpillar-5: hsl(228, 100%, 74%);
          --sunpillar-6: hsl(283, 100%, 73%);
          --sunpillar-clr-1: var(--sunpillar-1);
          --sunpillar-clr-2: var(--sunpillar-2);
          --sunpillar-clr-3: var(--sunpillar-3);
          --sunpillar-clr-4: var(--sunpillar-4);
          --sunpillar-clr-5: var(--sunpillar-5);
          --sunpillar-clr-6: var(--sunpillar-6);
          --card-radius: 30px;
        }

        .board-section {
          padding: 12rem 0;
          position: relative;
          overflow: hidden;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,107,53,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(247,147,30,0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
        }

        .quantum-particles-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .cosmic-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at center, transparent 0%, rgba(255,107,53,0.05) 50%, transparent 100%),
            conic-gradient(from 0deg at 50% 50%, 
              rgba(255,107,53,0.1) 0deg, 
              rgba(247,147,30,0.1) 90deg, 
              rgba(255,107,53,0.1) 180deg, 
              rgba(247,147,30,0.1) 270deg, 
              rgba(255,107,53,0.1) 360deg);
          animation: cosmicRotation 20s linear infinite;
          z-index: 1;
        }

        @keyframes cosmicRotation {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .section {
          position: relative;
          z-index: 3;
        }

        .section-title {
          font-size: clamp(4rem, 10vw, 12rem);
          margin-bottom: 6rem;
          text-align: center;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff1744, #9c27b0, #ff6b35);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: quantumGradient 8s ease-in-out infinite;
          filter: drop-shadow(0 0 50px rgba(255, 107, 53, 0.5));
          text-shadow: 0 0 80px rgba(255, 107, 53, 0.3);
        }

        @keyframes quantumGradient {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 50% 0%; }
        }

        .board-timeline-container {
          position: relative;
          max-width: 1400px;
          margin: 6rem auto 0;
          min-height: 2000px;
        }

        .central-timeline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 12px;
          transform: translateX(-50%);
          z-index: 2;
        }

        .timeline-core {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            #ff6b35 0%, 
            #f7931e 25%, 
            #ff1744 50%, 
            #f7931e 75%, 
            #ff6b35 100%);
          border-radius: 6px;
          position: relative;
          box-shadow: 
            0 0 30px rgba(255,107,53,0.8),
            inset 0 0 20px rgba(255,255,255,0.2);
        }

        .timeline-glow {
          position: absolute;
          top: -10px;
          left: 50%;
          width: 40px;
          height: calc(100% + 20px);
          background: linear-gradient(to bottom, 
            rgba(255,107,53,0.6), 
            rgba(247,147,30,0.6), 
            rgba(255,107,53,0.6)
          );
          transform: translateX(-50%);
          filter: blur(15px);
          animation: timelineGlow 4s ease-in-out infinite;
        }

        .timeline-pulse {
          position: absolute;
          top: 0;
          left: 50%;
          width: 8px;
          height: 20px;
          background: rgba(255,255,255,0.9);
          border-radius: 4px;
          transform: translateX(-50%);
          animation: timelinePulse 3s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(255,255,255,0.8);
        }

        @keyframes timelineGlow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleY(1) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.1) scaleX(1.2); }
        }

        @keyframes timelinePulse {
          0% { top: 0; opacity: 1; }
          100% { top: calc(100% - 20px); opacity: 0.3; }
        }

        .energy-nodes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .energy-node {
          position: absolute;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #ff6b35, transparent);
          border-radius: 50%;
          transform: translateX(-50%);
          animation: nodeGlow 2s ease-in-out infinite;
        }

        .energy-node:nth-child(odd) {
          animation-delay: 1s;
        }

        @keyframes nodeGlow {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50% { transform: translateX(-50%) scale(1.5); opacity: 1; }
        }

        .board-members-grid {
          position: relative;
          z-index: 3;
        }

        .board-member {
          position: absolute;
          width: 500px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
        }

        .board-member.left {
          right: 53%;
          text-align: right;
        }

        .board-member.right {
          left: 53%;
          text-align: left;
        }

        .quantum-enhanced:hover {
          z-index: 10;
        }

        .pc-card-wrapper {
          perspective: 1000px;
          transform: translate3d(0, 0, 0.1px);
          position: relative;
          touch-action: none;
          width: 100%;
        }

        .pc-card-wrapper::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: inherit;
          background-position: inherit;
          border-radius: inherit;
          transition: all 0.5s ease;
          filter: contrast(2) saturate(2) blur(36px);
          transform: scale(0.8) translate3d(0, 0, 0.1px);
          background-size: 100% 100%;
          background-image: radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(266, 100%, 90%, var(--card-opacity)) 4%, hsla(266, 50%, 80%, calc(var(--card-opacity) * 0.75)) 10%, hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%, hsla(266, 0%, 60%, 0) 100%);
        }

        .pc-card-wrapper:hover,
        .pc-card-wrapper.active {
          --card-opacity: 1;
        }

        .pc-card-wrapper:hover::before,
        .pc-card-wrapper.active::before {
          filter: contrast(1) saturate(2) blur(40px) opacity(1);
          transform: scale(0.9) translate3d(0, 0, 0.1px);
        }

        .pc-card {
          display: flex;
          align-items: center;
          gap: 3rem;
          padding: 3rem;
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(30px);
          border-radius: var(--card-radius);
          border: 2px solid rgba(255,107,53,0.3);
          position: relative;
          background-blend-mode: color-dodge, normal, normal, normal;
          animation: glow-bg 12s linear infinite;
          box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;
          transition: transform 1s ease;
          transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);
          overflow: hidden;
        }

        .board-member.right .pc-card {
          flex-direction: row-reverse;
          text-align: right;
        }

        .pc-card:hover,
        .pc-card.active {
          transition: none;
          transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,107,53,0.8);
          box-shadow: 
            0 50px 150px rgba(0,0,0,0.6),
            0 0 200px rgba(255,107,53,0.5),
            inset 0 0 100px rgba(255,255,255,0.1);
        }

        .pc-inside {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
          transform: translate3d(0, 0, 0.01px);
          overflow: hidden;
        }

        .pc-shine {
          position: absolute;
          inset: 0;
          border-radius: var(--card-radius);
          transform: translate3d(0, 0, 1px);
          overflow: hidden;
          z-index: 3;
          background: transparent;
          background-size: cover;
          background-position: center;
          background-image: repeating-linear-gradient(0deg, var(--sunpillar-clr-1) calc(5% * 1), var(--sunpillar-clr-2) calc(5% * 2), var(--sunpillar-clr-3) calc(5% * 3), var(--sunpillar-clr-4) calc(5% * 4), var(--sunpillar-clr-5) calc(5% * 5), var(--sunpillar-clr-6) calc(5% * 6), var(--sunpillar-clr-1) calc(5% * 7)), repeating-linear-gradient(-45deg, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%), radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsla(0, 0%, 0%, 0.1) 12%, hsla(0, 0%, 0%, 0.15) 20%, hsla(0, 0%, 0%, 0.25) 120%);
          background-position: 0 var(--background-y), var(--background-x) var(--background-y), center;
          background-blend-mode: color, hard-light;
          background-size: 500% 500%, 300% 300%, 200% 200%;
          background-repeat: repeat;
          transition: filter 0.6s ease;
          filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);
          animation: holo-bg 18s linear infinite;
          mix-blend-mode: color-dodge;
        }

        .pc-shine::before,
        .pc-shine::after {
          content: '';
          background-position: center;
          background-size: cover;
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pc-card:hover .pc-shine,
        .pc-card.active .pc-shine {
          filter: brightness(0.85) contrast(1.5) saturate(0.5);
          animation: none;
        }

        .pc-card:hover .pc-shine::before,
        .pc-card.active .pc-shine::before,
        .pc-card:hover .pc-shine::after,
        .pc-card.active .pc-shine::after {
          opacity: 1;
        }

        .pc-shine::before {
          background-image: linear-gradient(45deg, var(--sunpillar-4), var(--sunpillar-5), var(--sunpillar-6), var(--sunpillar-1), var(--sunpillar-2), var(--sunpillar-3)), radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%);
          background-size: 250% 250%, 100% 100%;
          background-position: var(--pointer-x) var(--pointer-y), center;
          background-blend-mode: color-dodge;
          filter: brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2)) saturate(calc(0.5 + var(--pointer-from-center)));
          mix-blend-mode: luminosity;
        }

        .pc-shine::after {
          background-position: 0 var(--background-y), calc(var(--background-x) * 0.4) calc(var(--background-y) * 0.5), center;
          background-size: 200% 300%, 700% 700%, 100% 100%;
          mix-blend-mode: difference;
          filter: brightness(0.8) contrast(1.5);
        }

        .pc-glare {
          position: absolute;
          inset: 0;
          border-radius: var(--card-radius);
          transform: translate3d(0, 0, 1.1px);
          overflow: hidden;
          background-image: radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248, 25%, 80%) 12%, hsla(207, 40%, 30%, 0.8) 90%);
          mix-blend-mode: overlay;
          filter: brightness(0.8) contrast(1.2);
          z-index: 4;
        }

        .vertical-line-container {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          z-index: 5;
        }

        .board-member.left .vertical-line-container {
          right: 0;
        }

        .board-member.right .vertical-line-container {
          left: 0;
        }

        .vertical-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          transform: scaleY(0);
          transform-origin: center top;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pc-card:hover .vertical-line,
        .pc-card.active .vertical-line {
          transform: scaleY(1);
        }

        .line-core {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          background: linear-gradient(to bottom, 
            transparent, 
            #ff6b35, 
            #f7931e, 
            #ff6b35, 
            transparent);
          animation: linePulse 2s ease-in-out infinite;
        }

        @keyframes linePulse {
          0%, 100% { 
            background: linear-gradient(to bottom, 
              transparent, 
              #ff6b35, 
              #f7931e, 
              #ff6b35, 
              transparent);
          }
          50% { 
            background: linear-gradient(to bottom, 
              transparent, 
              #ff8f35, 
              #ffb01e, 
              #ff8f35, 
              transparent);
          }
        }

        .line-glow {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 15px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(255,107,53,0.5), 
            rgba(247,147,30,0.5), 
            rgba(255,107,53,0.5), 
            transparent);
          filter: blur(5px);
        }

        .line-particles {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          overflow: hidden;
        }

        .line-particles::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #fff, 0 0 20px #ff6b35;
          animation: particleRise 3s linear infinite;
        }

        @keyframes particleRise {
          0% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }

        .member-content {
          display: flex;
          align-items: center;
          gap: 3rem;
          width: 100%;
          position: relative;
          z-index: 5;
        }

        .board-member.right .member-content {
          flex-direction: row-reverse;
          text-align: right;
        }

        .member-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .image-frame {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          z-index: 3;
          transition: all 0.5s ease;
        }

        .quantum-border {
          border: 4px solid rgba(255,107,53,0.5);
          box-shadow: 
            0 0 30px rgba(255,107,53,0.6),
            inset 0 0 20px rgba(255,255,255,0.1);
        }

        .pc-card:hover .image-frame,
        .pc-card.active .image-frame {
          transform: scale(1.1) rotateZ(5deg);
          border-color: rgba(255,107,53,1);
          box-shadow: 
            0 0 50px rgba(255,107,53,0.9),
            inset 0 0 30px rgba(255,255,255,0.2);
        }

        .image-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(255,107,53,0.4), transparent);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pc-card:hover .image-glow,
        .pc-card.active .image-glow {
          opacity: 1;
          animation: imageGlow 2s ease-in-out infinite;
        }

        @keyframes imageGlow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .image-pulse-ring {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid rgba(255,107,53,0.5);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
        }

        .pc-card:hover .image-pulse-ring,
        .pc-card.active .image-pulse-ring {
          animation: pulsate 2s ease-out infinite;
          opacity: 1;
        }

        @keyframes pulsate {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .member-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          animation: auraGlow 6s ease-in-out infinite;
        }

        @keyframes auraGlow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1) rotate(120deg); }
          66% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9) rotate(240deg); }
        }

        .orbital-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .ring {
          position: absolute;
          border: 1px solid rgba(255,107,53,0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring-1 {
          width: 180px;
          height: 180px;
          animation: ringRotate1 8s linear infinite;
        }

        .ring-2 {
          width: 220px;
          height: 220px;
          animation: ringRotate2 12s linear infinite reverse;
        }

        .ring-3 {
          width: 260px;
          height: 260px;
          animation: ringRotate3 16s linear infinite;
        }

        @keyframes ringRotate1 {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0.3; }
        }

        @keyframes ringRotate2 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.2; }
          50% { opacity: 0.5; transform: translate(-50%, -50%) rotate(180deg) scale(1.1); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0.2; }
        }

        @keyframes ringRotate3 {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.1; }
          50% { opacity: 0.4; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0.1; }
        }

        .member-info {
          flex-grow: 1;
          position: relative;
          z-index: 3;
        }

        .quantum-text {
          filter: drop-shadow(0 0 10px rgba(255,107,53,0.3));
        }

        .member-name {
          font-size: 2.2rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff1744);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255,107,53,0.5);
          animation: nameGlow 3s ease-in-out infinite;
        }

        @keyframes nameGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255,107,53,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(255,107,53,0.6)); }
        }

        .member-position {
          font-size: 1.3rem;
          color: #e0e0e0;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 15px rgba(255,255,255,0.2);
        }

        .position-badge {
          position: relative;
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background: rgba(255,107,53,0.15);
          border: 2px solid rgba(255,107,53,0.4);
          border-radius: 25px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .badge-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .position-badge:hover .badge-glow {
          left: 100%;
        }

        .badge-text {
          position: relative;
          z-index: 2;
          color: #ff6b35;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .interaction-hint {
          font-size: 0.8rem;
          color: rgba(255,107,53,0.7);
          margin-top: 1rem;
          opacity: 0;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pc-card:hover .interaction-hint,
        .pc-card.active .interaction-hint {
          opacity: 1;
          animation: hintPulse 2s ease-in-out infinite;
        }

        .hint-arrow {
          font-size: 1.2rem;
          animation: arrowBounce 1s ease-in-out infinite;
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        .pc-user-info {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 12px 14px;
          pointer-events: auto;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .pc-card:hover .pc-user-info,
        .pc-card.active .pc-user-info {
          opacity: 1;
          transform: translateY(0);
        }

        .pc-user-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pc-mini-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .pc-handle {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1;
        }

        .pc-status {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1;
        }

        .pc-contact-btn {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          background: rgba(255, 107, 53, 0.2);
        }

        .pc-contact-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
          background: rgba(255, 107, 53, 0.4);
          box-shadow: 0 0 15px rgba(255, 107, 53, 0.4);
        }

        .detail-card-overlay {
          position: fixed;
          right: 0;
          width: 600px;
          max-width: 90vw;
          z-index: 1000;
          pointer-events: none;
        }

        .detail-card {
          position: relative;
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(40px);
          border: 2px solid rgba(255,107,53,0.4);
          border-radius: 30px;
          padding: 3rem;
          margin: 2rem;
          pointer-events: all;
          overflow: hidden;
          box-shadow: 
            0 30px 100px rgba(0,0,0,0.6),
            0 0 100px rgba(255,107,53,0.3),
            inset 0 0 50px rgba(255,255,255,0.05);
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 50px;
          height: 50px;
          background: rgba(255,107,53,0.2);
          border: 2px solid rgba(255,107,53,0.4);
          border-radius: 50%;
          color: #ff6b35;
          font-size: 1.5rem;
          cursor: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .quantum-btn:hover {
          background: rgba(255,107,53,0.4);
          border-color: rgba(255,107,53,0.8);
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 0 20px rgba(255,107,53,0.5);
        }

        .close-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,107,53,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.5s ease;
        }

        .quantum-btn:hover .close-ripple {
          width: 150%;
          height: 150%;
        }

        .detail-content {
          position: relative;
          z-index: 2;
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .detail-image-container {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255,107,53,0.5);
          box-shadow: 0 0 30px rgba(255,107,53,0.4);
        }

        .detail-image-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(255,107,53,0.3), transparent);
          border-radius: 50%;
          filter: blur(10px);
          animation: detailImageGlow 3s ease-in-out infinite;
        }

        @keyframes detailImageGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .achievements-section {
          margin-bottom: 2.5rem;
        }

        .achievements-title {
          font-size: 1.3rem;
          color: #ff6b35;
          margin-bottom: 1.5rem;
          font-family: 'Savate', sans-serif;
        }

        .achievements-list {
          list-style: none;
          padding: 0;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.8rem;
          background: rgba(255,107,53,0.1);
          border-radius: 15px;
          border-left: 3px solid #ff6b35;
          transition: all 0.3s ease;
        }

        .achievement-item:hover {
          background: rgba(255,107,53,0.2);
          transform: translateX(10px);
        }

        .achievement-icon {
          font-size: 1.2rem;
          color: #ff6b35;
        }

        .quote-section {
          text-align: center;
          padding: 2rem;
          background: rgba(255,107,53,0.05);
          border-radius: 20px;
          border: 1px solid rgba(255,107,53,0.2);
        }

        .member-quote {
          font-size: 1.2rem;
          font-style: italic;
          color: #e0e0e0;
          line-height: 1.6;
          position: relative;
        }

        .quote-mark {
          font-size: 2rem;
          color: #ff6b35;
          font-weight: bold;
        }

        .detail-card-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .cosmic-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,107,53,0.1) 0%, transparent 20%),
            radial-gradient(circle at 90% 90%, rgba(247,147,30,0.1) 0%, transparent 20%);
          animation: cosmicDrift 10s ease-in-out infinite;
        }

        @keyframes cosmicDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(180deg); }
        }

        .energy-streams {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg,
            transparent,
            rgba(255,107,53,0.1),
            transparent);
          animation: energyFlow 6s linear infinite;
        }

        @keyframes energyFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 1024px) {
          .board-member {
            position: relative !important;
            width: 100% !important;
            top: auto !important;
            margin-bottom: 3rem;
          }
          .central-timeline { display: none; }
          .member-connector { display: none; }
          .member-card { flex-direction: row !important; text-align: left !important; }
          .detail-card-overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 500px;
          }
        }

        @media (max-width: 768px) {
          .member-card {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem;
            padding: 2rem;
          }
          .detail-header {
            flex-direction: column;
            text-align: center;
          }
          .detail-card { padding: 2rem; margin: 1rem; }
        }
        `}</style>
      </section>
    )

  }
