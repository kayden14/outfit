import { useState, useMemo } from "react";

function ProductPlaceholder({ placeholder }) {
  const isLight =
    placeholder.bg === "#ffffff" ||
    placeholder.bg === "#f5f5f5" ||
    placeholder.bg === "#f0ece4" ||
    placeholder.bg === "#f9f5ef" ||
    placeholder.bg === "#f2f0eb" ||
    placeholder.bg === "#e8e4dc";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
      style={{ background: placeholder.bg }}
    >
      <span
        className="text-2xl font-extrabold tracking-widest opacity-35 select-none uppercase"
        style={{ color: isLight ? "#0a0a0a" : "#ffffff" }}
      >
        {placeholder.text}
      </span>
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Extract a key badge to display on the card based on details
  const badgeText = useMemo(() => {
    const detailsStr = product.details.join(" ").toLowerCase();
    if (detailsStr.includes("limited")) return "Limited Run";
    if (detailsStr.includes("organic")) return "100% Organic";
    if (detailsStr.includes("heavyweight")) return "Heavyweight";
    if (detailsStr.includes("canvas")) return "Heavy Canvas";
    return null;
  }, [product.details]);

  return (
    <article
      className="product-card"
      id={`product-card-${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(product)}
      role="button"
      aria-label={`View ${product.name} — GH₵ ${product.price.toFixed(2)}`}
    >
      {/* Dynamic Badge */}
      {badgeText && (
        <span className="product-badge">
          {badgeText}
        </span>
      )}

      {/* Images Container */}
      <div className="product-image-container">
        {/* Front Image */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img-front"
            loading="lazy"
          />
        ) : (
          <ProductPlaceholder placeholder={product.placeholder || { bg: "#222", text: "OUTFIT" }} />
        )}

        {/* Back Image (Hovered State) */}
        {product.backImage && (
          <img
            src={product.backImage}
            alt={`${product.name} back view`}
            className="product-img-back"
            loading="lazy"
          />
        )}

        {/* Dark overlay showing "Quick View" on hover */}
        <div className="quick-view-overlay">
          <span className="quick-view-btn">
            Quick View
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="product-info">
        <div className="product-info-top">
          <h3 className="product-name">
            {product.name}
          </h3>
          <span className="product-price">
            GH₵ {product.price.toFixed(2)}
          </span>
        </div>
        <span className="product-category">
          {product.category}
        </span>
      </div>
    </article>
  );
}
