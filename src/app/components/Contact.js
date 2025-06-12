'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section">
        <h2 className="section-title">Let's Create Together</h2>
        <div className="grid-2">
          <div className="contact-info">
            <h3 style={{ marginBottom: '2rem', color: '#ff6b35' }}>
              Ready to start your project?
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#cccccc' }}>
              We'd love to hear about your vision and help bring it to life. 
              Get in touch and let's discuss how we can work together.
            </p>
            <div className="contact-details">
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#ff6b35' }}>Email:</strong>
                <br />
                hello@pixelateclub.com
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#ff6b35' }}>Location:</strong>
                <br />
                Creative District, Design City
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  marginBottom: '2rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
