import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";
import { fallback } from "@tanstack/zod-adapter";

const shopSearch = z.object({
  cat: z.union([
    z.enum(["Tops", "Dresses", "Skirts", "Bow Series", "new"]),
    z.literal(""),
  ]).optional(),
  sort: fallback(
    z.enum(["featured", "price-asc", "price-desc", "best", "new"]),
    "featured",
  ).default("featured"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearch,
  head: () => ({
    meta: [
      { title: "Shop — Cippy" },
      { name: "description", content: "Browse all Cippy pieces. Dresses, tops, skirts and bows. Ships across Malaysia." },
      { property: "og:title", content: "Shop — Cippy" },
      { property: "og:description", content: "Browse all Cippy pieces. Dresses, tops, skirts and bows." },
    ],
  }),
  component: Shop,
});

const categories: (Category | "All" | "new")[] = ["All", "new", "Tops", "Dresses", "Skirts", "Bow Series"];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "New arrivals" },
  { value: "best", label: "Best sellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

function Shop() {
  const { cat, sort } = Route.useSearch();
  const active = cat || "All";

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (!cat || cat === "") return true;
      if (cat === "new") return p.isNew;
      return p.category === cat;
    });
    const sorted = [...base];
    switch (sort) {
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
  }, [cat, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 animate-fade-in">
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Shop</p>
        <h1 className="serif text-4xl md:text-5xl">All pieces</h1>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {categories.map((c) => {
          const isActive = active === c;
          const label = c === "new" ? "New" : c;
          return (
            <Link
              key={c}
              to="/shop"
              search={(prev) => ({
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

      <div className="flex items-center justify-between mb-8 md:mb-10">
        <p className="text-xs text-muted-foreground">{filtered.length} pieces</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hidden sm:inline">Sort by</span>
          <select
            value={sort}
            onChange={(e) => {
              const next = e.target.value as typeof sort;
              const url = new URL(window.location.href);
              if (next === "featured") url.searchParams.delete("sort");
              else url.searchParams.set("sort", next);
              window.history.replaceState({}, "", url.toString());
              // force navigation through router
              window.location.assign(url.toString());
            }}
            className="bg-transparent border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">Nothing here yet — check back soon.</p>
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
