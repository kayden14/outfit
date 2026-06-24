import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, setBagOpen, theme, setTheme, setMenuOpen, setShopPanelOpen } = useCart();

  return (
    <header className="header">
      <nav className="header-nav">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="brand-logo"
          id="header-logo-link"
        >
          OUTFIT<span className="text-[10px] font-medium leading-none relative -top-1.5">®</span>
        </a>

        <div className="header-actions">
          {/* Theme switcher dots - Desktop */}
          <div className="theme-dots" aria-label="Theme switcher">
            <button
              onClick={() => setTheme("white")}
              className={`theme-dot theme-dot-white ${theme === "white" ? "active" : ""}`}
              title="White Mode"
            />
            <button
              onClick={() => setTheme("red")}
              className={`theme-dot theme-dot-red ${theme === "red" ? "active" : ""}`}
              title="Red Mode"
            />
          </div>

          {/* Navigation Links */}
          <div className="desktop-nav">
            <a 
              href="/" 
              className="nav-link" 
              id="header-shop-link"
            >
              Shop
            </a>
            <button
              className="bag-btn"
              id="header-bag-btn"
              onClick={() => setShopPanelOpen(true)}
            >
              Bag <span className="bag-badge">{count}</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <button
              className="mobile-btn"
              onClick={() => setShopPanelOpen(true)}
              aria-label="Open bags panel"
            >
              Bag ({count})
            </button>
            <button
              className="mobile-btn menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
