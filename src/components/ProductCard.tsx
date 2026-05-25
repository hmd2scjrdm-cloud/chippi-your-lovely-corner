import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { categoryLabel, useLanguage } from "@/lib/language";

export function ProductCard({ product }: { product: Product }) {
  const language = useLanguage((s) => s.language);

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="product-card group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/30">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="product-card-img product-card-img-primary absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={product.images[1]}
          alt=""
          loading="lazy"
          width={800}
          height={800}
          className="product-card-img product-card-img-secondary absolute inset-0 h-full w-full object-cover opacity-0"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-background/90 px-2 py-1 rounded-sm">
            New
          </span>
        )}
      </div>
      <div className="pt-3 flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            {categoryLabel(product.category, language)}
          </p>
          <h3 className="serif text-base leading-tight">{product.name}</h3>
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">RM {product.price}</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            className="h-3 w-3 rounded-full border border-border/60"
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
          />
        ))}
      </div>
    </Link>
  );
}
