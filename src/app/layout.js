import './globals.css'

export const metadata = {
  title: 'Pixelate Club | Creative Digital Collective',
  description: 'Revolutionary creative studio pushing boundaries of digital art and immersive experiences.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Savate:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="preloader">
          <div className="logo-container">
            <svg viewBox="0 0 400 200" className="animated-logo">
              <path id="logo-path" d="M50,150 Q100,50 150,150 T250,150 Q300,50 350,150" 
                    stroke="#ff6b35" strokeWidth="4" fill="none" />
              <text x="200" y="100" textAnchor="middle" className="logo-text">PIXELATE</text>
            </svg>
            <div className="loading-text">Crafting Digital Dreams...</div>
          </div>
        </div>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
