import { useCart } from "../context/CartContext";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, setBagOpen, count, theme, setTheme } = useCart();

  const handleShopClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBagClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setBagOpen(true);
  };

  return (
    <div 
      className={`mobile-menu-overlay ${menuOpen ? "open" : "closed"} ${theme === 'red' ? 'bg-red' : 'bg-white'}`}
    >
      <div className="mobile-menu-content">
        
        {/* Close Button */}
        <button 
          className="mobile-close-btn" 
          onClick={() => setMenuOpen(false)}
        >
          ✕ Close
        </button>

        {/* Large Navigation Links */}
        <ul className="mobile-nav-list">
          <li style={{ overflow: 'hidden' }}>
            <a 
              href="/" 
              className="mobile-nav-link" 
              onClick={handleShopClick}
            >
              Shop
            </a>
          </li>
          <li style={{ overflow: 'hidden' }}>
            <a 
              href="/bag" 
              className="mobile-nav-link" 
              onClick={handleBagClick}
            >
              Bag <span className="mobile-bag-count">({count})</span>
            </a>
          </li>

          {/* Theme switcher inside mobile menu */}
          <li className="mobile-theme-section">
            <span className="mobile-theme-title">
              Select Theme
            </span>
            <div className="mobile-theme-dots">
              <button
                onClick={() => setTheme("white")}
                className={`mobile-theme-dot ${theme === "white" ? "active" : "inactive"}`}
                style={{ backgroundColor: '#ffffff' }}
                aria-label="Switch to White Theme"
              />
              <button
                onClick={() => setTheme("red")}
                className={`mobile-theme-dot ${theme === "red" ? "active" : "inactive"}`}
                style={{ backgroundColor: '#ff0001' }}
                aria-label="Switch to Red Theme"
              />
            </div>
          </li>
        </ul>

        {/* Mobile menu Footer */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(10, 10, 10, 0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, opacity: 0.7 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <a 
              href="https://www.hellohello.is" 
              style={{ fontWeight: 800, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }} 
              target="_blank" 
              rel="noreferrer"
            >
              ++hellohello
            </a>
            <p>© 2026 OUTFIT® signature series.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>Accra, Ghana.</p>
            <p style={{ opacity: 0.5, marginTop: '0.125rem' }}>Designed to inspire.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
