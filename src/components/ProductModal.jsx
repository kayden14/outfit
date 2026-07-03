import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGsm, setSelectedGsm] = useState(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("specifications");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Reset selections whenever modal opens with a new product
  useEffect(() => {
    setSelectedGsm(null);
    setSelectedSize(null);
    setAdded(false);
    setError(null);
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const hasGsmOptions = product?.gsmOptions?.length > 0;

  // Resolved price: selected GSM tier price, or product base price
  const resolvedPrice = hasGsmOptions
    ? (selectedGsm ? selectedGsm.price : null)
    : product?.price;

  function buildWhatsAppMessage() {
    const lines = [
      `🛍️ *Order Request — TEMEO Collections*`,
      ``,
      `*Product:* ${product.name}`,
      `*Category:* ${product.category}`,
      `*Size:* ${selectedSize}`,
      hasGsmOptions
        ? `*GSM:* ${selectedGsm.gsm}gsm (${selectedGsm.sublabel})`
        : (product.gsm ? `*GSM:* ${product.gsm}gsm` : null),
      `*Price:* GH₵ ${resolvedPrice.toFixed(2)}`,
      ``,
      `*Description:*`,
      product.description,
      ``,
      `Please confirm availability and payment details. Thank you! 🙏`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }

  function handleOrderWhatsApp() {
    if (!selectedSize) {
      setError("size");
      setTimeout(() => setError(null), 2500);
      return;
    }
    if (hasGsmOptions && !selectedGsm) {
      setError("gsm");
      setTimeout(() => setError(null), 2500);
      return;
    }
    addToCart({ ...product, price: resolvedPrice }, selectedSize);
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/233547882165?text=${msg}`, "_blank", "noreferrer");
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-350 ease-out"
        id="product-modal-backdrop"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[460px] bg-cream dark:bg-black text-black dark:text-white border-l border-current/15 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-0 overflow-y-auto scrollbar-hidden"
        id="product-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-current/10 flex-shrink-0 font-bold uppercase text-sm tracking-wider">
          <span>Product Detail</span>
          <button
            className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
            id="modal-close-btn"
            onClick={onClose}
            aria-label="Close product panel"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Product Image */}
        <div className="w-full aspect-[9/12] bg-[#d2cac3] dark:bg-neutral-800 overflow-hidden flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-lg uppercase opacity-40">
              OUTFIT
            </div>
          )}
        </div>

        {/* Details Container */}
        <div className="p-6 flex flex-col gap-6">

          {/* Metadata Block */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">
              {product.category || "Apparel"}
            </span>
            <h1 className="text-2xl font-[900] tracking-tighter uppercase mt-1">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-2">
              {resolvedPrice != null ? (
                <p className="text-lg font-bold transition-all duration-300">
                  GH₵ {resolvedPrice.toFixed(2)}
                </p>
              ) : (
                <p className="text-lg font-bold opacity-40 italic text-sm">
                  Select GSM for price ↓
                </p>
              )}
              {hasGsmOptions && selectedGsm && (
                <span className="text-[9px] font-extrabold uppercase tracking-widest border border-current/25 px-2 py-0.5 opacity-60">
                  {selectedGsm.gsm}gsm
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed opacity-85">
            {product.description}
          </p>

          {/* ── GSM Selector — shirts only ── */}
          {hasGsmOptions && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  Select GSM / Thickness
                </span>
                {error === "gsm" && (
                  <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-wide animate-pulse">
                    ✕ Choose a GSM first
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {product.gsmOptions.map((opt) => (
                  <button
                    key={opt.gsm}
                    id={`gsm-btn-${product.id}-${opt.gsm}`}
                    onClick={() => setSelectedGsm(opt)}
                    className={`flex items-center justify-between w-full px-4 py-3 border text-left cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                      selectedGsm?.gsm === opt.gsm
                        ? "border-current bg-current/5"
                        : "border-current/15 opacity-60 hover:opacity-95 hover:border-current/40"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider">
                        {opt.label}
                      </span>
                      <span className="text-[10px] opacity-60">
                        {opt.sublabel}
                      </span>
                    </div>
                    <span className={`text-sm font-bold transition-all duration-200 ${selectedGsm?.gsm === opt.gsm ? "scale-105" : ""}`}>
                      GH₵ {opt.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Size Selector ── */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                Select Size
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-[10px] font-extrabold uppercase tracking-wider underline hover:opacity-75 cursor-pointer"
              >
                Size Guide
              </button>
            </div>

            {showSizeGuide && (
              <div className="border border-current/15 p-3 mb-4 text-xs">
                <p className="font-extrabold uppercase mb-2">Fit Guide (cm):</p>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-current/10 opacity-70">
                      <th className="pb-1 font-bold">Size</th>
                      <th className="pb-1 font-bold">Chest</th>
                      <th className="pb-1 font-bold">Length</th>
                    </tr>
                  </thead>
                  <tbody className="opacity-90">
                    <tr className="border-b border-current/5"><td className="py-1">XS</td><td className="py-1">84-88</td><td className="py-1">68</td></tr>
                    <tr className="border-b border-current/5"><td className="py-1">S</td><td className="py-1">88-96</td><td className="py-1">70</td></tr>
                    <tr className="border-b border-current/5"><td className="py-1">M</td><td className="py-1">96-104</td><td className="py-1">72</td></tr>
                    <tr className="border-b border-current/5"><td className="py-1">L</td><td className="py-1">104-112</td><td className="py-1">74</td></tr>
                    <tr><td className="py-1">XL</td><td className="py-1">112-124</td><td className="py-1">76</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Sizes Grid */}
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  className={`w-12 h-12 border text-xs font-bold uppercase tracking-wide cursor-pointer select-none transition-all active:scale-95 ${
                    selectedSize === sz
                      ? "border-current bg-current/5"
                      : "border-current/15 opacity-60 hover:opacity-90"
                  }`}
                  id={`size-btn-${product.id}-${sz}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
            {error === "size" && (
              <p className="text-[10px] font-extrabold text-red-600 dark:text-red-500 mt-2 uppercase tracking-wide">
                ✕ Please select a size before placing your order.
              </p>
            )}
          </div>

          {/* Order via WhatsApp Button */}
          <button
            onClick={handleOrderWhatsApp}
            disabled={added}
            className={`w-full font-extrabold text-xs uppercase py-4 tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 ${
              added
                ? "bg-emerald-500 text-white scale-[0.99]"
                : "bg-[#25D366] text-white hover:bg-[#1ebe5c] active:scale-[0.98]"
            }`}
            id="order-whatsapp-btn"
          >
            {added ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                Sent to WhatsApp!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Order via WhatsApp
              </>
            )}
          </button>

          {/* Specifications / Tabs */}
          <div className="border-t border-current/10 pt-4 mt-2">
            <div className="flex gap-4 border-b border-current/10 pb-2 mb-4 text-xs font-extrabold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-1 transition-opacity cursor-pointer ${
                  activeTab === "specifications" ? "opacity-100 border-b-2 border-current" : "opacity-45"
                }`}
              >
                Specs
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-1 transition-opacity cursor-pointer ${
                  activeTab === "shipping" ? "opacity-100 border-b-2 border-current" : "opacity-45"
                }`}
              >
                Shipping
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-1 transition-opacity cursor-pointer ${
                  activeTab === "care" ? "opacity-100 border-b-2 border-current" : "opacity-45"
                }`}
              >
                Care
              </button>
            </div>

            <div className="text-xs leading-relaxed opacity-80 min-h-[60px]">
              {activeTab === "specifications" && (
                <ul className="list-disc pl-4 flex flex-col gap-1">
                  {hasGsmOptions && selectedGsm && (
                    <li><strong>{selectedGsm.gsm}gsm</strong> — {selectedGsm.sublabel}</li>
                  )}
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === "shipping" && (
                <p>
                  Free delivery across Ghana. Orders processed within 1-2 business days. Contact us on WhatsApp for express options. Easy 7-day exchange policy.
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
      </aside>
    </>
  );
}
