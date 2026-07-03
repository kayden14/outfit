import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import temeoLogo from "../assets/temeo_logo.png";

export default function Header() {
  const { count, setBagOpen, theme, setTheme, setMenuOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBagClick = (e) => {
    e.preventDefault();
    setBagOpen(true);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpen(true);
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
        {/* Glass panel — always has a subtle gradient, deepens on scroll */}
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

            {/* ── Brand Logo ── */}
            <a
              href="/"
              aria-label="TEMEO Collections — Home"
              className="flex-shrink-0 flex items-center gap-2 group"
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
                    {/* animated underline */}
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">

              {/* Theme Switcher dots — desktop */}
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

        {/* ── Slim divider line visible only when not scrolled ── */}
        {!scrolled && (
          <div className="mx-5 lg:mx-8 h-px bg-white/10" />
        )}
      </nav>
    </>
  );
}
