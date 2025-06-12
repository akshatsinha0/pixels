'use client'
import { useEffect, useRef, useState } from 'react'

export default function Gallery() {
  const galleryRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const initGalleryAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      // Masonry animation
      gsap.fromTo('.gallery-item',
        {
          scale: 0,
          opacity: 0,
          y: 100,
          rotation: 45
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    initGalleryAnimations()
  }, [])

  const galleryItems = [
    { id: 1, title: 'Digital Metamorphosis', category: 'Web Design' },
    { id: 2, title: 'Quantum Interface', category: 'UI/UX' },
    { id: 3, title: 'Neural Networks', category: 'AI Art' },
    { id: 4, title: 'Holographic Dreams', category: 'VR/AR' },
    { id: 5, title: 'Cybernetic Symphony', category: 'Motion Graphics' },
    { id: 6, title: 'Digital Renaissance', category: 'Photography' },
    { id: 7, title: 'Algorithmic Poetry', category: 'Generative Art' },
    { id: 8, title: 'Pixel Paradigm', category: 'Digital Art' }
  ]

  return (
    <section id="gallery" className="gallery-section" ref={galleryRef}>
      <div className="section">
        <h2 className="section-title savate-display">Creative Cosmos</h2>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-item magnetic"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🎨</span>
                </div>
                <div className="image-overlay">
                  <h3 className="image-title savate-display">{item.title}</h3>
                  <p className="image-category savate-body">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <h3 className="modal-title savate-display">{selectedImage.title}</h3>
            <p className="modal-category savate-body">{selectedImage.category}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-section {
          padding: 8rem 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .gallery-item {
          cursor: none;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }

        .gallery-image {
          position: relative;
          height: 300px;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          overflow: hidden;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          opacity: 0.3;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 2rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .image-overlay {
          transform: translateY(0);
        }

        .image-title {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .image-category {
          font-size: 0.9rem;
          color: #ff6b35;
        }

        .gallery-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(20px);
        }

        .modal-content {
          background: rgba(255,255,255,0.1);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          position: relative;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
        }

        .modal-title {
          font-size: 2rem;
          color: #ff6b35;
          margin-bottom: 1rem;
        }

        .modal-category {
          font-size: 1.2rem;
          color: #cccccc;
        }
      `}</style>
    </section>
  )
}
