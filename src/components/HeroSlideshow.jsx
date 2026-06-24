import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

const SLIDES = [
  { src: "/preloader/image-01.jpg", label: "SS26 — Organic Forms", index: "01" },
  { src: "/preloader/image-02.jpg", label: "SS26 — Negative Space", index: "02" },
  { src: "/preloader/image-03.jpg", label: "SS26 — The Grid", index: "03" },
  { src: "/preloader/image-04.jpg", label: "SS26 — Restraint", index: "04" },
  { src: "/preloader/image-05.jpg", label: "SS26 — Monochrome", index: "05" },
  { src: "/preloader/image-06.jpg", label: "SS26 — Considered", index: "06" },
];

export default function HeroSlideshow() {
  const { theme } = useCart();
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx, dir = 1) => {
    if (idx === current || transitioning) return;
    setPrev(current);
    setDirection(dir);
    setTransitioning(true);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 1000);
  };

  const next = () => goTo((current + 1) % SLIDES.length, 1);
  const prev_ = () => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, transitioning]);

  const slide = SLIDES[current];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Previous slide — exits */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={SLIDES[prev].src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0,
            transform: `scale(1.04) translateX(${direction < 0 ? "3%" : "-3%"})`,
            transition: "opacity 1s ease, transform 1s ease",
            zIndex: 1,
          }}
        />
      )}

      {/* Current slide — enters */}
      <img
        key={`curr-${current}`}
        src={slide.src}
        alt={slide.label}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 1,
          transform: "scale(1) translateX(0)",
          transition: transitioning
            ? "opacity 1s ease, transform 8s ease"
            : "transform 8s ease",
          transitionDelay: transitioning ? "0s" : "0s",
          animationName: transitioning ? "slideEnter" : "none",
          zIndex: 2,
        }}
      />

      {/* Cinematic gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Top-left: edition tag */}
      <div
        style={{
          position: "absolute",
          top: "7rem",
          left: "2rem",
          zIndex: 5,
          color: "rgba(255,255,255,0.55)",
          fontSize: "0.625rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Spring / Summer 2026
      </div>

      {/* Top-right: slide counter */}
      <div
        style={{
          position: "absolute",
          top: "7rem",
          right: "2rem",
          zIndex: 5,
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.625rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* Bottom-left: slide label */}
      <div
        style={{
          position: "absolute",
          bottom: "8rem",
          left: "2rem",
          zIndex: 5,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.5625rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "0.375rem",
          }}
        >
          {slide.index}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {slide.label}
        </p>
      </div>

      {/* Bottom-right: nav arrows */}
      <div
        style={{
          position: "absolute",
          bottom: "8rem",
          right: "2rem",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <button
          onClick={prev_}
          aria-label="Previous slide"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.7)",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
        >
          ←
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.7)",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
        >
          →
        </button>
      </div>

      {/* Bottom-center: dot progress */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          pointerEvents: "auto",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: i === current ? "2rem" : "0.75rem",
                backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.3)",
                transition: "all 0.5s ease",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
