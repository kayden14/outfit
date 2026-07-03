import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import temeoLogo from "../assets/temeo_logo.png";

const ADMIN_PASSWORD = "temeo2026"; // Change this to whatever you want
const SECRET_TAPS    = 5;           // How many times to tap the logo

export default function Header() {
  const { count, setBagOpen, theme, setTheme, setMenuOpen, setView, view } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // ── Secret logo tap counter ──
  const tapCount  = useRef(0);
  const tapTimer  = useRef(null);

  // ── Password gate state ──
  const [showGate,   setShowGate]   = useState(false);
  const [password,   setPassword]   = useState("");
  const [gateError,  setGateError]  = useState(false);
  const [gateMounted, setGateMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate gate in when it opens
  useEffect(() => {
    if (showGate) {
      requestAnimationFrame(() => setGateMounted(true));
    } else {
      setGateMounted(false);
    }
  }, [showGate]);

  // Escape key closes gate
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeGate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleBagClick = (e) => {
    e.preventDefault();
    setBagOpen(true);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };

  // ── Logo tap logic ──
  const handleLogoTap = (e) => {
    // Only intercept if we're looking for the secret — don't block normal nav
    tapCount.current += 1;
    clearTimeout(tapTimer.current);

    if (tapCount.current >= SECRET_TAPS) {
      tapCount.current = 0;
      e.preventDefault(); // prevent page reload only on trigger
      if (view === "admin") {
        // Already in admin — exit back to shop immediately
        setView("shop");
      } else {
        // Open the password gate
        setPassword("");
        setGateError(false);
        setShowGate(true);
      }
    } else {
      // Reset tap counter if no more taps within 1.5s
      tapTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, 1500);
    }
  };

  const closeGate = () => {
    setGateMounted(false);
    setTimeout(() => {
      setShowGate(false);
      setPassword("");
      setGateError(false);
    }, 350);
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      closeGate();
      setTimeout(() => setView("admin"), 360);
    } else {
      setGateError(true);
      setPassword("");
      setTimeout(() => setGateError(false), 2000);
    }
  };

  const NAV_LINKS = [
    { label: "Shirts",   href: "#section-shirts"   },
    { label: "Shorts",   href: "#section-shorts"   },
    { label: "Wears",    href: "#section-wears"    },
    { label: "Totes",    href: "#section-totes"    },
    { label: "Lookbook", href: "#section-lookbook" },
  ];

  return (
    <>
      {/* ── Main Nav ── */}
      <nav
        id="header"
        className="fixed left-0 right-0 z-40"
        style={{ top: 0 }}
      >
        {/* Glass panel */}
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(0,0,0,0.80)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          }}
        >
          <div className="mx-auto flex w-full items-center justify-between px-5 lg:px-8 h-16">

            {/* ── Brand Logo — secret admin trigger (5 taps) ── */}
            <a
              href="/"
              aria-label="TEMEO Collections — Home"
              className="flex-shrink-0 flex items-center gap-2 group"
              onClick={handleLogoTap}
            >
              <img
                src={temeoLogo}
                alt="TEMEO Collections"
                className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-70"
                style={{ filter: "invert(1)" }}
              />
            </a>

            {/* ── Desktop Centre Nav ── */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="relative px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-200 group"
                  >
                    {label}
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">

              {/* Theme Switcher dots */}
              <div className="hidden md:flex items-center gap-1.5 mr-2" id="theme-switcher">
                <button
                  onClick={() => setTheme("dark")}
                  title="Dark theme"
                  className={`w-3.5 h-3.5 rounded-full bg-black border border-white/30 cursor-pointer transition-all duration-200 ${theme === "dark" ? "ring-2 ring-offset-1 ring-offset-transparent ring-white/60 scale-110" : "hover:scale-105"}`}
                />
                <button
                  onClick={() => setTheme("light")}
                  title="Light theme"
                  className={`w-3.5 h-3.5 rounded-full bg-[#ede4dd] border border-white/20 cursor-pointer transition-all duration-200 ${theme === "light" ? "ring-2 ring-offset-1 ring-offset-transparent ring-white/60 scale-110" : "hover:scale-105"}`}
                />
                <button
                  onClick={() => setTheme("red")}
                  title="Red theme"
                  className={`w-3.5 h-3.5 rounded-full bg-[#ff0001] border border-white/20 cursor-pointer transition-all duration-200 ${theme === "red" ? "ring-2 ring-offset-1 ring-offset-transparent ring-white/60 scale-110" : "hover:scale-105"}`}
                />
              </div>

              {/* Orders pill */}
              <button
                onClick={handleBagClick}
                id="orders-btn"
                className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders
                {count > 0 && (
                  <span className="bg-white text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {count}
                  </span>
                )}
              </button>

              {/* Admin back-to-shop — only visible when IN admin view */}
              {view === "admin" && (
                <button
                  onClick={() => setView("shop")}
                  className="hidden md:flex items-center text-white/60 hover:text-white text-[10px] font-extrabold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                >
                  ← Shop
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 cursor-pointer group"
                onClick={handleMenuClick}
                aria-label="Open menu"
              >
                <span className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-6" />
                <span className="block w-4 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-6" />
                <span className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-6" />
              </button>

            </div>
          </div>
        </div>

        {/* Slim divider */}
        {!scrolled && (
          <div className="mx-5 lg:mx-8 h-px bg-white/10" />
        )}
      </nav>

      {/* ── Admin Password Gate Modal ── */}
      {showGate && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-350 ${
              gateMounted ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeGate}
          />

          {/* Gate Card */}
          <div
            className={`fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[var(--bg)] text-[var(--fg)] border border-current/15 shadow-2xl p-8 flex flex-col gap-6 transition-all duration-350 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              gateMounted ? "opacity-100 -translate-y-1/2 scale-100" : "opacity-0 -translate-y-[45%] scale-95"
            }`}
          >
            {/* Header */}
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">
                Restricted Area
              </p>
              <h2 className="text-xl font-[900] tracking-tighter uppercase">
                Owner Access
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleGateSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full bg-transparent border px-4 py-3 text-sm focus:outline-none transition-colors ${
                    gateError
                      ? "border-red-500 placeholder:text-red-400"
                      : "border-current/25 focus:border-current"
                  }`}
                />
                {gateError && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                    ✕ Incorrect password. Try again.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-current text-[var(--bg)] font-extrabold text-xs uppercase py-3 tracking-widest hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Enter
                </button>
                <button
                  type="button"
                  onClick={closeGate}
                  className="px-5 border border-current/25 text-xs font-extrabold uppercase tracking-widest hover:border-current/60 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
