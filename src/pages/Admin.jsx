import { useState } from "react";
import { useCart } from "../context/CartContext";
import { GSM_OPTIONS } from "../data/products";

export default function Admin() {
  const { addCustomProduct, customProducts, deleteCustomProduct, setView } = useCart();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("TEMEO Shirts");
  const [price, setPrice] = useState("250");
  const [hasGsm, setHasGsm] = useState(true);
  const [sizes, setSizes] = useState(["S", "M", "L", "XL", "XXL"]);
  const [detailsStr, setDetailsStr] = useState("Art-grade front print, Regular fit, Pre-shrunk");
  const [imageSrc, setImageSrc] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSizeToggle = (sz) => {
    if (sizes.includes(sz)) {
      setSizes(sizes.filter((s) => s !== sz));
    } else {
      setSizes([...sizes, sz]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("✕ Please enter a product name.");
      return;
    }
    if (!imageSrc) {
      setMessage("✕ Please select or upload a product picture.");
      return;
    }

    const priceNum = parseFloat(price) || 250;
    const details = detailsStr
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      price: priceNum,
      category,
      image: imageSrc,           // base64 data URL — renders directly in <img src>
      description: description.trim() || "Premium custom apparel item from TEMEO Collections.",
      sizes,
      details,
      slug,
      ...(hasGsm ? { gsmOptions: GSM_OPTIONS } : {}),
    };

    // Save first, then reset the form
    addCustomProduct(newProduct);

    setName("");
    setDescription("");
    setImageSrc("");
    setDetailsStr("Art-grade front print, Regular fit, Pre-shrunk");
    setSizes(["S", "M", "L", "XL", "XXL"]);
    setMessage("✓ Product uploaded and live on the shop!");
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="pt-32 pb-20 px-4 lg:px-8 max-w-4xl mx-auto w-full flex-1 flex flex-col gap-12 text-[var(--fg)]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-current/10 pb-6 gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-1">
            Owner Dashboard
          </p>
          <h1 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none">
            Upload Product
          </h1>
        </div>
        <button
          onClick={() => setView("shop")}
          className="px-6 py-2.5 border border-current text-[11px] font-extrabold uppercase tracking-widest hover:bg-current hover:text-[var(--bg)] transition-all active:scale-95 cursor-pointer self-start md:self-auto"
        >
          ← Back to Shop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="md:col-span-7 flex flex-col gap-6">
          {message && (
            <div className={`p-4 text-xs font-bold uppercase tracking-wider border ${
              message.startsWith("✓") ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 border-red-500 text-red-500"
            }`}>
              {message}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Product Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. TEMEO Ricky — Sunset Edition"
              className="w-full bg-transparent border border-current/25 focus:border-current px-4 py-3 text-sm focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[var(--bg)] border border-current/25 focus:border-current px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="TEMEO Shirts">TEMEO Shirts</option>
              <option value="Temeo Shorts">Temeo Shorts</option>
              <option value="TEMEO Wears">TEMEO Wears</option>
              <option value="TEMEO Tote Bags">TEMEO Tote Bags</option>
            </select>
          </div>

          {/* Starting Price */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Starting / Base Price (GH₵) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="250"
              min="0"
              className="w-full bg-transparent border border-current/25 focus:border-current px-4 py-3 text-sm focus:outline-none transition-colors"
              required
            />
          </div>

          {/* GSM Options Checkbox */}
          <div className="flex items-center gap-3 py-1">
            <input
              type="checkbox"
              id="hasGsm"
              checked={hasGsm}
              onChange={(e) => setHasGsm(e.target.checked)}
              className="w-4 h-4 accent-current cursor-pointer"
            />
            <label htmlFor="hasGsm" className="text-xs font-bold uppercase tracking-wide cursor-pointer select-none">
              Enable GSM Tiers selection (260/320/400gsm pricing)
            </label>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => {
                const active = sizes.includes(sz);
                return (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`w-10 h-10 border text-[11px] font-bold uppercase cursor-pointer transition-all ${
                      active
                        ? "border-current bg-current/5"
                        : "border-current/15 opacity-55 hover:opacity-100"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Product Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this product details, fit, and vibes..."
              rows="4"
              className="w-full bg-transparent border border-current/25 focus:border-current px-4 py-3 text-sm focus:outline-none transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Details string */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Details (comma separated)
            </label>
            <input
              type="text"
              value={detailsStr}
              onChange={(e) => setDetailsStr(e.target.value)}
              placeholder="e.g. Art-grade print, Oversized fit, Combed cotton"
              className="w-full bg-transparent border border-current/25 focus:border-current px-4 py-3 text-sm focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-current text-[var(--bg)] font-extrabold text-xs uppercase py-4 tracking-widest hover:opacity-90 transition-all active:scale-[0.99] cursor-pointer mt-2"
          >
            Upload Product & Publish Live
          </button>
        </form>

        {/* Image Upload / Preview Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
              Product Image *
            </label>
            
            {/* Custom file upload block */}
            <div className="relative border border-dashed border-current/25 hover:border-current/50 transition-colors p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[160px] cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <svg className="w-8 h-8 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wider">Choose photo file</span>
                <span className="text-[10px] opacity-50">PNG, JPG, or WEBP up to 5MB</span>
              </div>
            </div>
          </div>

          {/* Preview Container */}
          {imageSrc && (
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
                Photo Preview
              </label>
              <div className="w-full aspect-[3/4] bg-neutral-900 border border-current/15 overflow-hidden shadow-md">
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Products List Table */}
      <div className="border-t border-current/10 pt-10 mt-6">
        <h2 className="text-xl font-[900] tracking-tighter uppercase mb-6">
          Manage Uploaded Products ({customProducts.length})
        </h2>

        {customProducts.length === 0 ? (
          <p className="text-xs italic opacity-50">
            No uploaded products yet. Items you publish will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-current/20 uppercase tracking-wider opacity-70">
                  <th className="py-3 pr-4 font-bold">Image</th>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Base Price</th>
                  <th className="py-3 px-4 font-bold">GSM Tier</th>
                  <th className="py-3 pl-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customProducts.map((p) => (
                  <tr key={p.id} className="border-b border-current/10 hover:bg-current/[0.02]">
                    <td className="py-3 pr-4">
                      <img src={p.image} alt={p.name} className="w-10 h-13 object-cover border border-current/10" />
                    </td>
                    <td className="py-3 px-4 font-bold uppercase tracking-tight">{p.name}</td>
                    <td className="py-3 px-4 uppercase tracking-wider opacity-70">{p.category}</td>
                    <td className="py-3 px-4 font-extrabold">GH₵ {p.price.toFixed(2)}</td>
                    <td className="py-3 px-4 opacity-70">
                      {p.gsmOptions ? "Enabled" : "Disabled"}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <button
                        onClick={() => deleteCustomProduct(p.id)}
                        className="text-red-500 hover:text-red-600 font-extrabold uppercase tracking-widest text-[10px] border border-red-500/25 hover:border-red-500 px-3 py-1.5 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
