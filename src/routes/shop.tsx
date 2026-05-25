import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { products, type Category, collectionList, collectionInfo } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const sortValues = ["featured", "price-asc", "price-desc", "best", "new"] as const;
type SortValue = (typeof sortValues)[number];

const shopSearch = z.object({
  cat: z
    .union([z.enum(["Tops", "Dresses", "Skirts", "Bow Series", "new"]), z.literal("")])
    .optional(),
  collection: z.enum(collectionList).optional(),
  sort: z.enum(sortValues).optional(),
});

type ShopSearch = z.infer<typeof shopSearch>;

export const Route = createFileRoute("/shop")({
  validateSearch: (s): ShopSearch => shopSearch.parse(s),
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

const sortOptions: { value: SortValue; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "New arrivals" },
  { value: "best", label: "Best sellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function Shop() {
  const { cat, collection, sort } = Route.useSearch() as ShopSearch;
  const navigate = useNavigate({ from: "/shop" });
  const active = cat || "All";
  const activeSort: SortValue = sort ?? "featured";

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (collection && !p.collections?.includes(collection)) return false;
      if (!cat) return true;
      if (cat === "new") return p.isNew;
      return p.category === cat;
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
  }, [cat, collection, activeSort]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 animate-fade-in">
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {collection ? "Collection" : "Shop"}
        </p>
        <h1 className="serif text-4xl md:text-5xl">{collection ?? "All pieces"}</h1>
        {collection && (
          <p className="mt-3 text-muted-foreground">{collectionInfo[collection].tagline}</p>
        )}
      </div>

      {/* Collections strip */}
      <div className="flex gap-2 mb-3 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        <Link
          to="/shop"
          search={(prev: ShopSearch) => ({ ...prev, collection: undefined })}
          className={`whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-widest rounded-full border transition-colors ${
            !collection
              ? "bg-primary/10 border-primary text-primary"
              : "border-border text-muted-foreground hover:border-foreground/40"
          }`}
        >
          All series
        </Link>
        {collectionList.map((c) => {
          const isActive = collection === c;
          return (
            <Link
              key={c}
              to="/shop"
              search={(prev: ShopSearch) => ({ ...prev, collection: c })}
              className={`whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-widest rounded-full border transition-colors ${
                isActive
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/40"
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>


      <div className="flex gap-2 mb-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {categories.map((c) => {
          const isActive = active === c;
          const label = c === "new" ? "New" : c;
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

      <div className="flex items-center justify-between mb-8 md:mb-10">
        <p className="text-xs text-muted-foreground">{filtered.length} pieces</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hidden sm:inline">Sort by</span>
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
