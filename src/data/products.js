// Import all real TEMEO product images from assets
import img628 from "../assets/IMG_20260530_002712_628.jpg";
import img721 from "../assets/IMG_20260530_002712_721.jpg";
import img032 from "../assets/IMG_20260530_002713_032.jpg";
import img125 from "../assets/IMG_20260530_002713_125.jpg";
import img165 from "../assets/IMG_20260530_002713_165.jpg";
import img258 from "../assets/IMG_20260530_002713_258.jpg";
import img440 from "../assets/IMG_20260530_002713_440.jpg";
import shorts1 from "../assets/IMG_20260612_010147_061.JPG";
import shorts2 from "../assets/IMG_20260612_010151_301.JPG";
import shorts3 from "../assets/IMG_20260612_010153_047.JPG";
import tee1 from "../assets/1_20260507_151239_0000.png";
import tee2 from "../assets/2_20260507_151239_0001.png";
import tee3 from "../assets/4_20260513_182048_0001.png";
import tee4 from "../assets/6_20260513_182048_0002.png";
import temeoWear from "../assets/TEMEO_20260624_193512_0000.jpg";
import temeoTote from "../assets/temeo_tote_bag.png";

// GSM → Price: 260gsm = GH₵250 · 320gsm = GH₵300 · 400gsm = GH₵350

export const products = [
  // ── TEMEO SHIRTS ─────────────────────────────────────────
  {
    id: "temeo-kaws-dark",
    name: "TEMEO Kaws — Dark",
    price: 250,
    gsm: 260,
    category: "TEMEO Shirts",
    image: img628,
    backImage: img721,
    description:
      "The iconic KAWS companion printed on premium heavyweight black cotton. Vibrant art-print front, clean Themmie signature. A streetwear statement that speaks before you do.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["260gsm Heavyweight Cotton", "Art-grade front print", "Regular fit", "Pre-shrunk"],
    slug: "temeo-kaws-dark",
  },
  {
    id: "temeo-kaws-together",
    name: "TEMEO Kaws — Together",
    price: 250,
    gsm: 260,
    category: "TEMEO Shirts",
    image: img721,
    backImage: img628,
    description:
      "Two KAWS figures embracing on a sunburst background. A celebration of connection — printed on black premium cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["260gsm Heavyweight Cotton", "Art-grade front print", "Regular fit", "Pre-shrunk"],
    slug: "temeo-kaws-together",
  },
  {
    id: "temeo-kaws-boss",
    name: "TEMEO Ricky",
    price: 300,
    gsm: 320,
    category: "TEMEO Shirts",
    image: img032,
    backImage: img125,
    description:
      "The seated KAWS boss, commanding and colorful. A bold statement on black cotton that blends streetwear with fine-art sensibility.",
    sizes: ["S", "M", "L", "XL"],
    details: ["320gsm Premium Cotton", "Full-chest art print", "Oversized fit", "Limited run"],
    slug: "temeo-kaws-boss",
  },
  {
    id: "temeo-kaws-neon-bear",
    name: "TEMEO Fitz",
    price: 300,
    gsm: 320,
    category: "TEMEO Shirts",
    image: img125,
    backImage: img032,
    description:
      "The dark KAWS bear with glowing neon cross eyes. Eerie, beautiful, and completely unforgettable.",
    sizes: ["S", "M", "L", "XL"],
    details: ["320gsm Premium Cotton", "Front art print", "Regular fit", "Themmie signature"],
    slug: "temeo-kaws-neon-bear",
  },
  {
    id: "temeo-kaws-squad",
    name: "TEMEO Jay",
    price: 350,
    gsm: 400,
    category: "TEMEO Shirts",
    image: img165,
    backImage: img258,
    description:
      "Three KAWS companions seated together — a photographic print that blurs the line between collecting and wearing.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["400gsm Ultra-Heavyweight Cotton", "Photographic art print", "Regular fit"],
    slug: "temeo-kaws-squad",
  },
  {
    id: "temeo-mickey",
    name: "TEMEO Wateva — Mickey",
    price: 250,
    gsm: 260,
    category: "TEMEO Shirts",
    image: img258,
    backImage: img165,
    description:
      "The classic reinvented. Mickey Mouse from behind — sculpted, dark, and premium. Because some icons look better walking away.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["260gsm Heavyweight Cotton", "Art-grade front print", "Classic fit"],
    slug: "temeo-mickey",
  },
  {
    id: "temeo-kaws-white",
    name: "TEMEO Kaws — White Edition",
    price: 300,
    gsm: 320,
    category: "TEMEO Shirts",
    image: img440,
    backImage: img628,
    description:
      "The dissected KAWS companion on clean white. A rare white colourway that flips the palette and elevates the look. Themmie signature on the side.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["320gsm Combed Cotton", "White colourway", "Art print front", "Relaxed fit"],
    slug: "temeo-kaws-white",
  },
  // ── TEMEO WEARS ──────────────────────────────────────────
  {
    id: "temeo-wateva-cream",
    name: "TEMEO Wateva — Cream",
    price: 250,
    gsm: 260,
    category: "TEMEO Wears",
    image: temeoWear,
    backImage: img440,
    description:
      "The signature TEMEO cream oversize tee — back-printed with a sculptural editorial graphic. Wear the philosophy. #wateva",
    sizes: ["S", "M", "L", "XL"],
    details: ["260gsm Heavyweight Cotton", "Oversized fit", "Premium cream fabric", "Back editorial print"],
    slug: "temeo-wateva-cream",
  },
  {
    id: "temeo-classic-logo",
    name: "TEMEO Classic Logo Tee",
    price: 250,
    gsm: 260,
    category: "TEMEO Wears",
    image: tee1,
    backImage: tee2,
    description:
      "Bold TEMEO text on the back — sunset landscape meets streetwear. A clean front with an expressive rear makes this the everyday TEMEO staple.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["260gsm Combed Cotton", "Back print", "Classic fit", "Unisex"],
    slug: "temeo-classic-logo",
  },
  {
    id: "temeo-gallery-tee",
    name: "TEMEO Gallery Tee",
    price: 300,
    gsm: 320,
    category: "TEMEO Wears",
    image: tee2,
    backImage: tee1,
    description:
      "Gallery vibes on a tee. Framed artwork translated to cotton — for those who carry culture wherever they go.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["320gsm Premium Cotton", "Art-inspired back print", "Classic fit"],
    slug: "temeo-gallery-tee",
  },
  // ── TEMEO SHORTS ─────────────────────────────────────────
  {
    id: "temeo-shorts-white",
    name: "TEMEO Shorts — White",
    price: 200,
    category: "Temeo Shorts",
    image: shorts1,
    backImage: shorts3,
    description:
      "White TEMEO drawstring shorts with full KAWS graphic print. Lightweight, breathable, and unmistakably TEMEO.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Cotton-polyester blend", "Elasticated waistband", "Side pockets", "KAWS graphic print"],
    slug: "temeo-shorts-white",
  },
  {
    id: "temeo-shorts-black",
    name: "TEMEO Shorts — Black",
    price: 200,
    category: "Temeo Shorts",
    image: shorts2,
    backImage: shorts1,
    description:
      "All-black TEMEO shorts with vibrant KAWS characters. The dark colourway that lets the art do the talking.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Cotton-polyester blend", "Elasticated waistband", "Side pockets", "KAWS graphic print"],
    slug: "temeo-shorts-black",
  },
  {
    id: "temeo-shorts-multi",
    name: "TEMEO Shorts — Multi",
    price: 200,
    category: "Temeo Shorts",
    image: shorts3,
    backImage: shorts2,
    description:
      "The multiprint edition — TEMEO brand text along the hem, double KAWS characters on the legs. The full TEMEO experience, condensed to shorts.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Cotton-polyester blend", "Full hem branding", "Side pockets", "Limited run"],
    slug: "temeo-shorts-multi",
  },
  // ── TEMEO TOTE BAGS ──────────────────────────────────────
  {
    id: "temeo-tote-night",
    name: "TEMEO Night Tote",
    price: 45,
    category: "TEMEO Tote Bags",
    image: temeoTote,
    backImage: temeoTote,
    description:
      "TEMEO logo over a moody night cityscape. Printed canvas tote — for late nights, market runs, and everything in between.",
    sizes: ["One Size"],
    details: ["Heavy canvas", "Screen printed", "Dual straps", "Fits a 15\" laptop"],
    slug: "temeo-tote-night",
  },
  {
    id: "temeo-tote-books",
    name: "TEMEO Books Tote",
    price: 45,
    category: "TEMEO Tote Bags",
    image: temeoTote,
    backImage: temeoTote,
    description:
      "\"One place where my feelings are buried is in a stack of books.\" A literary tote for the culture-curious.",
    sizes: ["One Size"],
    details: ["Heavy canvas", "Screen printed", "Dual straps", "Quote print"],
    slug: "temeo-tote-books",
  },
];
