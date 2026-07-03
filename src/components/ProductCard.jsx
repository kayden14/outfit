export default function ProductCard({ product, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(product);
  };

  const handleQuickOrder = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const priceString = product.gsmOptions
      ? `from GH₵ ${Math.min(...product.gsmOptions.map(o => o.price)).toFixed(2)}`
      : `GH₵ ${product.price.toFixed(2)}`;
    const text = `Hi TEMEO Collections! I'd like to place a quick order for:
- Product: ${product.name}
- Category: ${product.category}
- Price: ${priceString}

Please let me know if this is available and how to complete my order!`;
    const waUrl = `https://wa.me/233547882165?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noreferrer noopener");
  };

  const isShorts = product.category?.toLowerCase().includes("shorts");

  return (
    <a
      className="group block cursor-pointer select-none"
      onClick={handleClick}
      href={`/product/${product.id}`}
    >
      {/* Image Container */}
      <div className="product-image-container relative overflow-hidden aspect-[3/4]">
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-[#d2cac3] dark:bg-neutral-800" />

        {/* Front Image */}
        {product.image && (
          <img
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              isShorts ? "" : "group-hover:scale-105"
            }`}
            loading="lazy"
            src={product.image}
            draggable="false"
          />
        )}

        {/* Back image — clip-path reveal on hover (disabled for shorts) */}
        {product.backImage && !isShorts && (
          <img
            alt={`${product.name} — alternate view`}
            className="product-img-back"
            loading="lazy"
            src={product.backImage}
            draggable="false"
          />
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-black/60 text-white text-[9px] font-extrabold uppercase tracking-[0.2em] px-2 py-1 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Quick-add actions — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-15 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] flex divide-x divide-white/20">
          <div
            onClick={handleClick}
            className="flex-1 bg-black/85 text-white text-[9px] font-extrabold uppercase tracking-widest text-center py-3.5 backdrop-blur-sm hover:bg-neutral-900 transition-colors"
          >
            Details
          </div>
          <div
            onClick={handleQuickOrder}
            className="flex-1 bg-[#25D366] text-white text-[9px] font-extrabold uppercase tracking-widest text-center py-3.5 backdrop-blur-sm hover:bg-[#1ebe5c] transition-colors"
          >
            Order Now ↗
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-sm leading-tight tracking-tight flex-1">{product.name}</p>
          <p className="font-extrabold text-sm whitespace-nowrap flex-shrink-0">
            {product.gsmOptions ? (
              <span>from GH₵ {Math.min(...product.gsmOptions.map(o => o.price)).toFixed(2)}</span>
            ) : (
              <span>GH₵ {product.price.toFixed(2)}</span>
            )}
          </p>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider opacity-50">
          <span>{product.sizes?.join(" · ")}</span>
          <span className="hover:text-[#25D366] hover:opacity-100 transition-colors flex items-center gap-0.5 font-extrabold text-[#25D366]/80">
            Quick Order ↗
          </span>
        </div>
      </div>
    </a>
  );
}
