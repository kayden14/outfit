import { useEffect, useRef } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import Bag from "./components/Bag";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Preloader from "./components/Preloader";
import MobileMenu from "./components/MobileMenu";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ left: "-100px", top: "-100px" }}
    />
  );
}

// Inner component so it can read CartContext
function AppInner() {
  const { theme, view } = useCart();

  return (
    <div
      className="min-h-screen flex flex-col"
      id="app-root"
      data-theme={theme}
      style={{
        backgroundColor: "var(--bg)",
        color:           "var(--fg)",
      }}
    >
      {/* Cinematic Preloader */}
      <Preloader />

      {/* Global Nav */}
      <Header />

      {/* Drawers and Overlays */}
      <Bag />
      <MobileMenu />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Main Page View Wrapper */}
      {view === "admin" ? (
        <div id="page" data-page="admin" className="flex flex-col flex-1">
          <Admin />
        </div>
      ) : (
        <div id="page" data-page="home" className="flex flex-col flex-1">
          <Shop />
          <Footer />
        </div>
      )}

      {/* Transition Page Layer Overlay */}
      <div
        id="layer"
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg)",
          color:           "var(--fg)",
          clipPath:        "inset(100% 0% 0% 0%)",
          transition:      "clip-path 1.2s var(--ease-in-out-strong)",
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
