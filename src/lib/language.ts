import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoryDetails, type Category } from "./products";

export type Language = "zh" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "zh",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set({ language: get().language === "zh" ? "en" : "zh" }),
    }),
    { name: "cippy-language" }
  )
);

export const categoryLabel = (category: Category, language: Language) =>
  language === "zh" ? categoryDetails[category].nameZh : category;

export const copy = {
  zh: {
    nav: { home: "首页", shop: "全部商品", new: "新品", cart: "购物车", language: "EN" },
    home: {
      eyebrow: "Chippi 衣橱 · 2026",
      titleTop: "每一个可爱时刻",
      titleBottom: "都值得被打扮",
      cta: "逛逛新系列",
      curated: "为你挑选",
      viewAll: "查看全部",
      featuredEyebrow: "精选",
      featuredTitle: "Chippi Soft List",
      newArrivals: "新品上架",
      bestSeller: "人气单品",
      readyTitle: "现货在 KL",
      readyText: "下单后 24 小时内寄出。",
      brandEyebrow: "Chippi 风格",
      brandTitle: "蝴蝶结、花瓣感、日常也精致。",
      brandText:
        "我们把 Chippi 的衣橱整理成三个清楚的系列：贝贝蝴蝶结负责招牌甜感，花园系列负责浪漫氛围，日常系列负责咖啡、约会和每一天。",
      packagingEyebrow: "开箱时刻",
      packagingTitle: "每一份包裹，都像一份小礼物。",
      packagingText:
        "每件 Chippi 都会被细心折好、用柔软包装送到你手上。衣服好看，收到的那一刻也要可爱。",
      tagUs: "标记我们",
    },
    shop: {
      eyebrow: "Shop",
      title: "全部商品",
      searchPlaceholder: "搜索商品、系列或颜色",
      all: "全部",
      colors: "颜色",
      allColors: "全部颜色",
      pieces: "件商品",
      sortBy: "排序",
      empty: "没有找到符合条件的商品，换个关键词或颜色看看。",
      sorts: {
        featured: "推荐",
        new: "新品优先",
        best: "人气优先",
        priceAsc: "价格：低到高",
        priceDesc: "价格：高到低",
      },
    },
    product: { color: "颜色", size: "尺码", sizeGuide: "尺码指南", addToCart: "加入购物车", added: "已加入" },
    footer: {
      shop: "Shop",
      help: "帮助",
      follow: "关注",
      newArrivals: "新品上架",
      giftCards: "礼品卡",
      sizeGuide: "尺码指南",
      shipping: "配送与退换",
      faq: "常见问题",
      contact: "联系我们",
    },
  },
  en: {
    nav: { home: "Home", shop: "Shop all", new: "New", cart: "Cart", language: "中文" },
    home: {
      eyebrow: "Chippi Wardrobe · 2026",
      titleTop: "For every",
      titleBottom: "lovely moment.",
      cta: "Shop the edit",
      curated: "Curated for you",
      viewAll: "View all",
      featuredEyebrow: "Featured",
      featuredTitle: "The Soft List",
      newArrivals: "New Arrivals",
      bestSeller: "Best Seller",
      readyTitle: "Ready stock in KL",
      readyText: "Ships within 24 hours.",
      brandEyebrow: "The Chippi mood",
      brandTitle: "Bows, garden softness, and everyday polish.",
      brandText:
        "Chippi is now arranged into three easy moods: Bebe Bow for the signature sweet detail, Le Garden for romantic days, and The Daily for coffee runs, dates, and every soft little plan.",
      packagingEyebrow: "The Unboxing",
      packagingTitle: "A little gift feeling in every parcel.",
      packagingText:
        "Every Chippi piece is folded with care and wrapped to feel sweet from the moment it arrives.",
      tagUs: "Tag us",
    },
    shop: {
      eyebrow: "Shop",
      title: "All pieces",
      searchPlaceholder: "Search products, series or colors",
      all: "All",
      colors: "Colors",
      allColors: "All colors",
      pieces: "pieces",
      sortBy: "Sort by",
      empty: "No pieces match yet. Try another keyword or color.",
      sorts: {
        featured: "Featured",
        new: "New arrivals",
        best: "Best sellers",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
      },
    },
    product: { color: "Color", size: "Size", sizeGuide: "Size guide", addToCart: "Add to Cart", added: "Added" },
    footer: {
      shop: "Shop",
      help: "Help",
      follow: "Follow",
      newArrivals: "New Arrivals",
      giftCards: "Gift Cards",
      sizeGuide: "Size Guide",
      shipping: "Shipping & Returns",
      faq: "FAQ",
      contact: "Contact",
    },
  },
} as const;
