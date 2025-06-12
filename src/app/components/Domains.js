'use client'
import { useEffect, useRef } from 'react'

export default function Domains() {
  const domainsRef = useRef(null)

  useEffect(() => {
    const initDomainsAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Morphing domain cards
      gsap.fromTo('.domain-card',
        {
          scale: 0.5,
          opacity: 0,
          y: 200,
          rotateY: -180
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1.8,
          stagger: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: domainsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initDomainsAnimations()
  }, [])

  const domains = [
    {
      title: 'Web Development',
      description: 'Crafting immersive digital experiences with cutting-edge technologies',
      icon: '🌐',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      title: 'Mobile Apps',
      description: 'Revolutionary mobile solutions that redefine user engagement',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    },
    {
      title: 'UI/UX Design',
      description: 'Designing interfaces that bridge the gap between dreams and reality',
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic campaigns that resonate across digital dimensions',
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    },
    {
      title: 'AI Integration',
      description: 'Pioneering artificial intelligence solutions for tomorrow',
      icon: '🤖',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      title: 'Blockchain',
      description: 'Decentralized solutions for a distributed future',
      icon: '⛓️',
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    }
  ]

  return (
    <section id="domains" className="domains-section" ref={domainsRef}>
      <div className="section">
        <h2 className="section-title savate-display">Domain Mastery</h2>
        <div className="domains-grid">
          {domains.map((domain, index) => (
            <div key={index} className="domain-card floating-section magnetic">
              <div 
                className="domain-icon"
                style={{ background: domain.gradient }}
              >
                <span className="icon-symbol">{domain.icon}</span>
              </div>
              <h3 className="domain-title savate-display">{domain.title}</h3>
              <p className="domain-description savate-body">{domain.description}</p>
              <div className="domain-glow"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .domains-section {
          padding: 8rem 0;
          position: relative;
        }

        .domains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .domain-card {
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          cursor: none;
        }

        .domain-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: iconFloat 6s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(0) rotate(180deg); }
          75% { transform: translateY(-5px) rotate(270deg); }
        }

        .icon-symbol {
          font-size: 3rem;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
        }

        .domain-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #ff6b35;
        }

        .domain-description {
          font-size: 1.1rem;
          color: #cccccc;
          line-height: 1.6;
        }

        .domain-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .domain-card:hover .domain-glow {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
