import { useCart } from "../context/CartContext";
import temeoLogo from "../assets/temeo_logo.png";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, setBagOpen, count, theme, setTheme } = useCart();

  const handleShopClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBagClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setBagOpen(true);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-between p-6 bg-[var(--bg)] text-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Header / Close button */}
      <div className="flex justify-between items-center">
        {/* Empty or logo placeholder */}
        <span className="font-extrabold uppercase text-xs tracking-widest opacity-60">Menu</span>
        <button
          className="text-xs font-bold uppercase tracking-wider py-2 hover:opacity-75 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          ✕ Close
        </button>
      </div>

      {/* Large Navigation Links */}
      <ul className="flex flex-col gap-6 text-[3.5rem] font-[900] tracking-tighter uppercase leading-none select-none pl-2">
        <li>
          <a
            href="/"
            className="hover:opacity-70 transition-opacity"
            onClick={handleShopClick}
          >
            Shop
          </a>
        </li>
        <li>
          <a
            href="/orders"
            id="mobile-menu-orders-link"
            className="hover:opacity-70 transition-opacity flex items-baseline gap-2"
            onClick={handleBagClick}
          >
            <span>Orders</span>
            <span className="text-xl font-bold opacity-60">({count})</span>
          </a>
        </li>
      </ul>

      {/* Footer info & Theme Selector */}
      <div className="flex flex-col gap-8 border-t border-current/10 pt-6">
        {/* Theme selection */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-3">
            Select Theme
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all active:scale-90 ${
                theme === "light" ? "border-current scale-105" : "border-current/15 opacity-60"
              }`}
              style={{ backgroundColor: '#ede4dd' }}
              aria-label="Switch to Light Theme"
            />
            <button
              onClick={() => setTheme("dark")}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all active:scale-90 ${
                theme === "dark" ? "border-current scale-105" : "border-current/15 opacity-60"
              }`}
              style={{ backgroundColor: '#000000' }}
              aria-label="Switch to Dark Theme"
            />
            <button
              onClick={() => setTheme("red")}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all active:scale-90 ${
                theme === "red" ? "border-current scale-105" : "border-current/15 opacity-60"
              }`}
              style={{ backgroundColor: '#ff0001' }}
              aria-label="Switch to Red Theme"
            />
          </div>
        </div>

        {/* Footer Brand Info */}
        <div className="flex justify-between items-end text-xs font-bold uppercase">
          <div className="flex flex-col gap-1">
            <img src={temeoLogo} alt="TEMEO Collections" className="h-7 w-auto object-contain" style={{ filter: "brightness(0)" }} />
            <p className="opacity-50 text-[10px] mt-1">All rights reserved © 2026</p>
          </div>
          <div className="text-right text-[10px] opacity-75">
            <p>Mendskrom, Accra</p>
            <p>Ghana</p>
          </div>
        </div>
      </div>
    </div>
  );
}
