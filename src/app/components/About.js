'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const aboutRef = useRef(null)

  useEffect(() => {
    const initScrollAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Animate about content
      gsap.fromTo('.about-text', 
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Skills animation
      gsap.fromTo('.skill-item',
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initScrollAnimations()
  }, [])

  const skills = [
    'UI/UX Design',
    'Web Development',
    'Brand Identity',
    'Motion Graphics',
    'Digital Strategy',
    '3D Visualization'
  ]

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="section">
        <h2 className="section-title">About Pixelate</h2>
        <div className="grid-2">
          <div className="about-text">
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#cccccc' }}>
              We are a collective of creative minds passionate about pushing the boundaries 
              of digital design. Our mission is to transform ideas into engaging digital 
              experiences that inspire and connect.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#999999' }}>
              From concept to execution, we blend artistic vision with technical expertise 
              to deliver solutions that not only look exceptional but perform flawlessly 
              across all platforms.
            </p>
          </div>
          <div className="skills-container">
            <h3 style={{ marginBottom: '2rem', color: '#ff6b35' }}>Our Expertise</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'rgba(255, 107, 53, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                    borderRadius: '25px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }
        
        .skill-item:hover div {
          background: rgba(255, 107, 53, 0.2);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  )
}
