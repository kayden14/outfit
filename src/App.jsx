import { useEffect, useRef } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Bag from "./components/Bag";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Preloader from "./components/Preloader";
import MobileMenu from "./components/MobileMenu";
import ShopPanel from "./components/ShopPanel";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
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

export default function App() {
  return (
    <CartProvider>
      <div className="app-container" id="app-root">
        {/* Cinematic Preloader */}
        <Preloader />

        {/* Global Nav & Layout */}
        <Header />
        
        {/* Drawers and Overlays */}
        <Bag />
        <MobileMenu />
        <ShopPanel />

        {/* Interactive Custom Cursor */}
        <CustomCursor />

        {/* Main View */}
        <Shop />

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
