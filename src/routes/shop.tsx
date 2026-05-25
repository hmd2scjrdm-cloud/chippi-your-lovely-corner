import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, X } from "lucide-react";
import { categoryDetails, products, type Category } from "@/lib/products";
import { categoryLabel, copy, useLanguage } from "@/lib/language";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const sortValues = ["featured", "price-asc", "price-desc", "best", "new"] as const;
type SortValue = (typeof sortValues)[number];

const shopSearch = z.object({
  cat: z
    .union([z.enum(["Bebe Bow", "Le Garden", "The Daily", "new"]), z.literal("")])
    .optional(),
  q: z.string().optional(),
  color: z.string().optional(),
  sort: z.enum(sortValues).optional(),
});

type ShopSearch = z.infer<typeof shopSearch>;

export const Route = createFileRoute("/shop")({
  validateSearch: (s): ShopSearch => shopSearch.parse(s),
  head: () => ({
    meta: [
      { title: "Shop — Cippy" },
      { name: "description", content: "浏览 Chippi 的贝贝蝴蝶结、花园系列与日常系列。马来西亚全境配送。" },
      { property: "og:title", content: "Shop — Cippy" },
      { property: "og:description", content: "浏览 Chippi 的贝贝蝴蝶结、花园系列与日常系列。" },
    ],
  }),
  component: Shop,
});

const categories: (Category | "All" | "new")[] = ["All", "new", "Bebe Bow", "Le Garden", "The Daily"];

const sortOptions: { value: SortValue; labelKey: keyof typeof copy.zh.shop.sorts }[] = [
  { value: "featured", labelKey: "featured" },
  { value: "new", labelKey: "new" },
  { value: "best", labelKey: "best" },
  { value: "price-asc", labelKey: "priceAsc" },
  { value: "price-desc", labelKey: "priceDesc" },
];

function Shop() {
  const { cat, sort, q, color } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const language = useLanguage((s) => s.language);
  const t = copy[language];
  const active = cat || "All";
  const activeSort: SortValue = sort ?? "featured";
  const searchTerm = q?.trim() ?? "";
  const activeColor = color?.trim() ?? "";

  const colorOptions = useMemo(
    () =>
      Array.from(
        new Map(
          products.flatMap((p) => p.colors).map((c) => [c.name, c])
        ).values()
      ),
    []
  );

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (!cat || cat === "") return true;
      if (cat === "new") return p.isNew;
      return p.category === cat;
    }).filter((p) => {
      if (activeColor && !p.colors.some((c) => c.name === activeColor)) return false;
      if (!searchTerm) return true;
      const haystack = [
        p.name,
        p.description,
        p.fabric,
        p.category,
        categoryDetails[p.category].nameZh,
        categoryDetails[p.category].tagline,
        ...p.colors.map((c) => c.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    });
    const sorted = [...base];
    switch (activeSort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "best":
        sorted.sort((a, b) => Number(!!b.isBest) - Number(!!a.isBest));
        break;
      case "new":
        sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
    }
    return sorted;
  }, [cat, activeColor, searchTerm, activeSort]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 animate-fade-in">
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t.shop.eyebrow}</p>
        <h1 className="serif text-4xl md:text-5xl">{t.shop.title}</h1>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q ?? ""}
            onChange={(e) => {
              const next = e.target.value;
              navigate({ search: (prev: ShopSearch) => ({ ...prev, q: next || undefined }) });
            }}
            placeholder={t.shop.searchPlaceholder}
            className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
          {q && (
            <button
              type="button"
              onClick={() => navigate({ search: (prev: ShopSearch) => ({ ...prev, q: undefined }) })}
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-muted-foreground sm:inline">{t.shop.sortBy}</span>
          <select
            value={activeSort}
            onChange={(e) => {
              const next = e.target.value as SortValue;
              navigate({
                search: (prev: ShopSearch) => ({
                  ...prev,
                  sort: next === "featured" ? undefined : next,
                }),
              });
            }}
            className="h-11 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground/40 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {t.shop.sorts[o.labelKey]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {categories.map((c) => {
          const isActive = active === c;
          const label = c === "All" ? t.shop.all : c === "new" ? t.nav.new : categoryLabel(c, language);
          return (
            <Link
              key={c}
              to="/shop"
              search={(prev: ShopSearch) => ({
                ...prev,
                cat: c === "All" ? undefined : (c as Exclude<typeof c, "All">),
              })}
              className={`whitespace-nowrap px-4 py-2 text-sm rounded-full border transition-colors ${
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="mb-8 md:mb-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{filtered.length} {t.shop.pieces}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t.shop.colors}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          <button
            type="button"
            onClick={() => navigate({ search: (prev: ShopSearch) => ({ ...prev, color: undefined }) })}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
              !activeColor
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {t.shop.allColors}
          </button>
          {colorOptions.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() =>
                navigate({
                  search: (prev: ShopSearch) => ({
                    ...prev,
                    color: activeColor === c.name ? undefined : c.name,
                  }),
                })
              }
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm transition-colors ${
                activeColor === c.name
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span className="h-3.5 w-3.5 rounded-full border border-border/70" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">{t.shop.empty}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
