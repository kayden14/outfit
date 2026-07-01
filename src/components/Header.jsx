import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

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
      {/* ── Announcement Ticker ── */}
      <div
        id="ticker-bar"
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden flex items-center"
        style={{ height: "2rem", backgroundColor: "currentColor" }}
      >
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 pr-12 text-[9px] font-extrabold uppercase tracking-[0.3em] mix-blend-difference text-white"
            >
              <span>Free Accra delivery on all orders</span>
              <span className="opacity-40">✦</span>
              <span>Order via WhatsApp — 0201226473</span>
              <span className="opacity-40">✦</span>
              <span>New Collection — 2026 drop now live</span>
              <span className="opacity-40">✦</span>
              <span>TEMEO Collections · Mendskrom, Accra, Ghana</span>
              <span className="opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav
        id="header"
        className="fixed left-0 right-0 z-40"
        style={{ top: "2rem" }}
      >
        {/* Glass panel that fades in on scroll */}
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(0,0,0,0.72)"
              : "transparent",
            backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          }}
        >
          <div className="mx-auto flex w-full items-center justify-between px-5 lg:px-8 h-16">

            {/* ── Brand Logo ── */}
            <a
              href="/"
              aria-label="TEMEO Outfits — Home"
              className="flex-shrink-0 flex items-center gap-2 group"
            >
              <span
                className="font-[900] text-[1.15rem] tracking-[-0.05em] uppercase leading-none text-white transition-opacity duration-300 group-hover:opacity-75"
              >
                TEMEO
                <span className="opacity-40 font-bold"> Outfits</span>
              </span>
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

              {/* WhatsApp CTA pill */}
              <a
                href="https://wa.me/233201226473"
                target="_blank"
                rel="noreferrer noopener"
                id="header-whatsapp-btn"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-extrabold uppercase tracking-[0.12em] hover:bg-[#20C35A] active:scale-95 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="hidden sm:inline">Order Now</span>
              </a>

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
