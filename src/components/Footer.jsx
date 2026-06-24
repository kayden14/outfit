export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        {/* Column 1: Brand & Tagline */}
        <div className="footer-col" style={{ gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            OUTFIT<span style={{ fontSize: '0.75rem', fontWeight: 'normal', position: 'relative', top: '-0.25rem' }}>®</span>
          </h2>
          <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, opacity: 0.9, maxWidth: '24rem', marginBottom: '1rem' }}>
            Made to be worn.
            <br />
            Or judged. Or both.
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.3, userSelect: 'none' }}>
            © 2026 OUTFIT® Team. All rights reserved.
          </p>
        </div>

        {/* Column 2: About Statement */}
        <div className="footer-col">
          <h3 className="footer-col-title">
            About
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.625, opacity: 0.7 }}>
            Created by the ++hellohello team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
          </p>
        </div>

        {/* Column 3: Links */}
        <div className="footer-col">
          <h3 className="footer-col-title">
            Navigation
          </h3>
          <div className="footer-links">
            <a
              href="https://www.hellohello.is"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-studio-link"
            >
              ++hellohello Studio
            </a>
            <a
              href="https://www.hellohello.is/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-privacy-link"
            >
              Privacy Policy
            </a>
            <a 
              href="/shipping-and-return" 
              className="footer-link" 
              id="footer-shipping-link"
            >
              Shipping &amp; Returns
            </a>
          </div>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-col">
          <h3 className="footer-col-title">
            Social
          </h3>
          <div className="footer-links" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            <a
              href="https://dribbble.com/hellohelloteam"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-dribbble-link"
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com/hellohelloteam"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-instagram-link"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/hellohello"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-linkedin-link"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/hellohelloteam"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              id="footer-twitter-link"
            >
              Twitter (X)
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom location / payments bar */}
      <div className="footer-bottom">
        <div className="footer-credits">
          <a href="https://www.hellohello.is/work" target="_blank" rel="noreferrer" className="footer-link" id="footer-work-link">Work</a>
          <span>•</span>
          <a href="https://www.hellohello.is/services" target="_blank" rel="noreferrer" className="footer-link" id="footer-services-link">Services</a>
          <span>•</span>
          <a href="https://www.hellohello.is/about" target="_blank" rel="noreferrer" className="footer-link" id="footer-about-link">About</a>
          <span>•</span>
          <a href="https://www.hellohello.is/careers" target="_blank" rel="noreferrer" className="footer-link" id="footer-careers-link">Careers</a>
        </div>

        {/* Payment Icons */}
        <div className="payment-icons">
          <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '0.25rem', display: 'flex', alignItems: 'center' }}>Accepted Payments</span>
          <svg style={{ width: '1.5rem', height: '1rem' }} viewBox="0 0 32 20" fill="currentColor" aria-label="Visa">
            <rect width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 6l1.5 8h2l1.2-5.5L13 14h2L18 6h-2l-1.5 5.5L13 6h-2L9.5 11.5 8 6H7z" style={{ transform: 'scale(0.6)' }}/>
          </svg>
          <svg style={{ width: '1.5rem', height: '1rem' }} viewBox="0 0 32 20" fill="currentColor" aria-label="Mastercard">
            <rect width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="13" cy="10" r="4"/>
            <circle cx="19" cy="10" r="4" opacity="0.7"/>
          </svg>
          <svg style={{ width: '1.5rem', height: '1rem' }} viewBox="0 0 32 20" fill="currentColor" aria-label="Amex">
            <rect width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <text x="4" y="14" fontSize="8" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
          </svg>
          <svg style={{ width: '1.5rem', height: '1rem' }} viewBox="0 0 32 20" fill="currentColor" aria-label="Apple Pay">
            <rect width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <text x="6" y="14" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PAY</text>
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontWeight: 600, opacity: 0.6 }}>
          <span>Accra, Ghana.</span>
          <a 
            href="https://www.hellohello.is/contact" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-link"
            id="footer-contact-link"
            style={{ padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid var(--border-color)', opacity: 1 }}
          >
            Let's talk
          </a>
        </div>
      </div>
    </footer>
  );
}
