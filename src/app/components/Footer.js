'use client'
import { useEffect, useRef } from 'react'

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const initFooterAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Footer slide-up animation
      gsap.fromTo(footerRef.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initFooterAnimations()
  }, [])

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="section">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo savate-display">PIXELATE</h3>
            <p className="footer-tagline savate-body">
              Crafting tomorrow's digital experiences today
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading savate-display">Navigate</h4>
              <ul className="footer-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading savate-display">Connect</h4>
              <ul className="footer-list">
                <li><a href="#" className="social-link">Instagram</a></li>
                <li><a href="#" className="social-link">Twitter</a></li>
                <li><a href="#" className="social-link">LinkedIn</a></li>
                <li><a href="#" className="social-link">GitHub</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading savate-display">Create</h4>
              <ul className="footer-list">
                <li><a href="#domains">Domains</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#board-members">Team</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright savate-body">
            © 2025 Pixelate Club. All rights reserved. | Crafted with 🧡 by digital dreamers
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-section {
          background: linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%);
          border-top: 1px solid rgba(255,107,53,0.2);
          padding: 4rem 0 2rem;
          position: relative;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          text-align: left;
        }

        .footer-logo {
          font-size: 2.5rem;
          color: #ff6b35;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(255,107,53,0.3);
        }

        .footer-tagline {
          font-size: 1.1rem;
          color: #cccccc;
          line-height: 1.6;
          max-width: 300px;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-heading {
          font-size: 1.2rem;
          color: #ff6b35;
          margin-bottom: 1.5rem;
        }

        .footer-list {
          list-style: none;
          padding: 0;
        }

        .footer-list li {
          margin-bottom: 0.8rem;
        }

        .footer-list a {
          color: #cccccc;
          text-decoration: none;
          font-family: 'Savate', sans-serif;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-list a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ff6b35;
          transition: width 0.3s ease;
        }

        .footer-list a:hover {
          color: #ff6b35;
        }

        .footer-list a:hover::after {
          width: 100%;
        }

        .footer-bottom {
          text-align: center;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, #ff6b35, transparent);
          margin-bottom: 2rem;
        }

        .footer-copyright {
          color: #999999;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-tagline {
            max-width: none;
          }
        }
      `}</style>
    </footer>
  )
}
