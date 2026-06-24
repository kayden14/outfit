import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Bag() {
  const { items, removeFromCart, updateQty, clearCart, total, count, bagOpen, setBagOpen } = useCart();
  const [checkoutStep, setCheckoutStep] = useState("bag"); // "bag", "checkout", "processing", "success"
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

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

  useEffect(() => {
    if (!bagOpen) {
      const timer = setTimeout(() => {
        setCheckoutStep("bag");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [bagOpen]);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      clearCart();
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`modal-overlay ${bagOpen ? "open" : ""}`}
        id="bag-backdrop"
        onClick={() => setBagOpen(false)}
      />

      {/* Drawer */}
      <aside 
        className={`drawer-panel ${bagOpen ? "open" : ""}`} 
        id="bag-drawer" 
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="bag-header">
          <h2 className="bag-title">
            {checkoutStep === "bag" && `Bag (${count})`}
            {checkoutStep === "checkout" && "Checkout"}
            {checkoutStep === "processing" && "Processing"}
            {checkoutStep === "success" && "Success"}
          </h2>
          <button
            className="bag-close"
            id="bag-close-btn"
            onClick={() => setBagOpen(false)}
            aria-label="Close bag drawer"
          >
            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── STEP 1: BAG VIEW ── */}
        {checkoutStep === "bag" && (
          <>
            <div className="bag-items">
              {items.length === 0 ? (
                <div className="bag-empty">
                  <p style={{ fontWeight: 800, fontSize: '0.875rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your bag is empty</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.4, fontStyle: 'italic', textAlign: 'center' }}>
                    Made to be worn. Or judged. Or both.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div 
                    className="bag-item" 
                    key={item.key} 
                    id={`bag-item-${item.key}`}
                  >
                    {/* Thumbnail */}
                    <div className="bag-item-img-container" style={{ width: '4rem', height: '5rem', flexShrink: 0 }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="bag-item-img" />
                      ) : (
                        <div
                          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.placeholder?.bg || "#111", borderRadius: '0.25rem' }}
                        >
                          <span style={{ fontSize: '10px', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
                            {item.name.slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="bag-item-details">
                      <div>
                        <p className="bag-item-name">{item.name}</p>
                        <p className="bag-item-size">Size: {item.size}</p>
                      </div>
                      
                      <div className="bag-item-controls">
                        {/* Qty controls */}
                        <div className="qty-controls">
                          <button
                            className="qty-btn"
                            id={`qty-minus-${item.key}`}
                            onClick={() => updateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="qty-value">{item.qty}</span>
                          <button
                            className="qty-btn"
                            id={`qty-plus-${item.key}`}
                            onClick={() => updateQty(item.key, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="bag-item-remove"
                          id={`remove-${item.key}`}
                          onClick={() => removeFromCart(item.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.875rem' }}>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="bag-footer">
                <div className="bag-subtotal">
                  <span className="bag-subtotal-label">Subtotal</span>
                  <span className="bag-subtotal-value">GH₵ {total.toFixed(2)}</span>
                </div>
                <p className="bag-disclaimer">
                  Shipping, duties, and taxes calculated at checkout.
                </p>
                <button 
                  className="checkout-btn" 
                  id="checkout-btn"
                  onClick={() => setCheckoutStep("checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: CHECKOUT FORM ── */}
        {checkoutStep === "checkout" && (
          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <div className="bag-items checkout-fields">
              <div className="checkout-group">
                <label className="checkout-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="checkout-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="checkout-group">
                <label className="checkout-label">Shipping Name</label>
                <input
                  type="text"
                  required
                  placeholder="Kofi Mensah"
                  className="checkout-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="checkout-group">
                <label className="checkout-label">Shipping Address</label>
                <input
                  type="text"
                  required
                  placeholder="Ring Road Central, Accra, Ghana"
                  className="checkout-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="checkout-group">
                <label className="checkout-label">Payment Method</label>
                <div className="checkout-payment-methods">
                  <label className={`checkout-payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className={`checkout-payment-option ${paymentMethod === "momo" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                    />
                    <span>Mobile Money (MoMo)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bag-footer">
              <div className="bag-subtotal">
                <span className="bag-subtotal-label">Total</span>
                <span className="bag-subtotal-value">GH₵ {total.toFixed(2)}</span>
              </div>
              <p className="bag-disclaimer" style={{ color: "var(--fg)", opacity: 0.5 }}>
                Free shipping to Accra & worldwide.
              </p>
              <button 
                type="submit"
                className="checkout-btn"
                id="place-order-btn"
              >
                Place Order
              </button>
              <button
                type="button"
                className="checkout-back"
                onClick={() => setCheckoutStep("bag")}
              >
                Back to Bag
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 3: PROCESSING STATE ── */}
        {checkoutStep === "processing" && (
          <div className="checkout-loading">
            <div className="checkout-spinner" />
            <p className="checkout-loading-text">Validating transaction...</p>
          </div>
        )}

        {/* ── STEP 4: SUCCESS VIEW ── */}
        {checkoutStep === "success" && (
          <div className="checkout-success">
            <div className="success-icon-wrap">
              <svg className="success-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12.5L11 15.5L16 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="success-title">Order Placed</h3>
            <p className="success-desc">
              Your conceptual streetwear order is confirmed. A receipt and tracking details have been sent to <strong>{email || "your email"}</strong>.
            </p>
            <p className="success-delivery">
              Estimated delivery: 2-3 business days in Accra.
            </p>
            <button
              className="checkout-btn success-btn"
              onClick={() => setBagOpen(false)}
            >
              Continue Exploring
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
