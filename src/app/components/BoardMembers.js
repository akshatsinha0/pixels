'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function BoardMembers() {
  const boardRef = useRef(null)
  const timelineRef = useRef(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const initGodLevelBoardAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { SplitText } = await import('gsap/SplitText')
      const { Physics2DPlugin } = await import('gsap/Physics2DPlugin')
      const { MorphSVGPlugin } = await import('gsap/MorphSVGPlugin')
      
      gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin, MorphSVGPlugin)

      // DIVINE TIMELINE MANIFESTATION
      gsap.fromTo('.central-timeline', 
        {
          scaleY: 0,
          transformOrigin: 'top',
          rotationX: -90
        },
        {
          scaleY: 1,
          rotationX: 0,
          duration: 3,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: boardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // QUANTUM PARTICLE BURST ON TIMELINE APPEARANCE
      ScrollTrigger.create({
        trigger: boardRef.current,
        start: 'top 80%',
        onEnter: () => {
          createQuantumTimelineBurst()
        }
      })

      // INTERDIMENSIONAL MEMBER ANIMATIONS
      const leftMembers = document.querySelectorAll('.board-member.left')
      const rightMembers = document.querySelectorAll('.board-member.right')

      leftMembers.forEach((member, index) => {
        // Initial state: existing in parallel dimension
        gsap.set(member, {
          x: -800,
          y: Math.random() * 200 - 100,
          opacity: 0,
          rotateY: -180,
          rotateX: 45,
          scale: 0.1,
          filter: 'blur(20px) hue-rotate(180deg)'
        })

        gsap.to(member, {
          x: 0,
          y: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px) hue-rotate(0deg)',
          duration: 2.5,
          ease: "power4.out",
          delay: index * 0.4,
          scrollTrigger: {
            trigger: member,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          onComplete: () => {
            createMemberArrivalBurst(member)
          }
        })
      })

      rightMembers.forEach((member, index) => {
        gsap.set(member, {
          x: 800,
          y: Math.random() * 200 - 100,
          opacity: 0,
          rotateY: 180,
          rotateX: -45,
          scale: 0.1,
          filter: 'blur(20px) hue-rotate(-180deg)'
        })

        gsap.to(member, {
          x: 0,
          y: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px) hue-rotate(0deg)',
          duration: 2.5,
          ease: "power4.out",
          delay: index * 0.4,
          scrollTrigger: {
            trigger: member,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          onComplete: () => {
            createMemberArrivalBurst(member)
          }
        })
      })

      // COSMIC SCROLL-BASED PHYSICS
      ScrollTrigger.create({
        trigger: boardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          const wave = Math.sin(progress * Math.PI * 2)
          
          leftMembers.forEach((member, index) => {
            gsap.set(member, {
              x: -30 + (progress * 30) + (wave * 10),
              rotation: progress * 3 + (wave * 2),
              scale: 1 + (wave * 0.05)
            })
          })
          
          rightMembers.forEach((member, index) => {
            gsap.set(member, {
              x: 30 - (progress * 30) - (wave * 10),
              rotation: -progress * 3 - (wave * 2),
              scale: 1 - (wave * 0.05)
            })
          })
        }
      })

      // AMBIENT ENERGY FIELD GENERATION
      const createQuantumTimelineBurst = () => {
        const timeline = document.querySelector('.central-timeline')
        if (!timeline) return

        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div')
          particle.className = 'quantum-timeline-particle'
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, #ff6b35, #f7931e);
            border-radius: 50%;
            left: 50%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 100;
          `
          
          timeline.appendChild(particle)

          const angle = Math.random() * Math.PI * 2
          const velocity = Math.random() * 100 + 50
          
          gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            scale: 0,
            opacity: 0,
            duration: Math.random() * 2 + 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
          })
        }
      }

      const createMemberArrivalBurst = (member) => {
        const rect = member.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div')
          particle.className = 'member-arrival-particle'
          particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: radial-gradient(circle, #ff6b35, #f7931e);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
          `
          
          document.body.appendChild(particle)

          const angle = (i / 30) * Math.PI * 2
          const velocity = Math.random() * 150 + 100
          
          gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            scale: 0,
            opacity: 0,
            duration: Math.random() * 2 + 1.5,
            ease: "power3.out",
            onComplete: () => particle.remove()
          })
        }
      }
    }

    initGodLevelBoardAnimations()
  }, [])

  // DIVINE MEMBER DATA WITH COSMIC DESCRIPTIONS
  const boardMembers = [
    {
      name: 'Archit',
      position: 'Chairperson',
      image: '/board-members-imgs/1.png',
      side: 'left',
      description: 'The visionary architect of Pixelate\'s destiny, Archit orchestrates the symphony of creativity with the precision of a cosmic conductor. His strategic brilliance illuminates pathways through the digital cosmos, transforming abstract dreams into tangible innovations that redefine the boundaries of possibility.',
      expertise: ['Strategic Vision', 'Leadership Excellence', 'Innovation Architecture', 'Future Forecasting'],
      achievements: ['Led 15+ transformative projects', 'Pioneered digital transformation initiatives', 'Mentored 100+ creative minds', 'Established industry partnerships'],
      quote: 'Innovation is not just about creating something new; it\'s about reimagining what\'s possible.'
    },
    {
      name: 'Kunal Singh Beniwal',
      position: 'Secretary',
      image: '/board-members-imgs/2.png',
      side: 'right',
      description: 'The guardian of organizational harmony, Kunal weaves efficiency into every fiber of Pixelate\'s operations. His meticulous attention to detail and unwavering dedication ensure that every creative endeavor is supported by robust systems and seamless coordination.',
      expertise: ['Organizational Excellence', 'Process Optimization', 'Communication Mastery', 'Strategic Planning'],
      achievements: ['Streamlined organizational workflows', 'Implemented digital documentation systems', 'Coordinated 50+ successful events', 'Built inter-departmental bridges'],
      quote: 'Excellence is in the details, and success lives in the execution.'
    },
    {
      name: 'Aditi Mishra',
      position: 'Vice-Chairperson',
      image: '/board-members-imgs/3.png',
      side: 'left',
      description: 'A luminary of collaborative leadership, Aditi bridges visions with reality through her exceptional ability to unite diverse talents. Her empathetic approach and strategic acumen create an environment where innovation flourishes and every voice contributes to the collective masterpiece.',
      expertise: ['Collaborative Leadership', 'Team Dynamics', 'Strategic Coordination', 'Innovation Facilitation'],
      achievements: ['Facilitated cross-domain collaborations', 'Launched mentorship programs', 'Developed talent retention strategies', 'Created inclusive innovation frameworks'],
      quote: 'True leadership is not about commanding others, but about inspiring them to discover their own greatness.'
    },
    {
      name: 'Arshia Sarkar',
      position: 'Co-Secretary',
      image: '/board-members-imgs/4.png',
      side: 'right',
      description: 'The digital alchemist who transforms chaos into order, Arshia possesses an innate ability to see patterns where others see complexity. Her innovative approaches to organization and her talent for creating elegant solutions make her an indispensable force in Pixelate\'s journey.',
      expertise: ['Digital Organization', 'System Integration', 'Creative Coordination', 'Process Innovation'],
      achievements: ['Digitized administrative processes', 'Created automated workflow systems', 'Managed complex project timelines', 'Established quality assurance protocols'],
      quote: 'In the intersection of creativity and order lies the birthplace of extraordinary achievements.'
    },
    {
      name: 'Aditya Sharma',
      position: 'Design Head',
      image: '/board-members-imgs/5.png',
      side: 'left',
      description: 'The master of visual poetry, Aditya channels emotions into pixels and transforms concepts into breathtaking visual narratives. His designs don\'t just communicate; they resonate with the soul, creating connections that transcend the digital realm and touch the very essence of human experience.',
      expertise: ['Visual Storytelling', 'Brand Identity', 'User Experience', 'Creative Direction'],
      achievements: ['Created award-winning design campaigns', 'Developed signature visual language', 'Mentored emerging designers', 'Revolutionized digital aesthetics'],
      quote: 'Design is not what it looks like; design is how it makes you feel and what it makes you believe.'
    },
    {
      name: 'Vivek Vattem',
      position: 'Events Head',
      image: '/board-members-imgs/6.png',
      side: 'right',
      description: 'The maestro of memorable moments, Vivek transforms ordinary gatherings into extraordinary experiences that linger in memory long after the last light fades. His ability to orchestrate emotions and create magical moments makes every Pixelate event a journey into wonder.',
      expertise: ['Event Orchestration', 'Experience Design', 'Community Building', 'Creative Production'],
      achievements: ['Organized 25+ flagship events', 'Built community engagement programs', 'Created immersive event experiences', 'Established industry networking forums'],
      quote: 'Events are not just gatherings; they are the moments where dreams take flight and communities are born.'
    },
    {
      name: 'Anagha R Warrier',
      position: 'Technical Head',
      image: '/board-members-imgs/7.png',
      side: 'left',
      description: 'The architect of digital realms, Anagha constructs the invisible foundations upon which Pixelate\'s innovations stand. Her mastery of code and systems creates the technological backbone that enables creativity to flourish without boundaries, turning ambitious visions into robust realities.',
      expertise: ['Full-Stack Development', 'System Architecture', 'Technology Strategy', 'Innovation Implementation'],
      achievements: ['Built scalable technical infrastructure', 'Led digital transformation projects', 'Pioneered emerging technology adoption', 'Created development best practices'],
      quote: 'Technology is the canvas upon which we paint the future; code is our brush, and innovation is our masterpiece.'
    },
    {
      name: 'Disha Agarwal',
      position: 'Management Head',
      image: '/board-members-imgs/8.png',
      side: 'right',
      description: 'The conductor of organizational symphony, Disha harmonizes resources, people, and processes into a seamless flow of productivity. Her strategic mind and compassionate heart create an environment where excellence becomes natural and innovation becomes inevitable.',
      expertise: ['Strategic Management', 'Resource Optimization', 'Team Leadership', 'Operational Excellence'],
      achievements: ['Optimized organizational efficiency', 'Implemented strategic planning frameworks', 'Developed talent management systems', 'Established performance metrics'],
      quote: 'Management is not about controlling people; it\'s about creating conditions where people can create their best work.'
    },
    {
      name: 'Ananta Jaiswal',
      position: 'Finance Head',
      image: '/board-members-imgs/9.png',
      side: 'left',
      description: 'The guardian of fiscal wisdom, Ananta ensures that every creative dream is supported by sound financial strategy. His ability to balance ambitious visions with practical realities creates the stable foundation upon which Pixelate\'s innovations can flourish and grow.',
      expertise: ['Financial Strategy', 'Budget Management', 'Investment Planning', 'Risk Assessment'],
      achievements: ['Managed multi-project budgets', 'Secured funding for initiatives', 'Implemented financial tracking systems', 'Optimized resource allocation'],
      quote: 'Financial wisdom is not about limiting dreams; it\'s about creating the resources to make bigger dreams possible.'
    },
    {
      name: 'N Nandana',
      position: 'PR Head',
      image: '/board-members-imgs/10.png',
      side: 'right',
      description: 'The voice that carries Pixelate\'s story across digital horizons, Nandana crafts narratives that resonate with hearts and minds. Her ability to translate complex innovations into compelling stories creates bridges between Pixelate\'s vision and the world\'s understanding.',
      expertise: ['Strategic Communication', 'Brand Storytelling', 'Media Relations', 'Community Engagement'],
      achievements: ['Built brand recognition campaigns', 'Established media partnerships', 'Created viral content strategies', 'Developed community outreach programs'],
      quote: 'Stories are the bridges that connect hearts to ideas, and ideas to the world that needs them.'
    }
  ]

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMember(null), 300)
  }

  return (
    <section id="board-members" className="board-section" ref={boardRef}>
      <div className="cosmic-background"></div>
      <div className="energy-field"></div>
      
      <div className="section">
        <h2 className="section-title savate-display">Visionary Architects</h2>
        
        <div className="board-timeline-container">
          <div className="central-timeline" ref={timelineRef}>
            <div className="timeline-core"></div>
            <div className="timeline-glow"></div>
            <div className="timeline-energy-stream"></div>
          </div>
          
          <div className="board-members-grid">
            {boardMembers.map((member, index) => (
              <div 
                key={index}
                className={`board-member ${member.side} magnetic`}
                data-cursor-text={`Meet ${member.name}`}
                onClick={() => handleMemberClick(member)}
              >
                <div className="member-card floating-section">
                  <div className="member-image-container">
                    <div className="image-frame">
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
                      <div className="image-hologram"></div>
                    </div>
                    <div className="member-aura"></div>
                    <div className="member-energy-ring"></div>
                  </div>
                  
                  <div className="member-info">
                    <h3 className="member-name savate-display">{member.name}</h3>
                    <p className="member-position savate-body">{member.position}</p>
                    <div className="member-connector"></div>
                    <div className="click-indicator">
                      <span>Click to explore</span>
                      <div className="click-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTERDIMENSIONAL MEMBER MODAL */}
      {isModalOpen && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <div className="modal-image-container">
                  <div className="modal-image-frame">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      width={150}
                      height={150}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                    <div className="modal-image-aura"></div>
                  </div>
                </div>
                <div className="modal-title-section">
                  <h2 className="modal-name savate-display">{selectedMember.name}</h2>
                  <p className="modal-position savate-body">{selectedMember.position}</p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-description">
                  <h3>Visionary Profile</h3>
                  <p>{selectedMember.description}</p>
                </div>

                <div className="modal-expertise">
                  <h3>Core Expertise</h3>
                  <div className="expertise-grid">
                    {selectedMember.expertise.map((skill, index) => (
                      <span key={index} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-achievements">
                  <h3>Key Achievements</h3>
                  <ul className="achievements-list">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-quote">
                  <blockquote>"{selectedMember.quote}"</blockquote>
                </div>
              </div>
            </div>
            <div className="modal-particles"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .board-section {
          padding: 10rem 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(10, 10, 20, 0.95) 0%, rgba(20, 10, 30, 0.95) 100%);
        }

        .cosmic-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,107,53,0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(247,147,30,0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(138,43,226,0.05) 0%, transparent 50%);
          animation: cosmicDrift 20s ease-in-out infinite;
        }

        @keyframes cosmicDrift {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(-20px) translateY(-10px) rotate(1deg); }
          50% { transform: translateX(20px) translateY(10px) rotate(-1deg); }
          75% { transform: translateX(-10px) translateY(20px) rotate(0.5deg); }
        }

        .energy-field {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-13.807-11.193-25-25-25s-25 11.193-25 25 11.193 25 25 25 25-11.193 25-25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: energyPulse 15s linear infinite;
          pointer-events: none;
        }

        @keyframes energyPulse {
          0% { transform: translateX(0) translateY(0); opacity: 0.3; }
          100% { transform: translateX(-100px) translateY(-100px); opacity: 0.1; }
        }

        .board-timeline-container {
          position: relative;
          max-width: 1400px;
          margin: 6rem auto 0;
          min-height: 2200px;
        }

        .central-timeline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 8px;
          transform: translateX(-50%);
          z-index: 1;
          perspective: 1000px;
        }

        .timeline-core {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            #ff6b35 0%, 
            #f7931e 25%, 
            #ff6b35 50%, 
            #f7931e 75%, 
            #ff6b35 100%
          );
          border-radius: 4px;
          position: relative;
          box-shadow: 
            0 0 20px rgba(255, 107, 53, 0.6),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .timeline-glow {
          position: absolute;
          top: 0;
          left: 50%;
          width: 30px;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(255,107,53,0.8), 
            rgba(247,147,30,0.8), 
            rgba(255,107,53,0.8)
          );
          transform: translateX(-50%);
          filter: blur(15px);
          animation: timelineGlow 4s ease-in-out infinite;
        }

        .timeline-energy-stream {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(255,255,255,0.9), 
            rgba(255,107,53,0.5), 
            rgba(255,255,255,0.9)
          );
          transform: translateX(-50%);
          animation: energyStream 2s ease-in-out infinite;
        }

        @keyframes timelineGlow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleY(1) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.1) scaleX(1.5); }
        }

        @keyframes energyStream {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .board-members-grid {
          position: relative;
          z-index: 2;
        }

        .board-member {
          position: absolute;
          width: 450px;
          margin-bottom: 8rem;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
        }

        .board-member.left {
          right: 52%;
          text-align: right;
        }

        .board-member.right {
          left: 52%;
          text-align: left;
        }

        .board-member:nth-child(1) { top: 0; }
        .board-member:nth-child(2) { top: 220px; }
        .board-member:nth-child(3) { top: 440px; }
        .board-member:nth-child(4) { top: 660px; }
        .board-member:nth-child(5) { top: 880px; }
        .board-member:nth-child(6) { top: 1100px; }
        .board-member:nth-child(7) { top: 1320px; }
        .board-member:nth-child(8) { top: 1540px; }
        .board-member:nth-child(9) { top: 1760px; }
        .board-member:nth-child(10) { top: 1980px; }

        .member-card {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding: 2.5rem;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(25px);
          border-radius: 30px;
          border: 1px solid rgba(255,107,53,0.3);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }

        .member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255,107,53,0.1), 
            transparent
          );
          transition: left 0.8s ease;
        }

        .member-card:hover::before {
          left: 100%;
        }

        .board-member.right .member-card {
          flex-direction: row-reverse;
          text-align: right;
        }

        .member-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,107,53,0.6);
          transform: translateY(-15px) rotateX(8deg) scale(1.02);
          box-shadow: 
            0 40px 80px rgba(0,0,0,0.4),
            0 0 60px rgba(255,107,53,0.3),
            inset 0 0 30px rgba(255,255,255,0.1);
        }

        .member-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .image-frame {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255,107,53,0.4);
          position: relative;
          z-index: 3;
          transition: all 0.5s ease;
          box-shadow: 0 0 30px rgba(255,107,53,0.3);
        }

        .image-hologram {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          background: linear-gradient(45deg, 
            transparent, 
            rgba(0,255,255,0.3), 
            transparent, 
            rgba(255,0,255,0.3), 
            transparent
          );
          animation: hologramShift 3s ease-in-out infinite;
          opacity: 0;
        }

        @keyframes hologramShift {
          0%, 100% { transform: rotate(0deg); opacity: 0; }
          50% { transform: rotate(180deg); opacity: 0.5; }
        }

        .member-card:hover .image-hologram {
          opacity: 0.7;
        }

        .member-card:hover .image-frame {
          border-color: rgba(255,107,53,0.9);
          transform: scale(1.08) rotateY(5deg);
          box-shadow: 0 0 50px rgba(255,107,53,0.6);
        }

        .member-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          animation: auraGlow 5s ease-in-out infinite;
        }

        .member-energy-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          border: 2px solid rgba(255,107,53,0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          animation: energyRing 6s linear infinite;
        }

        @keyframes auraGlow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }

        @keyframes energyRing {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0.3; }
        }

        .member-info {
          flex-grow: 1;
          position: relative;
        }

        .member-name {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.8rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ff6b35);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: nameGlow 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255,107,53,0.5);
        }

        @keyframes nameGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .member-position {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .member-connector {
          position: absolute;
          width: 50px;
          height: 3px;
          background: linear-gradient(to right, #ff6b35, #f7931e);
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 10px rgba(255,107,53,0.6);
        }

        .board-member.left .member-connector {
          right: -52px;
        }

        .board-member.right .member-connector {
          left: -52px;
        }

        .click-indicator {
          position: relative;
          margin-top: 1rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .click-indicator span {
          font-size: 0.9rem;
          color: #ff6b35;
          font-weight: 500;
        }

        .click-pulse {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: #ff6b35;
          border-radius: 50%;
          animation: clickPulse 2s ease-in-out infinite;
        }

        @keyframes clickPulse {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 1; }
          50% { transform: translateY(-50%) scale(1.5); opacity: 0.5; }
        }

        .member-card:hover .click-indicator {
          opacity: 1;
          transform: scale(1.05);
        }

        /* INTERDIMENSIONAL MODAL STYLES */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(20px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalFadeIn 0.5s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          position: relative;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes modalSlideIn {
          from { 
            transform: translateY(100px) scale(0.8); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }

        .modal-content {
          background: rgba(20,20,30,0.95);
          backdrop-filter: blur(30px);
          border-radius: 25px;
          border: 1px solid rgba(255,107,53,0.3);
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 50px 100px rgba(0,0,0,0.5),
            0 0 80px rgba(255,107,53,0.2),
            inset 0 0 50px rgba(255,255,255,0.05);
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,107,53,0.2);
          border: 1px solid rgba(255,107,53,0.4);
          color: #ff6b35;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(255,107,53,0.4);
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 0 20px rgba(255,107,53,0.5);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .modal-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .modal-image-frame {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255,107,53,0.5);
          position: relative;
          box-shadow: 0 0 40px rgba(255,107,53,0.4);
        }

        .modal-image-aura {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%);
          animation: modalAuraGlow 3s ease-in-out infinite;
        }

        @keyframes modalAuraGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .modal-title-section {
          flex-grow: 1;
        }

        .modal-name {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .modal-position {
          font-size: 1.3rem;
          color: #e0e0e0;
          font-weight: 500;
        }

        .modal-body {
          line-height: 1.8;
        }

        .modal-body h3 {
          color: #ff6b35;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
          font-family: 'Savate', sans-serif;
          font-weight: 600;
        }

        .modal-body h3:first-child {
          margin-top: 0;
        }

        .modal-description p {
          color: #cccccc;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .expertise-tag {
          background: rgba(255,107,53,0.15);
          border: 1px solid rgba(255,107,53,0.3);
          color: #ff6b35;
          padding: 0.8rem 1.2rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
          transition: all 0.3s ease;
        }

        .expertise-tag:hover {
          background: rgba(255,107,53,0.25);
          border-color: rgba(255,107,53,0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,107,53,0.3);
        }

        .achievements-list {
          list-style: none;
          padding: 0;
        }

        .achievements-list li {
          color: #cccccc;
          font-size: 1rem;
          margin-bottom: 0.8rem;
          padding-left: 2rem;
          position: relative;
        }

        .achievements-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #ff6b35;
          font-size: 1.2rem;
        }

        .modal-quote {
          margin-top: 2rem;
          padding: 2rem;
          background: rgba(255,107,53,0.1);
          border-left: 4px solid #ff6b35;
          border-radius: 10px;
        }

        .modal-quote blockquote {
          color: #e0e0e0;
          font-size: 1.1rem;
          font-style: italic;
          margin: 0;
          line-height: 1.6;
        }

        .modal-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: modalParticles 20s linear infinite;
        }

        @keyframes modalParticles {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-60px) translateY(-60px); }
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1200px) {
          .board-member {
            position: relative !important;
            width: 100% !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            margin-bottom: 4rem;
          }

          .central-timeline {
            display: none;
          }

          .member-connector {
            display: none;
          }

          .member-card {
            flex-direction: row !important;
            text-align: left !important;
          }

          .board-timeline-container {
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .member-card {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1.5rem;
            padding: 2rem;
          }

          .modal-header {
            flex-direction: column;
            text-align: center;
          }

          .modal-content {
            padding: 2rem;
          }

          .expertise-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
