'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function BoardMembers() {
  const boardRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const initBoardAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Central timeline animation
      gsap.fromTo('.central-timeline', 
        {
          scaleY: 0,
          transformOrigin: 'top'
        },
        {
          scaleY: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Board members sliding animation
      const leftMembers = document.querySelectorAll('.board-member.left')
      const rightMembers = document.querySelectorAll('.board-member.right')

      leftMembers.forEach((member, index) => {
        gsap.fromTo(member,
          {
            x: -400,
            opacity: 0,
            rotateY: -90,
            scale: 0.5
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: index * 0.3,
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
            x: 400,
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
            ease: "power3.out",
            delay: index * 0.3,
            scrollTrigger: {
              trigger: member,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Continuous scroll-based movement
      ScrollTrigger.create({
        trigger: boardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          leftMembers.forEach((member, index) => {
            gsap.set(member, {
              x: -50 + (progress * 50),
              rotation: progress * 5
            })
          })
          rightMembers.forEach((member, index) => {
            gsap.set(member, {
              x: 50 - (progress * 50),
              rotation: -progress * 5
            })
          })
        }
      })
    }

    initBoardAnimations()
  }, [])

  const boardMembers = [
    {
      name: 'Alex Chen',
      position: 'Creative Director',
      image: '/board-members-imgs/1.png',
      side: 'left'
    },
    {
      name: 'Sarah Martinez',
      position: 'Lead Developer',
      image: '/board-members-imgs/2.png',
      side: 'right'
    },
    {
      name: 'David Kim',
      position: 'Design Strategist',
      image: '/board-members-imgs/3.png',
      side: 'left'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Innovation Manager',
      image: '/board-members-imgs/4.png',
      side: 'right'
    },
    {
      name: 'Michael Johnson',
      position: 'Technical Lead',
      image: '/board-members-imgs/5.png',
      side: 'left'
    },
    {
      name: 'Lisa Wang',
      position: 'Creative Producer',
      image: '/board-members-imgs/6.png',
      side: 'right'
    }
  ]

  return (
    <section id="board-members" className="board-section" ref={boardRef}>
      <div className="section">
        <h2 className="section-title savate-display">Visionary Architects</h2>
        
        <div className="board-timeline-container">
          <div className="central-timeline" ref={timelineRef}>
            <div className="timeline-core"></div>
            <div className="timeline-glow"></div>
          </div>
          
          <div className="board-members-grid">
            {boardMembers.map((member, index) => (
              <div 
                key={index}
                className={`board-member ${member.side} magnetic`}
                data-cursor-text={`Meet ${member.name}`}
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
                    </div>
                    <div className="member-aura"></div>
                  </div>
                  
                  <div className="member-info">
                    <h3 className="member-name savate-display">{member.name}</h3>
                    <p className="member-position savate-body">{member.position}</p>
                    <div className="member-connector"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .board-section {
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
        }

        .board-timeline-container {
          position: relative;
          max-width: 1200px;
          margin: 4rem auto 0;
          min-height: 1200px;
        }

        .central-timeline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 6px;
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-core {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #ff6b35, #f7931e, #ff6b35);
          border-radius: 3px;
          position: relative;
        }

        .timeline-glow {
          position: absolute;
          top: 0;
          left: 50%;
          width: 20px;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(255,107,53,0.5), 
            rgba(247,147,30,0.5), 
            rgba(255,107,53,0.5)
          );
          transform: translateX(-50%);
          filter: blur(10px);
          animation: timelineGlow 3s ease-in-out infinite;
        }

        @keyframes timelineGlow {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.1); }
        }

        .board-members-grid {
          position: relative;
          z-index: 2;
        }

        .board-member {
          position: absolute;
          width: 400px;
          margin-bottom: 6rem;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
        .board-member:nth-child(2) { top: 200px; }
        .board-member:nth-child(3) { top: 400px; }
        .board-member:nth-child(4) { top: 600px; }
        .board-member:nth-child(5) { top: 800px; }
        .board-member:nth-child(6) { top: 1000px; }

        .member-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          border: 1px solid rgba(255,107,53,0.2);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
          transform-style: preserve-3d;
        }

        .board-member.right .member-card {
          flex-direction: row-reverse;
          text-align: right;
        }

        .member-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,107,53,0.5);
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 
            0 30px 60px rgba(0,0,0,0.3),
            0 0 50px rgba(255,107,53,0.2);
        }

        .member-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .image-frame {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255,107,53,0.3);
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .member-card:hover .image-frame {
          border-color: rgba(255,107,53,0.8);
          transform: scale(1.05);
        }

        .member-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          animation: auraGlow 4s ease-in-out infinite;
        }

        @keyframes auraGlow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        .member-info {
          flex-grow: 1;
          position: relative;
        }

        .member-name {
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .member-position {
          font-size: 1.1rem;
          color: #cccccc;
          margin-bottom: 1rem;
        }

        .member-connector {
          position: absolute;
          width: 40px;
          height: 2px;
          background: linear-gradient(to right, #ff6b35, #f7931e);
          top: 50%;
          transform: translateY(-50%);
        }

        .board-member.left .member-connector {
          right: -42px;
        }

        .board-member.right .member-connector {
          left: -42px;
        }

        @media (max-width: 1024px) {
          .board-member {
            position: relative !important;
            width: 100% !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            margin-bottom: 3rem;
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
        }

        @media (max-width: 768px) {
          .member-card {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
