'use client'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navigationItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'menu', label: 'Menu', href: '#menu' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'domains', label: 'Domains', href: '#domains' },
    { id: 'events', label: 'Events', href: '#events' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'board-members', label: 'Board', href: '#board-members' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    const initAdvancedNavigation = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Advanced scroll detection for navigation state
      const handleScroll = () => {
        const scrolled = window.scrollY > 50
        setIsScrolled(scrolled)

        // Active section detection based on scroll position
        const sections = navigationItems.map(item => document.querySelector(item.href))
        const scrollPos = window.scrollY + 200

        sections.forEach((section, index) => {
          if (section) {
            const offsetTop = section.offsetTop
            const offsetBottom = offsetTop + section.offsetHeight
            
            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
              setActiveSection(navigationItems[index].id)
            }
          }
        })
      }

      // Smooth scroll implementation for navigation links
      const handleSmoothScroll = (e, targetId) => {
        e.preventDefault()
        const target = document.querySelector(targetId)
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: target,
              offsetY: 100
            },
            ease: "power3.inOut"
          })
        }
      }

      // Add event listeners for navigation items
      navigationItems.forEach(item => {
        const navElement = document.querySelector(`[data-nav="${item.id}"]`)
        if (navElement) {
          navElement.addEventListener('click', (e) => handleSmoothScroll(e, item.href))
        }
      })

      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial call

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    initAdvancedNavigation()
  }, [])

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo savate-display">PIXELATE</div>
        <ul className="nav-links">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a 
                href={item.href}
                data-nav={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                data-cursor-text={`Go to ${item.label}`}
              >
                {item.label}
                <span className="nav-indicator"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 1.5rem 2rem;
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navigation.scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(40px);
          border-bottom-color: rgba(255, 107, 53, 0.3);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 900;
          color: #ff6b35;
          text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
          text-shadow: 0 0 30px rgba(255, 107, 53, 0.8);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-family: 'Savate', sans-serif;
          position: relative;
          transition: all 0.3s ease;
          cursor: none;
          padding: 0.5rem 1rem;
          border-radius: 25px;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35, #f7931e);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 80%;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #ff6b35;
          background: rgba(255, 107, 53, 0.1);
          text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
        }

        .nav-indicator {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 6px;
          height: 6px;
          background: #ff6b35;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-link.active .nav-indicator {
          opacity: 1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }

        @media (max-width: 1024px) {
          .nav-links {
            gap: 1rem;
          }
          
          .nav-link {
            font-size: 0.9rem;
            padding: 0.3rem 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none; /* Mobile menu implementation needed */
          }
        }
      `}</style>
    </nav>
  )
}
