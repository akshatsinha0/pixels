'use client'
import { useEffect, useRef } from 'react'

export default function Events() {
  const eventsRef = useRef(null)

  useEffect(() => {
    const initEventsAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Timeline animation for events
      gsap.fromTo('.event-timeline-item',
        {
          x: -200,
          opacity: 0,
          rotateZ: -45
        },
        {
          x: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eventsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initEventsAnimations()
  }, [])

  const events = [
    {
      date: 'March 2025',
      title: 'Digital Renaissance Summit',
      description: 'Annual gathering of creative minds pushing digital boundaries',
      status: 'upcoming'
    },
    {
      date: 'February 2025',
      title: 'Innovation Hackathon',
      description: '48-hour intensive creative coding marathon',
      status: 'upcoming'
    },
    {
      date: 'January 2025',
      title: 'Portfolio Showcase',
      description: 'Celebrating exceptional student creative works',
      status: 'completed'
    },
    {
      date: 'December 2024',
      title: 'AI Art Workshop',
      description: 'Exploring the intersection of AI and creative expression',
      status: 'completed'
    }
  ]

  return (
    <section id="events" className="events-section" ref={eventsRef}>
      <div className="section">
        <h2 className="section-title savate-display">Event Horizon</h2>
        <div className="events-timeline">
          <div className="timeline-line"></div>
          {events.map((event, index) => (
            <div key={index} className="event-timeline-item floating-section">
              <div className="event-marker">
                <div className="marker-dot"></div>
              </div>
              <div className="event-content">
                <div className="event-date savate-display">{event.date}</div>
                <h3 className="event-title savate-display">{event.title}</h3>
                <p className="event-description savate-body">{event.description}</p>
                <div className={`event-status ${event.status}`}>
                  {event.status === 'upcoming' ? '🚀 Upcoming' : '✅ Completed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .events-section {
          padding: 8rem 0;
          position: relative;
        }

        .events-timeline {
          position: relative;
          max-width: 800px;
          margin: 4rem auto 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #ff6b35, #f7931e);
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(255,107,53,0.5);
        }

        .event-timeline-item {
          position: relative;
          margin-bottom: 4rem;
          padding: 2rem;
        }

        .event-timeline-item:nth-child(odd) {
          margin-left: 0;
          margin-right: 50%;
          text-align: right;
        }

        .event-timeline-item:nth-child(even) {
          margin-left: 50%;
          margin-right: 0;
          text-align: left;
        }

        .event-marker {
          position: absolute;
          top: 50%;
          width: 30px;
          height: 30px;
          transform: translateY(-50%);
        }

        .event-timeline-item:nth-child(odd) .event-marker {
          right: -65px;
        }

        .event-timeline-item:nth-child(even) .event-marker {
          left: -65px;
        }

        .marker-dot {
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #ff6b35, #f7931e);
          border-radius: 50%;
          border: 4px solid #0a0a0a;
          animation: markerPulse 2s ease-in-out infinite;
        }

        @keyframes markerPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,107,53,0.3); }
          50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(255,107,53,0.8); }
        }

        .event-date {
          font-size: 1rem;
          color: #ff6b35;
          margin-bottom: 0.5rem;
        }

        .event-title {
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .event-description {
          font-size: 1rem;
          color: #cccccc;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .event-status {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: inline-block;
        }

        .event-status.upcoming {
          background: rgba(255, 107, 53, 0.15);
          color: #ff6b35;
          border: 1px solid rgba(255, 107, 53, 0.3);
        }

        .event-status.completed {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        @media (max-width: 768px) {
          .event-timeline-item {
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: left !important;
            padding-left: 3rem;
          }

          .timeline-line {
            left: 20px;
          }

          .event-marker {
            left: 5px !important;
            right: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
