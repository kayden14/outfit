import { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import HeroEditorial from "../components/HeroEditorial";

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Define categories based on product details/names
  const categories = ["All", "Tees", "Long Sleeves", "Hoodies & Fleece", "Outerwear", "Accessories"];

  const getProductCategoryType = (product) => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
    const details = product.details.join(" ").toLowerCase();
    
    // Accessories: totes, bags, caps
    if (name.includes("tote") || name.includes("bag") || name.includes("command + k") || name.includes("cap")) {
      return "Accessories";
    }
    // Outerwear: windbreakers, jackets
    if (name.includes("windbreaker") || name.includes("jacket") || desc.includes("ripstop") || desc.includes("shell")) {
      return "Outerwear";
    }
    // Hoodies & Fleece: hoodies, crewnecks, fleece
    if (name.includes("hoodie") || name.includes("crewneck") || name.includes("week 001") || desc.includes("fleece") || desc.includes("hoodie") || desc.includes("sweatshirt")) {
      return "Hoodies & Fleece";
    }
    // Long sleeves
    if (name.includes("long sleeve") || details.includes("long sleeve") || name.includes("manifest")) {
      return "Long Sleeves";
    }
    return "Tees"; // Default to Tees / Tops
  };

  // Filter and sort products dynamically
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (activeCategory !== "All") {
      result = result.filter(
        (p) => getProductCategoryType(p) === activeCategory
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, sortBy]);

  const handleScrollDown = () => {
    const gridSection = document.getElementById("product-grid-section");
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="main-content" id="shop-main">
      {/* Editorial Mosaic Hero */}
      <section id="shop-hero">
        <HeroEditorial />
      </section>

      {/* Featured Product Spotlight */}
      <section className="spotlight" id="featured-spotlight">
        <div className="spotlight__inner">
          <div className="spotlight__media">
            <img
              src="/products/off-by-design.jpg"
              alt="Off by Design — Premium hoodie"
              loading="lazy"
            />
            <span className="spotlight__badge">Featured</span>
          </div>
          <div className="spotlight__content">
            <span className="spotlight__tag">New Drop · Limited Edition</span>
            <h2 className="spotlight__title">Off by Design</h2>
            <p className="spotlight__desc">
              The mistake that became the brief. Every error is a direction you hadn't considered.
              Premium hoodie. Washed. Slightly distressed. Intentionally imperfect.
            </p>
            <div className="spotlight__details">
              <span>80% Cotton, 20% Polyester</span>
              <span>·</span>
              <span>French Terry</span>
              <span>·</span>
              <span>Oversized Hood</span>
            </div>
            <div className="spotlight__price-row">
              <span className="spotlight__price">GH₵ 36.50</span>
              <button
                className="spotlight__cta"
                onClick={() => {
                  const product = products.find(p => p.id === "off-by-design");
                  if (product) setSelectedProduct(product);
                }}
              >
                View Product →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="trust-banner">
        <div className="trust-grid">
          <div className="trust-item">
            <span className="trust-title">Free Global Shipping</span>
            <span className="trust-desc">On orders over GH₵ 1,500</span>
          </div>
          <div className="trust-item trust-item-middle">
            <span className="trust-title">100% Organic Materials</span>
            <span className="trust-desc">Sustainable premium cotton blends</span>
          </div>
          <div className="trust-item">
            <span className="trust-title">Easy Returns</span>
            <span className="trust-desc">30-day worldwide return window</span>
          </div>
        </div>
      </section>

      {/* Product Grid Section with Filters & Controls */}
      <section id="product-grid-section">
        <div className="shop-controls">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Shop Collection</h2>
            <p className="text-sm opacity-60 mt-1">Refined fits for everyday creative practice.</p>
          </div>
          
          {/* Category Filter and Sorting Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Selectors */}
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-btn ${activeCategory === cat ? "active" : "inactive"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid" id="product-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={setSelectedProduct}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-base font-extrabold opacity-60">No items match your active filters.</p>
          </div>
        )}
      </section>

      {/* Promotional / Manifesto Block */}
      <section className="trust-banner" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto text-center" style={{ maxWidth: '48rem', padding: '3rem 0' }}>
          <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-55 block mb-6">MANIFESTO</span>
          <blockquote className="text-2xl font-extrabold italic leading-snug mb-6">
            "Design isn't just about how it looks. It's about structure, restraint, and leaving room for the details that matter."
          </blockquote>
          <p className="text-xs tracking-widest opacity-60">
            — ++HELLOHELLO APPAREL RESEARCH DIVISION
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="trust-banner" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto text-center" style={{ maxWidth: '28rem', padding: '2rem 0' }}>
          <h3 className="text-lg font-black uppercase tracking-wider mb-2">Join the Network</h3>
          <p className="text-xs opacity-60 mb-4">
            Subscribe to receive priority access to future drops, capsule collections, and project updates.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="newsletter-form"
            style={{ flexDirection: 'row' }}
          >
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              required
              className="newsletter-input"
            />
            <button 
              type="submit"
              className="newsletter-btn"
              style={{ width: 'auto' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
