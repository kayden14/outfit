import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function ProductPlaceholderLarge({ placeholder }) {
  const isLight =
    placeholder.bg === "#ffffff" ||
    placeholder.bg === "#f5f5f5" ||
    placeholder.bg === "#f0ece4" ||
    placeholder.bg === "#f9f5ef" ||
    placeholder.bg === "#f2f0eb" ||
    placeholder.bg === "#e8e4dc";

  return (
    <div 
      className="flex items-center justify-center w-full h-full" 
      style={{ background: placeholder.bg, minHeight: '350px' }}
    >
      <span
        className="font-black tracking-widest uppercase opacity-40 select-none"
        style={{ color: isLight ? "#0a0a0a" : "#ffffff", fontSize: '3rem' }}
      >
        {placeholder.text}
      </span>
    </div>
  );
}

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  
  // Accordion state
  const [activeTab, setActiveTab] = useState("specifications");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleAdd() {
    if (!selectedSize) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product) return null;

  return (
    <div
      className="modal-container open"
      id="product-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
    >
      <div 
        className="modal-content" 
        id="product-modal-panel" 
        role="dialog" 
        aria-modal="true" 
        aria-label={product.name}
      >
        {/* Left Side: Product Image */}
        <div className="modal-images">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
            />
          ) : (
            <ProductPlaceholderLarge placeholder={product.placeholder || { bg: "#222", text: "OUTFIT" }} />
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="modal-info bg-[var(--glass-bg)]" style={{ backgroundColor: 'var(--bg)' }}>
          {/* Close button inside panel */}
          <button 
            className="modal-close-btn" 
            id="modal-close-btn" 
            onClick={onClose} 
            aria-label="Close product panel"
          >
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Product Info Header */}
          <div className="modal-header">
            <span className="modal-category">
              {product.category}
            </span>
            <h1 className="modal-title">
              {product.name}
            </h1>
            <p className="modal-price" style={{ color: 'var(--fg)' }}>
              GH₵ {product.price.toFixed(2)}
            </p>
          </div>

          <p className="modal-desc">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="modal-sizes">
            <div className="modal-sizes-header">
              <span className="modal-sizes-title">
                Select Size
              </span>
              <button 
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="modal-sizes-guide"
              >
                Size Guide
              </button>
            </div>
            
            {showSizeGuide && (
              <div className="size-guide-popover">
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Standard Fit Guide (cm):</p>
                <table className="size-guide-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest</th>
                      <th>Waist</th>
                      <th>Hip</th>
                      <th>Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>XS</td><td>84-88</td><td>72-76</td><td>84-88</td><td>68</td></tr>
                    <tr><td>S</td><td>88-96</td><td>76-81</td><td>88-96</td><td>70</td></tr>
                    <tr><td>M</td><td>96-104</td><td>81-89</td><td>96-104</td><td>72</td></tr>
                    <tr><td>L</td><td>104-112</td><td>89-97</td><td>104-112</td><td>74</td></tr>
                    <tr><td>XL</td><td>112-124</td><td>97-109</td><td>112-120</td><td>76</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="size-grid">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  className={`size-btn ${selectedSize === sz ? "active" : "inactive"}`}
                  id={`size-btn-${product.id}-${sz}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
            {error && (
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', marginTop: '0.75rem' }}>
                ✕ Please select a size before adding to bag.
              </p>
            )}
          </div>

          {/* Add to bag */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`add-to-bag-btn ${added ? "disabled" : "active"}`}
            id="add-to-bag-btn"
            style={added ? { backgroundColor: '#059669', color: '#ffffff', opacity: 1 } : {}}
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>

          {/* Accordion Tabs (Specifications, Shipping & Returns, Care Instructions) */}
          <div className="modal-accordion">
            <div className="accordion-tabs">
              <button 
                onClick={() => setActiveTab("specifications")}
                className={`accordion-tab ${activeTab === "specifications" ? "active" : "inactive"}`}
              >
                Specs
              </button>
              <button 
                onClick={() => setActiveTab("shipping")}
                className={`accordion-tab ${activeTab === "shipping" ? "active" : "inactive"}`}
              >
                Shipping
              </button>
              <button 
                onClick={() => setActiveTab("care")}
                className={`accordion-tab ${activeTab === "care" ? "active" : "inactive"}`}
              >
                Care
              </button>
            </div>

            {/* Accordion Content */}
            <div className="accordion-content">
              {activeTab === "specifications" && (
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === "shipping" && (
                <p>
                  Free shipping on all domestic orders and worldwide orders above GH₵ 1,500. Orders are processed within 1-2 business days. Express shipping options available at checkout. Easy 30-day return policy.
                </p>
              )}
              {activeTab === "care" && (
                <p>
                  Machine wash cold with like colors. Do not bleach. Tumble dry low or dry flat. Iron low if needed. Do not dry clean or iron print directly. Designed to last.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
