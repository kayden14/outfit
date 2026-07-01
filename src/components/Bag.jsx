import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "233547882165"; // +233 0547882165

function buildWhatsAppMessage(items, total) {
  const lines = items.map(
    (item) =>
      `• ${item.name} (Size: ${item.size}) x${item.qty} — GH₵ ${(item.price * item.qty).toFixed(2)}`
  );
  const body = [
    "Hello TEMEO 👋, I'd like to place an order:",
    "",
    ...lines,
    "",
    `*Total: GH₵ ${total.toFixed(2)}*`,
    "",
    "Please confirm availability and payment details. Thank you!",
  ].join("\n");
  return encodeURIComponent(body);
}

export default function Bag() {
  const { items, removeFromCart, updateQty, total, count, bagOpen, setBagOpen } = useCart();

  useEffect(() => {
    if (bagOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bagOpen]);

  function handleCheckout() {
    if (items.length === 0) return;
    const msg = buildWhatsAppMessage(items, total);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          bagOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="bag-backdrop"
        onClick={() => setBagOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[460px] bg-cream dark:bg-black text-black dark:text-white border-l border-current/15 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          bagOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="orders-drawer"
        aria-label="Your orders"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-current/10 flex-shrink-0 font-bold uppercase text-sm tracking-wider">
          <h2 id="orders-title">Orders ({count})</h2>
          <button
            className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
            id="orders-close-btn"
            onClick={() => setBagOpen(false)}
            aria-label="Close orders drawer"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hidden">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center opacity-60">
              <p className="font-extrabold text-sm uppercase tracking-widest">No orders yet</p>
              <p className="text-xs italic max-w-[200px]">
                Pick something from the collection and order via WhatsApp.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                className="flex gap-4 pb-6 border-b border-current/10 last:border-0"
                key={item.key}
                id={`order-item-${item.key}`}
              >
                {/* Thumbnail */}
                <div className="w-[80px] h-[106px] bg-[#d2cac3] dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs uppercase opacity-55">
                      {item.name.slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between font-bold text-sm">
                      <p className="uppercase tracking-tight">{item.name}</p>
                      <span>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] opacity-70 mt-1 uppercase">Size: {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty controls */}
                    <div className="flex items-center border border-current/15 rounded-sm">
                      <button
                        className="px-2.5 py-1 text-xs hover:bg-current/5 active:scale-95 cursor-pointer font-bold"
                        id={`qty-minus-${item.key}`}
                        onClick={() => updateQty(item.key, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-2 text-xs font-bold">{item.qty}</span>
                      <button
                        className="px-2.5 py-1 text-xs hover:bg-current/5 active:scale-95 cursor-pointer font-bold"
                        id={`qty-plus-${item.key}`}
                        onClick={() => updateQty(item.key, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-[11px] font-extrabold uppercase underline hover:opacity-75 cursor-pointer"
                      id={`remove-${item.key}`}
                      onClick={() => removeFromCart(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-current/10 flex-shrink-0">
            <div className="flex justify-between font-bold text-sm mb-2 uppercase">
              <span>Subtotal</span>
              <span>GH₵ {total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] opacity-60 mb-6 uppercase">
              Tap below to order via WhatsApp. We'll confirm your order and payment details.
            </p>

            {/* WhatsApp CTA */}
            <button
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-extrabold text-xs uppercase py-4 tracking-wider hover:bg-[#1ebe5c] active:scale-[0.99] transition-all cursor-pointer mb-3"
              id="checkout-btn"
              onClick={handleCheckout}
            >
              {/* WhatsApp icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Order via WhatsApp
            </button>

            <p className="text-center text-[10px] opacity-50 uppercase tracking-wide">
              WhatsApp: +233 054 788 2165
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
