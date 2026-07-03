import { useState, useEffect, useRef } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

// Import hero background images
import heroShirt1 from "../assets/IMG_20260530_002712_628.jpg";
import heroShirt2 from "../assets/IMG_20260530_002713_440.jpg";
import heroShorts1 from "../assets/IMG_20260612_010147_061.JPG";
import heroShorts2 from "../assets/IMG_20260612_010151_301.JPG";
import heroWear from "../assets/TEMEO_20260624_193512_0000.jpg";
import heroTote from "../assets/4_20260513_182048_0001.png";

// Import lookbook/editorial images
import lookbook1 from "../assets/Model Cover Magazine_20260624_194046_0000.jpg";
import lookbook2 from "../assets/187426.jpg";
import lookbook3 from "../assets/20260624_193133_0000.jpg";
import lookbook4 from "../assets/TEMEO_20260624_193209_0000.jpg";

const HERO_PANELS = [
  {
    id: "shirts-dark",
    label: "Shirts",
    title: "TEMEO Shirts",
    sub: "Art-print tees",
    count: "7 styles",
    image: heroShirt1,
    accent: "#111",
    section: "#section-shirts",
    focus: "center top",
  },
  {
    id: "shirts-white",
    label: "Shirts",
    title: "White Edition",
    sub: "Clean & minimal",
    count: "Limited",
    image: heroShirt2,
    accent: "#f5f0ea",
    section: "#section-shirts",
    focus: "center top",
  },
  {
    id: "shorts-white",
    label: "Shorts",
    title: "TEMEO Shorts",
    sub: "White colourway",
    count: "3 styles",
    image: heroShorts1,
    accent: "#e8e4dc",
    section: "#section-shorts",
    focus: "center center",
  },
  {
    id: "shorts-black",
    label: "Shorts",
    title: "Dark Edition",
    sub: "Black colourway",
    count: "Limited run",
    image: heroShorts2,
    accent: "#1a1a1a",
    section: "#section-shorts",
    focus: "center center",
  },
  {
    id: "wears",
    label: "Wears",
    title: "TEMEO Wears",
    sub: "Oversized fits",
    count: "3 styles",
    image: heroWear,
    accent: "#d2cac3",
    section: "#section-wears",
    focus: "center 20%",
  },
  {
    id: "totes",
    label: "Tote Bags",
    title: "TEMEO Totes",
    sub: "Heavy canvas",
    count: "2 styles",
    image: heroTote,
    accent: "#0a0a0a",
    section: "#section-totes",
    focus: "center center",
  },
];

const SLIDE_DURATION = 5000; // ms per slide
const TICK_INTERVAL  = 50;   // progress bar refresh rate

// Scroll-reveal hook — fades + slides element in when it enters the viewport
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity    = "0";
    el.style.transform  = "translateY(36px)";
    el.style.transition = "opacity 0.75s ease, transform 0.75s cubic-bezier(0.19,1,0.22,1)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// Persistent floating WhatsApp contact button
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/233547882165"
      target="_blank"
      rel="noreferrer noopener"
      id="floating-whatsapp-btn"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] text-white font-extrabold text-[10px] uppercase tracking-widest px-4 py-3 shadow-xl hover:bg-[#1ebe5c] hover:shadow-2xl active:scale-95 transition-all duration-300"
    >
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
      <span className="hidden sm:inline">Order Now</span>
    </a>
  );
}

// Accordion Item component for FAQs
function FAQAccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-4 border-b border-current/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold uppercase tracking-wider text-sm md:text-base py-1 hover:opacity-85 transition-opacity"
      >
        <span className="pr-4">{title}</span>
        <span className="text-lg font-light leading-none select-none">{isOpen ? "−" : "+"}</span>
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="pt-2 pb-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { customProducts } = useCart();

  // Slideshow state
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide,   setPrevSlide]   = useState(null);
  const [progress,    setProgress]    = useState(0);
  const elapsed = useRef(0);
  const timerRef = useRef(null);

  // Scroll reveal refs
  const shirtsRef = useReveal(0.08);
  const shortsRef = useReveal(0.08);
  const wearsRef  = useReveal(0.08);
  const totesRef  = useReveal(0.08);
  const lookbookRef = useReveal(0.08);
  const infoRef    = useReveal(0.08);
  const ctaRef    = useReveal(0.08);

  // Start / restart the slideshow tick
  function startTimer() {
    clearInterval(timerRef.current);
    elapsed.current = 0;
    setProgress(0);
    timerRef.current = setInterval(() => {
      elapsed.current += TICK_INTERVAL;
      setProgress(Math.min((elapsed.current / SLIDE_DURATION) * 100, 100));
      if (elapsed.current >= SLIDE_DURATION) {
        advance(1);
      }
    }, TICK_INTERVAL);
  }

  function advance(dir) {
    setActiveSlide((cur) => {
      const next = (cur + dir + HERO_PANELS.length) % HERO_PANELS.length;
      setPrevSlide(cur);
      return next;
    });
    elapsed.current = 0;
    setProgress(0);
  }

  function goTo(idx) {
    setActiveSlide((cur) => {
      setPrevSlide(cur);
      return idx;
    });
    elapsed.current = 0;
    setProgress(0);
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Product card helpers
  const pMap = products.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});
  const renderCard = (id) => {
    const p = pMap[id];
    if (!p) return null;
    return <ProductCard product={p} onClick={setSelectedProduct} />;
  };

  // Custom products per category
  const customShirts = customProducts.filter(p =>
    p.category?.toLowerCase().includes("shirt")
  );
  const customShorts = customProducts.filter(p =>
    p.category?.toLowerCase().includes("short")
  );
  const customWears = customProducts.filter(p =>
    p.category?.toLowerCase().includes("wear")
  );
  const customTotes = customProducts.filter(p =>
    p.category?.toLowerCase().includes("tote")
  );

  return (
    <main className="flex-1" id="shop-main">

      {/* ══════════════════════════════════════════
          HERO — Cinematic Slideshow
      ══════════════════════════════════════════ */}
      <section className="pt-40 pb-0" id="hero-section">

        {/* Brand Header */}
        <div className="px-4 lg:px-8 mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-1">
              New Collection — 2026
            </p>
            <h1 className="text-4xl md:text-7xl font-[900] tracking-tighter leading-none uppercase">
              TEMEO<br />
              <span className="text-current opacity-40">Outfits</span>
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end text-right gap-2 text-xs font-bold uppercase opacity-60">
            <span>Mendskrom, Accra</span>
            <span>Ghana</span>
            <a
              href="https://wa.me/233547882165"
              className="text-current underline underline-offset-4 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noreferrer noopener"
            >
              Order via WhatsApp ↗
            </a>
          </div>
        </div>

        {/* ── Slideshow ── */}
        <div
          className="relative overflow-hidden h-[85vh] min-h-[580px] bg-black text-white"
          id="hero-slideshow"
        >
          {/* Slide stack */}
          {HERO_PANELS.map((panel, idx) => {
            const isActive = idx === activeSlide;
            const isPrev   = idx === prevSlide;

            return (
              <div
                key={panel.id}
                aria-hidden={!isActive}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-16 lg:p-24 gap-8 md:gap-12"
                style={{
                  opacity:       isActive ? 1 : 0,
                  zIndex:        isActive ? 2 : isPrev ? 1 : 0,
                  transition:    "opacity 1.1s cubic-bezier(0.77,0,0.18,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* Background ambient color derived from accent */}
                <div
                  className="absolute inset-0 opacity-25 transition-colors duration-1000"
                  style={{ backgroundColor: panel.accent }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/45" />

                {/* Left Side: Content block */}
                <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left mt-8 md:mt-0">
                  {/* Label & count */}
                  <p
                    className="text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3 text-white/50"
                    style={{
                      transform:  isActive ? "translateY(0)" : "translateY(12px)",
                      opacity:    isActive ? 0.65 : 0,
                      transition: isActive ? "transform 1s cubic-bezier(0.19,1,0.22,1) 0.1s, opacity 0.8s ease 0.1s" : "none",
                    }}
                  >
                    {panel.label} &nbsp;·&nbsp; {panel.count}
                  </p>

                  {/* Title */}
                  <h2
                    className="font-[900] uppercase tracking-tighter leading-none mb-4 text-white"
                    style={{
                      fontSize:   "clamp(2.2rem, 5vw, 4.5rem)",
                      transform:  isActive ? "translateY(0)" : "translateY(20px)",
                      opacity:    isActive ? 1 : 0,
                      transition: isActive ? "transform 1s cubic-bezier(0.19,1,0.22,1) 0.22s, opacity 0.8s ease 0.2s" : "none",
                    }}
                  >
                    {panel.title}
                  </h2>

                  {/* Subtitle */}
                  <p
                    className="text-sm font-medium mb-8 text-white/80 max-w-[40ch]"
                    style={{
                      transform:  isActive ? "translateY(0)" : "translateY(14px)",
                      opacity:    isActive ? 0.72 : 0,
                      transition: isActive ? "transform 1s cubic-bezier(0.19,1,0.22,1) 0.34s, opacity 0.8s ease 0.32s" : "none",
                    }}
                  >
                    {panel.sub}
                  </p>

                  {/* Shop CTA */}
                  <a
                    href={panel.section}
                    className="inline-flex items-center gap-2 border border-white/50 text-white text-[10px] font-extrabold uppercase tracking-widest px-7 py-3.5 hover:bg-white hover:text-black transition-colors duration-300"
                    style={{
                      transform:  isActive ? "translateY(0)" : "translateY(10px)",
                      opacity:    isActive ? 1 : 0,
                      transition: isActive
                        ? "background 0.3s, color 0.3s, transform 1s cubic-bezier(0.19,1,0.22,1) 0.46s, opacity 0.8s ease 0.44s"
                        : "none",
                    }}
                  >
                    Shop {panel.label} ↓
                  </a>
                </div>

                {/* Right Side: Portrait Image frame */}
                <div
                  className="relative z-10 w-full md:w-1/2 h-[42vh] md:h-[62vh] max-h-[520px] flex items-center justify-center"
                >
                  <div
                    className="w-auto h-full aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl relative"
                    style={{
                      transform:  isActive ? "scale(1)" : "scale(0.95)",
                      opacity:    isActive ? 1 : 0,
                      transition: isActive
                        ? "transform 1.2s cubic-bezier(0.19,1,0.22,1) 0.2s, opacity 1.2s ease 0.2s"
                        : "none",
                    }}
                  >
                    {/* Ken Burns photo inside frame — fits beautifully! */}
                    <img
                      src={panel.image}
                      alt={panel.title}
                      draggable="false"
                      className="w-full h-full will-change-transform object-cover"
                      style={{
                        objectPosition: panel.focus,
                        transform:  isActive ? "scale(1.06)" : "scale(1.0)",
                        transition: isActive
                          ? "transform 6s cubic-bezier(0.25,0.46,0.45,0.94)"
                          : "transform 0s",
                      }}
                    />
                  </div>
                </div>

                {/* Slide counter */}
                <div
                  className="absolute top-6 right-6 md:top-10 md:right-10 text-white"
                  style={{
                    opacity:    isActive ? 0.28 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-widest tabular-nums">
                    {String(idx + 1).padStart(2, "0")} / {String(HERO_PANELS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            );
          })}

          {/* ← Prev */}
          <button
            id="hero-prev-btn"
            aria-label="Previous slide"
            onClick={() => { advance(-1); startTimer(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/35 text-white bg-black/25 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* → Next */}
          <button
            id="hero-next-btn"
            aria-label="Next slide"
            onClick={() => { advance(1); startTimer(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/35 text-white bg-black/25 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dot / pill indicators */}
          <div className="absolute bottom-7 right-6 md:right-10 z-10 flex gap-2 items-center">
            {HERO_PANELS.map((_, idx) => (
              <button
                key={idx}
                id={`hero-dot-${idx}`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => { goTo(idx); startTimer(); }}
                className="cursor-pointer transition-all duration-400"
                style={{
                  width:        idx === activeSlide ? "28px" : "6px",
                  height:       "4px",
                  borderRadius: "2px",
                  background:   "white",
                  opacity:      idx === activeSlide ? 1 : 0.38,
                }}
              />
            ))}
          </div>

          {/* Auto-advance progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-10">
            <div
              className="h-full bg-white origin-left"
              style={{
                width:      `${progress}%`,
                transition: progress === 0 ? "none" : `width ${TICK_INTERVAL}ms linear`,
              }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="px-4 lg:px-8 py-6 flex items-center justify-between border-b border-current/10 text-xs font-bold uppercase tracking-widest opacity-50">
          <span>↓ Shop the collection</span>
          <span>15 pieces</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT GRID SECTIONS
      ══════════════════════════════════════════ */}
      <div className="px-4 lg:px-8">

        {/* Category Filter Tabs */}
        <div className="flex border-b border-current/10 py-6 mb-8 gap-4 md:gap-8 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { id: "all", label: "All Items" },
            { id: "shirts", label: "Shirts" },
            { id: "shorts", label: "Shorts" },
            { id: "wears", label: "Wears" },
            { id: "ladies", label: "Ladies 🌸" },
            { id: "totes", label: "Totes & Bags" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs md:text-sm font-extrabold uppercase tracking-widest pb-2 border-b-2 transition-all duration-300 ${
                activeCategory === cat.id
                  ? "border-current opacity-100"
                  : "border-transparent opacity-40 hover:opacity-80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── TEMEO Shirts ── */}
        {(activeCategory === "all" || activeCategory === "shirts") && (
          <section ref={shirtsRef} className="pt-16 pb-20" id="section-shirts">
            <div className="flex items-baseline justify-between mb-8 border-b border-current/10 pb-4">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Collection</p>
                <h2 className="text-xl md:text-4xl font-[900] tracking-tighter uppercase">TEMEO Shirts</h2>
              </div>
              <span className="text-xs font-bold opacity-40 uppercase">{7 + customShirts.length} styles</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-6">
              {renderCard("temeo-kaws-dark")}
              {renderCard("temeo-kaws-together")}
              {renderCard("temeo-kaws-boss")}
              {renderCard("temeo-kaws-neon-bear")}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 mt-3 lg:mt-6">
              {renderCard("temeo-kaws-squad")}
              {renderCard("temeo-mickey")}
              {renderCard("temeo-kaws-white")}
              {customShirts.map(p => (
                <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* ── TEMEO Shorts ── */}
        {(activeCategory === "all" || activeCategory === "shorts") && (
          <section ref={shortsRef} className="py-20 border-t border-current/10" id="section-shorts">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-current/10">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Collection</p>
                <h2 className="text-xl md:text-4xl font-[900] tracking-tighter uppercase">Temeo Shorts</h2>
              </div>
              <span className="text-xs font-bold opacity-40 uppercase">{3 + customShorts.length} styles</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-6">
              {renderCard("temeo-shorts-white")}
              {renderCard("temeo-shorts-black")}
              {renderCard("temeo-shorts-multi")}
              {customShorts.map(p => (
                <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* ── TEMEO Wears ── */}
        {(activeCategory === "all" || activeCategory === "wears") && (
          <section ref={wearsRef} className="py-20 border-t border-current/10" id="section-wears">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-current/10">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Collection</p>
                <h2 className="text-xl md:text-4xl font-[900] tracking-tighter uppercase">TEMEO Wears</h2>
              </div>
              <span className="text-xs font-bold opacity-40 uppercase">{3 + customWears.length} styles</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-6">
              {renderCard("temeo-wateva-cream")}
              {renderCard("temeo-classic-logo")}
              {renderCard("temeo-gallery-tee")}
              {customWears.map(p => (
                <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* ── TEMEO LADIES (Coming Soon) ── */}
        {(activeCategory === "all" || activeCategory === "ladies") && (
          <section className="py-20 border-t border-current/10" id="section-ladies">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-current/10">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Collection</p>
                <h2 className="text-xl md:text-4xl font-[900] tracking-tighter uppercase">TEMEO Ladies</h2>
              </div>
              <span className="text-xs font-bold opacity-40 uppercase">Coming Soon</span>
            </div>
            <div className="relative overflow-hidden border border-current/10 flex flex-col items-center justify-center py-20 px-8 text-center gap-6">
              {/* subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,currentColor_1px,transparent_1px)] bg-[length:24px_24px]" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <span className="text-5xl">🌸</span>
                <h3 className="text-2xl md:text-4xl font-[900] tracking-tighter uppercase">
                  Ladies’ Collection<br />
                  <span className="opacity-30">Coming Soon</span>
                </h3>
                <p className="text-sm opacity-60 max-w-[36ch] leading-relaxed">
                  Ladies shirts and crop tops are on the way. Featuring TEMEO Kaws, Ricky, Fitz, Jay and Wateva silhouettes made for her.
                </p>
                <a
                  href="https://wa.me/233547882165?text=Hi%20TEMEO%20Collections!%20Please%20notify%20me%20when%20the%20Ladies%20collection%20is%20available."
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white font-extrabold text-xs uppercase py-3 px-8 tracking-widest hover:bg-[#1ebe5c] active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Notify me when it’s live
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── TEMEO Tote Bags ── */}
        {(activeCategory === "all" || activeCategory === "totes") && (
          <section ref={totesRef} className="py-20 border-t border-current/10" id="section-totes">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-current/10">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Collection</p>
                <h2 className="text-xl md:text-4xl font-[900] tracking-tighter uppercase">TEMEO Tote Bags</h2>
              </div>
              <span className="text-xs font-bold opacity-40 uppercase">{2 + customTotes.length} styles</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
              {renderCard("temeo-tote-night")}
              {renderCard("temeo-tote-books")}
              {customTotes.map(p => (
                <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* ── EDITORIAL LOOKBOOK ── */}
        {(activeCategory === "all") && (
          <section ref={lookbookRef} className="py-20 border-t border-current/10" id="section-lookbook">
            <div className="flex flex-col mb-12">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Aesthetic</p>
              <h2 className="text-2xl md:text-5xl font-[900] tracking-tighter uppercase">Editorial Lookbook</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <div className="md:col-span-8 overflow-hidden aspect-[16/9] border border-current/10 bg-neutral-900">
                <img src={lookbook3} alt="Lookbook 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none" draggable="false" />
              </div>
              <div className="md:col-span-4 overflow-hidden aspect-[3/4] border border-current/10 bg-neutral-900">
                <img src={lookbook1} alt="Lookbook 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none" draggable="false" />
              </div>
              <div className="md:col-span-4 overflow-hidden aspect-[3/4] border border-current/10 bg-neutral-900">
                <img src={lookbook2} alt="Lookbook 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none" draggable="false" />
              </div>
              <div className="md:col-span-8 overflow-hidden aspect-[16/9] border border-current/10 bg-neutral-900">
                <img src={lookbook4} alt="Lookbook 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none" draggable="false" />
              </div>
            </div>
          </section>
        )}

        {/* ── BRAND MANIFESTO & FAQ ── */}
        {(activeCategory === "all") && (
          <section ref={infoRef} className="py-20 border-t border-current/10 grid grid-cols-1 lg:grid-cols-2 gap-12" id="about-info">
            {/* Left Column: Brand Story / Manifesto */}
            <div className="flex flex-col justify-start">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-2">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase mb-6">TEMEO Collections</h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
                Born in Mendskrom, Accra, TEMEO is a streetwear collective exploring contemporary youth culture, art-print garments, and premium oversized fits. We blend bold graphic prints with premium, heavy-weight fabrics to create statement outfits designed to last.
              </p>
              <p className="text-sm opacity-60 leading-relaxed">
                Each drop is created in limited runs, handcrafted locally, and distributed directly via our interactive order flow. We believe in clothes made to be worn, judged, and integrated into your daily culture.
              </p>
            </div>

            {/* Right Column: Size Guide & FAQ Accordions */}
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-2">Guides & Questions</p>
              <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase mb-6">FAQ & Sizes</h2>
              
              <div className="flex flex-col">
                <FAQAccordionItem title="Size Guide (Oversized Fits)">
                  <div className="text-xs md:text-sm opacity-80 space-y-2">
                    <p>Our shirts and wears use an oversized comfort fit. We recommend ordering your standard size for the intended drape, or sizing down for a closer fit.</p>
                    <table className="w-full text-left mt-3 border border-current/10 text-xs">
                      <thead>
                        <tr className="border-b border-current/10 bg-current/5">
                          <th className="p-2">Size</th>
                          <th className="p-2">Chest (in)</th>
                          <th className="p-2">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-current/10">
                          <td className="p-2 font-bold">M</td>
                          <td className="p-2">44"</td>
                          <td className="p-2">28"</td>
                        </tr>
                        <tr className="border-b border-current/10">
                          <td className="p-2 font-bold">L</td>
                          <td className="p-2">48"</td>
                          <td className="p-2">29"</td>
                        </tr>
                        <tr className="border-b border-current/10">
                          <td className="p-2 font-bold">XL</td>
                          <td className="p-2">52"</td>
                          <td className="p-2">30"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </FAQAccordionItem>

                <FAQAccordionItem title="How does the WhatsApp order system work?">
                  <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                    We use a WhatsApp-integrated ordering system. Browse our catalog, click "Order Now" or select your size in the details modal, and click "Order via WhatsApp". This generates a custom message with your selected item details directly to our customer representative at 0547882165.
                  </p>
                </FAQAccordionItem>

                <FAQAccordionItem title="Delivery & Pickup (Accra, Ghana)">
                  <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                    We offer prompt dispatch delivery via motorbike courier across Accra, Tema, and surrounding regions. Pickup can also be coordinated directly through our WhatsApp representative. International shipping can be arranged upon request.
                  </p>
                </FAQAccordionItem>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA Strip ── */}
        <section ref={ctaRef} className="py-16 border-t border-current/10 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-4">Ready to order?</p>
          <p className="text-2xl md:text-5xl font-[900] tracking-tighter uppercase mb-8">
            Chat us on<br />WhatsApp
          </p>
          <a
            href="https://wa.me/233547882165"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-extrabold text-sm uppercase py-4 px-10 tracking-wider hover:bg-[#1ebe5c] active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            0547882165
          </a>
          <p className="mt-4 text-[10px] uppercase tracking-widest opacity-40">
            temeocollections@gmail.com
          </p>
        </section>
      </div>

      {/* Floating persistent WhatsApp helper */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
