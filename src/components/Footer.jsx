export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4 border-t border-current/10" id="footer">

      {/* ── Newsletter / Pre-order Band ── */}
      <div className="px-4 lg:px-8 py-12 border-b border-current/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Stay in the loop</p>
            <h2 className="text-2xl md:text-4xl font-[900] tracking-tighter uppercase">
              Get drop notifications
            </h2>
          </div>
          <a
            href="https://wa.me/233547882165?text=Hi%20TEMEO%20Collections!%20Please%20add%20me%20to%20your%20drop%20notifications%20list."
            target="_blank"
            rel="noreferrer noopener"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-[#25D366] text-white font-extrabold text-xs uppercase py-3.5 px-8 tracking-widest hover:bg-[#1ebe5c] active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Notify me on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="px-4 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* ① Brand Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="font-black text-2xl tracking-tighter uppercase leading-none">
              TEMEO<br /><span className="opacity-40 text-xl">Outfits</span>
            </span>
            <p className="text-xs opacity-60 leading-relaxed max-w-[28ch]">
              Streetwear label from Mendskrom, Accra. Graphic tees, shorts & totes for those who move with culture.
            </p>
            {/* Social Icons Row */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://www.instagram.com/te.meo__"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@temeo_wears"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TikTok"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/233547882165"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="WhatsApp"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/add/temeo.colz"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Snapchat"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.15-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ② Shop Column */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Shop</p>
            {[
              { label: "All Items", href: "#section-shirts" },
              { label: "TEMEO Shirts", href: "#section-shirts" },
              { label: "Temeo Shorts", href: "#section-shorts" },
              { label: "TEMEO Wears", href: "#section-wears" },
              { label: "Tote Bags", href: "#section-totes" },
              { label: "Editorial Lookbook", href: "#section-lookbook" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity link-hover max-w-fit">
                {label}
              </a>
            ))}
          </div>

          {/* ③ Order & Help Column */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Order & Help</p>
            {[
              { label: "Order via WhatsApp", href: "https://wa.me/233547882165" },
              { label: "Size Guide", href: "#about-info" },
              { label: "Delivery Info", href: "#about-info" },
              { label: "FAQ", href: "#about-info" },
              { label: "Email Us", href: "mailto:temeocollections@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity link-hover max-w-fit"
              >
                {label}
              </a>
            ))}
          </div>

          {/* ④ Contact Column */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] opacity-40 mb-1">Contact</p>
            <address className="not-italic text-sm opacity-70 leading-relaxed">
              Mendskrom<br />
              Accra, Ghana
            </address>
            <a href="https://wa.me/233547882165" target="_blank" rel="noreferrer noopener" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity link-hover max-w-fit mt-2">
              +233 54 788 2165
            </a>
            <a href="mailto:temeocollections@gmail.com" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity link-hover max-w-fit">
              temeocollections@gmail.com
            </a>
            <div className="flex flex-col gap-1 mt-2 text-xs opacity-50">
              <a href="https://www.instagram.com/te.meo__" target="_blank" rel="noreferrer noopener" className="hover:opacity-100 transition-opacity font-medium">@te.meo__ on Instagram</a>
              <a href="https://www.tiktok.com/@temeo_wears" target="_blank" rel="noreferrer noopener" className="hover:opacity-100 transition-opacity font-medium">@temeo_wears on TikTok</a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="px-4 lg:px-8 py-6 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
          © {year} TEMEO Collections. All rights reserved.
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">
          Made in Accra, Ghana 🇬🇭
        </p>
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="text-[10px] font-extrabold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
        >
          ↑ Back to top
        </button>
      </div>

      {/* ── Branding Statement ── */}
      <div className="px-4 lg:px-8 pb-10">
        <div className="h-[5px] w-full bg-current mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <p className="text-[2.5rem] md:text-[6vw] leading-[1] font-[900] tracking-tighter text-balance">
            Made to be worn.<br />
            <span className="opacity-40">Or judged. Or both.</span>
          </p>
          <p className="text-[6rem] md:text-[12vw] leading-[1] font-[900] tracking-tighter opacity-15 select-none">
            ©{String(year).slice(2)}
          </p>
        </div>
      </div>

    </footer>
  );
}
