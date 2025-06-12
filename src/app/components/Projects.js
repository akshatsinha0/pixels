'use client'
import { useEffect, useRef } from 'react'

export default function Projects() {
  const projectsRef = useRef(null)

  useEffect(() => {
    const initProjectAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Staggered card animations
      gsap.fromTo('.project-card',
        {
          y: 150,
          opacity: 0,
          rotateY: -15,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Infinite scroll effect
      const cards = document.querySelectorAll('.project-card')
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      })
    }

    initProjectAnimations()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Neural Canvas',
      description: 'AI-powered digital art platform that transforms thoughts into visual masterpieces',
      tech: ['Neural Networks', 'WebGL', 'Real-time Rendering'],
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      id: 2,
      title: 'Quantum Interface',
      description: 'Revolutionary UI framework that adapts to user behavior in real-time',
      tech: ['Quantum Computing', 'Machine Learning', 'Adaptive UI'],
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    },
    {
      id: 3,
      title: 'Holographic Commerce',
      description: 'Next-gen e-commerce platform with immersive holographic product visualization',
      tech: ['Holography', 'AR/VR', 'Spatial Computing'],
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      id: 4,
      title: 'Dimensional Storytelling',
      description: 'Multi-dimensional narrative platform for interactive story experiences',
      tech: ['Interactive Media', '3D Audio', 'Haptic Feedback'],
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    },
    {
      id: 5,
      title: 'Consciousness Stream',
      description: 'Brain-computer interface for direct creative expression',
      tech: ['BCI Technology', 'Neurofeedback', 'Creative AI'],
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      id: 6,
      title: 'Reality Synthesizer',
      description: 'Tool for creating and manipulating alternate reality experiences',
      tech: ['Reality Engine', 'Physics Simulation', 'Quantum Rendering'],
      gradient: 'linear-gradient(135deg, #f7931e, #ff6b35)'
    }
  ]

  return (
    <section id="projects" className="projects-section" ref={projectsRef}>
      <div className="section">
        <h2 className="section-title savate-display">Impossible Made Real</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card floating-section magnetic"
              data-cursor-text={`Explore ${project.title}`}
            >
              <div 
                className="project-visual"
                style={{ background: project.gradient }}
              >
                <div className="project-pattern"></div>
                <div className="project-glow"></div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title savate-display">
                  {project.title}
                </h3>
                <p className="project-description savate-body">
                  {project.description}
                </p>
                <div className="tech-constellation">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="tech-orb"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .project-card {
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
          transform-style: preserve-3d;
        }

        .project-visual {
          width: 100%;
          height: 300px;
          border-radius: 20px;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .project-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E");
          animation: patternFloat 15s linear infinite;
        }

        @keyframes patternFloat {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-40px) translateY(-40px); }
        }

        .project-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }

        .project-content {
          position: relative;
          z-index: 2;
        }

        .project-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #ffffff;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .project-description {
          font-size: 1.1rem;
          color: #cccccc;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .tech-constellation {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tech-orb {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.2rem;
          background: rgba(255, 107, 53, 0.15);
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ff6b35;
          font-family: 'Savate', sans-serif;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tech-orb::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .tech-orb:hover::before {
          left: 100%;
        }

        .tech-orb:hover {
          background: rgba(255, 107, 53, 0.25);
          border-color: rgba(255, 107, 53, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.2);
        }

        .project-hover-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 30px;
        }

        .project-card:hover .project-hover-effect {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .project-visual {
            height: 200px;
          }
          
          .project-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
