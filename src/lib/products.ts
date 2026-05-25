import p1 from "@/assets/p1.jpg";
import p1b from "@/assets/p1b.jpg";
import p2 from "@/assets/p2.jpg";
import p2b from "@/assets/p2b.jpg";
import p3 from "@/assets/p3.jpg";
import p3b from "@/assets/p3b.jpg";
import p4 from "@/assets/p4.jpg";
import p4b from "@/assets/p4b.jpg";
import p5 from "@/assets/p5.jpg";
import p5b from "@/assets/p5b.jpg";
import p6 from "@/assets/p6.jpg";
import p6b from "@/assets/p6b.jpg";

export type Category = "Tops" | "Dresses" | "Skirts" | "Bow Series";

export interface Product {
  id: string;
  name: string;
  price: number; // in RM
  images: [string, string];
  category: Category;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  fabric: string;
  care: string;
  modelInfo: string;
  staffReview: string;
  isNew?: boolean;
  isBest?: boolean;
  /** Other product IDs shown together in this photo (e.g. matching set pieces). */
  pairsWith?: { id: string; label: string }[];
}

/** Curated combo SKUs — buy the look as a set with a small discount. */
export interface Bundle {
  id: string; // SKU
  name: string;
  productIds: string[];
  /** Discount in RM off the sum of member prices. 0 = no discount, just grouped as a set. */
  discount: number;
}

export const products: Product[] = [
  {
    id: "bow-collar-blouse",
    name: "Ribbon Collar Blouse",
    price: 89,
    images: [p1, p1b],
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dusty Pink", hex: "#E2B5B0" },
      { name: "Cream", hex: "#F1E9DD" },
    ],
    description:
      "A signature piece — soft chiffon with a hand-tied ribbon collar. Designed to wear from a Sunday brunch into golden hour.",
    fabric: "100% Recycled Polyester Chiffon",
    care: "Hand wash cold, hang to dry",
    modelInfo: "Model is 168cm / 48kg, wearing size S",
    staffReview: "Staff A (160cm / 48kg) wears S — relaxed through the shoulder, true to size.",
    isNew: true,
    isBest: true,
    pairsWith: [{ id: "pleated-mini-skirt", label: "Skirt in photo" }],
  },
  {
    id: "pleated-mini-skirt",
    name: "Pearl Button Pleated Skirt",
    price: 109,
    images: [p2, p2b],
    category: "Skirts",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Cream", hex: "#F1E9DD" }],
    description:
      "Pleats that hold their shape after every wash. Petite pearl buttons, an inner lining, and a hidden side zip.",
    fabric: "Polyester twill with viscose lining",
    care: "Machine wash gentle",
    modelInfo: "Model is 165cm / 50kg, wearing size S",
    staffReview: "Staff B (158cm / 45kg) sizes down to XS for a tailored waist.",
    isNew: true,
    pairsWith: [{ id: "bow-collar-blouse", label: "Top in photo" }],
  },
  {
    id: "dusty-pink-dress",
    name: "Sunday Bow Mini Dress",
    price: 159,
    images: [p3, p3b],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Dusty Pink", hex: "#D9A9A0" }],
    description:
      "Our most-loved silhouette. Lantern sleeves, a defined waist tie, and a softly gathered hem.",
    fabric: "Cotton blend poplin",
    care: "Machine wash cold, iron low",
    modelInfo: "Model is 170cm / 52kg, wearing size S",
    staffReview: "Staff C (163cm / 50kg) wears S — true to size, ties at the natural waist.",
    isBest: true,
  },
  {
    id: "pearl-cardigan",
    name: "Pearl Bow Cardigan",
    price: 139,
    images: [p4, p4b],
    category: "Tops",
    sizes: ["One Size"],
    colors: [{ name: "Cream", hex: "#F4ECDC" }],
    description:
      "A cropped knit with detachable satin bows. Wear the bows at the collar, the cuff, or skip them entirely.",
    fabric: "Cotton-acrylic knit",
    care: "Hand wash cold, lay flat to dry",
    modelInfo: "Model is 167cm / 49kg, wearing One Size",
    staffReview: "Fits XS to M comfortably — generous through the arm, cropped at the waist.",
    isNew: true,
  },
  {
    id: "satin-bow-set",
    name: "Satin Bow Trio",
    price: 39,
    images: [p5, p5b],
    category: "Bow Series",
    sizes: ["One Size"],
    colors: [
      { name: "Pink", hex: "#E8A2A2" },
      { name: "Cream", hex: "#F1E9DD" },
    ],
    description:
      "Three satin bow clips in graduated sizes. The little detail that makes any outfit feel chosen.",
    fabric: "Silk-touch polyester satin",
    care: "Spot clean only",
    modelInfo: "One size — adjustable clip",
    staffReview: "We all keep one in our bag. Pin to a tote, a ponytail, or a cardigan.",
    isBest: true,
  },
  {
    id: "checkered-mini-skirt",
    name: "Latte Check Mini Skirt",
    price: 119,
    images: [p6, p6b],
    category: "Skirts",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Latte", hex: "#D6BFA0" }],
    description:
      "A soft windowpane check on warm beige. High-waisted, with a soft bow at the front.",
    fabric: "Cotton-wool blend",
    care: "Dry clean recommended",
    modelInfo: "Model is 166cm / 47kg, wearing size S",
    staffReview: "Staff D (160cm / 52kg) wears S — sits at the natural waist.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const bundles: Bundle[] = [
  {
    id: "SET-RIBBON-PLEATED",
    name: "Ribbon Blouse + Pleated Skirt Set",
    productIds: ["bow-collar-blouse", "pleated-mini-skirt"],
    discount: 20,
  },
];

export const getBundle = (id: string) => bundles.find((b) => b.id === id);

/** Find a bundle that contains this product (returns the first match). */
export const findBundleFor = (productId: string) =>
  bundles.find((b) => b.productIds.includes(productId));

export const bundleMemberPriceSum = (bundle: Bundle) =>
  bundle.productIds.reduce((sum, pid) => sum + (getProduct(pid)?.price ?? 0), 0);

export const bundlePrice = (bundle: Bundle) =>
  Math.max(0, bundleMemberPriceSum(bundle) - bundle.discount);

