'use client'
import { useEffect, useRef } from 'react'

export default function Menu() {
  const menuRef = useRef(null)

  useEffect(() => {
    const initMenuAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Parallax menu items
      gsap.fromTo('.menu-item',
        {
          y: 100,
          opacity: 0,
          rotateX: -90
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: menuRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initMenuAnimations()
  }, [])

  const menuItems = [
    { title: 'Creative Vision', description: 'Transforming ideas into digital masterpieces' },
    { title: 'Innovation Hub', description: 'Where breakthrough technologies meet artistry' },
    { title: 'Digital Craftsmanship', description: 'Precision-engineered creative solutions' },
    { title: 'Future Forward', description: 'Leading the next generation of digital experiences' }
  ]

  return (
    <section id="menu" className="menu-section" ref={menuRef}>
      <div className="section">
        <h2 className="section-title savate-display">Our Universe</h2>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item floating-section magnetic">
              <div className="menu-icon">
                <div className="icon-orb"></div>
              </div>
              <h3 className="menu-title savate-display">{item.title}</h3>
              <p className="menu-description savate-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .menu-section {
          padding: 8rem 0;
          background: linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(247,147,30,0.05) 100%);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .menu-item {
          text-align: center;
          padding: 3rem 2rem;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-icon {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .icon-orb {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, #ff6b35, #f7931e);
          border-radius: 50%;
          position: relative;
          animation: orbPulse 3s ease-in-out infinite;
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,107,53,0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 40px rgba(255,107,53,0.6); }
        }

        .menu-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #ff6b35;
        }

        .menu-description {
          font-size: 1.1rem;
          color: #cccccc;
          line-height: 1.6;
        }
      `}</style>
    </section>
  )
}
