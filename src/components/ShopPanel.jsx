import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

// Filter to show only bag/tote products, or show all if none tagged as bags
const bagProducts = products.filter((p) => {
  const name = p.name.toLowerCase();
  const desc = p.description.toLowerCase();
  return name.includes("tote") || name.includes("bag") || desc.includes("tote") || desc.includes("bag");
});
// Fall back to showing all products if no bags exist
const displayProducts = bagProducts.length > 0 ? bagProducts : products;

export default function ShopPanel() {
  const { shopPanelOpen, setShopPanelOpen, addToCart } = useCart();

  useEffect(() => {
    if (shopPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [shopPanelOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`modal-overlay ${shopPanelOpen ? "open" : ""}`}
        id="shop-panel-backdrop"
        onClick={() => setShopPanelOpen(false)}
      />

      {/* Wide Drawer Panel */}
      <aside
        className={`shop-panel ${shopPanelOpen ? "open" : ""}`}
        id="shop-panel"
        aria-label="Shop panel"
      >
        {/* Header */}
        <div className="shop-panel-header">
          <div>
            <h2 className="shop-panel-title">Available Bags</h2>
            <p className="shop-panel-subtitle">Totes &amp; Carry-alls from the OUTFIT® collection</p>
          </div>
          <button
            className="bag-close"
            id="shop-panel-close"
            onClick={() => setShopPanelOpen(false)}
            aria-label="Close shop panel"
          >
            <svg style={{ width: "18px", height: "18px" }} viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Products Grid */}
        <div className="shop-panel-grid">
          {displayProducts.map((product) => (
            <div key={product.id} className="shop-panel-card" id={`panel-product-${product.id}`}>
              {/* Image */}
              <div className="shop-panel-img-wrap">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="shop-panel-img"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="shop-panel-img-placeholder"
                    style={{ background: product.placeholder?.bg || product.color || "#111" }}
                  >
                    <span className="shop-panel-placeholder-text">OUTFIT</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="shop-panel-info">
                <div>
                  <h3 className="shop-panel-name">{product.name}</h3>
                  <p className="shop-panel-desc">{product.description}</p>
                </div>
                <div className="shop-panel-footer">
                  <span className="shop-panel-price">GH₵ {product.price.toFixed(2)}</span>
                  <button
                    className="shop-panel-btn"
                    id={`panel-add-${product.id}`}
                    onClick={() => addToCart(product, product.sizes?.[0] || "One Size")}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
