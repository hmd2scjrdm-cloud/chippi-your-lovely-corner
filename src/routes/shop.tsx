import { createFileRoute, Link } from "@tanstack/react-router";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const shopSearch = z.object({
  cat: z.union([
    z.enum(["Tops", "Dresses", "Skirts", "Bow Series", "new"]),
    z.literal(""),
  ]).optional(),
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

function Shop() {
  const { cat } = Route.useSearch();
  const active = cat || "All";

  const filtered = products.filter((p) => {
    if (!cat || cat === "") return true;
    if (cat === "new") return p.isNew;
    return p.category === cat;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 animate-fade-in">
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Shop</p>
        <h1 className="serif text-4xl md:text-5xl">All pieces</h1>
      </div>

      <div className="flex gap-2 mb-8 md:mb-10 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {categories.map((c) => {
          const isActive = active === c;
          const label = c === "new" ? "New" : c;
          return (
            <Link
              key={c}
              to="/shop"
              search={c === "All" ? {} : { cat: c as Exclude<typeof c, "All"> }}
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
