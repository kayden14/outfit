import { useState, useEffect, useRef } from "react";

const HERO_IMAGES = [
  { src: "/preloader/image-01.jpg", label: "Organic Forms" },
  { src: "/preloader/image-02.jpg", label: "Negative Space" },
  { src: "/preloader/image-03.jpg", label: "The Grid" },
  { src: "/preloader/image-04.jpg", label: "Restraint" },
  { src: "/preloader/image-05.jpg", label: "Monochrome" },
  { src: "/preloader/image-06.jpg", label: "Considered" },
];

export default function HeroEditorial() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse for floating label
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="hero-editorial"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background ambient gradient */}
      <div className="hero-editorial__ambient" aria-hidden="true" />

      {/* Mosaic image grid */}
      <div className="hero-editorial__mosaic">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`hero-editorial__cell hero-editorial__cell--${i + 1} ${
              activeIndex === i ? "is-active" : ""
            } ${activeIndex !== null && activeIndex !== i ? "is-dimmed" : ""}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <img
              src={img.src}
              alt={img.label}
              className="hero-editorial__img"
              loading="eager"
              draggable="false"
            />
            <div className="hero-editorial__cell-overlay" />
            <span className="hero-editorial__cell-index">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Floating label that follows cursor */}
      {activeIndex !== null && (
        <div
          className="hero-editorial__cursor-label"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          {HERO_IMAGES[activeIndex].label}
        </div>
      )}

      {/* Central brand lockup overlaying everything */}
      <div className="hero-editorial__lockup">
        <p className="hero-editorial__tag">Spring / Summer 2026</p>
        <h1 className="hero-editorial__brand">
          OUTFIT<span className="hero-editorial__reg">®</span>
        </h1>
        <p className="hero-editorial__subtitle">
          Premium conceptual streetwear for creators
        </p>
      </div>

      {/* Bottom accent bar */}
      <div className="hero-editorial__bottom-bar">
        <span className="hero-editorial__location">Accra, Ghana</span>
        <span className="hero-editorial__divider" />
        <span className="hero-editorial__edition">Edition 2026</span>
      </div>
    </div>
  );
}
