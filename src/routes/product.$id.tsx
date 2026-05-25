import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { getProduct, products, findBundleFor, bundlePrice, bundleMemberPriceSum } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Cippy` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Cippy` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md text-center py-32 px-4">
      <h1 className="serif text-3xl">Piece not found</h1>
      <p className="text-muted-foreground mt-3">It may have sold out.</p>
      <Link to="/shop" className="inline-block mt-6 underline underline-offset-4">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-md text-center py-32 px-4">
        <h1 className="serif text-3xl">Something didn't load</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 underline">Try again</button>
      </div>
    );
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id)!;
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="animate-fade-in pb-32 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10 grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/30 mb-3">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
            {product.pairsWith && product.pairsWith.length > 0 && (
              <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                {product.pairsWith.map((p) => {
                  const target = getProduct(p.id);
                  if (!target) return null;
                  return (
                    <Link
                      key={p.id}
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="group/tag flex items-center gap-2 bg-background/90 backdrop-blur-sm pl-2 pr-3 py-1.5 rounded-full shadow-sm hover:bg-background transition-colors"
                    >
                      <img src={target.images[0]} alt="" className="h-7 w-7 rounded-full object-cover" />
                      <span className="text-[11px] tracking-wide">{p.label} →</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square w-20 overflow-hidden rounded-sm border transition-all ${
                  activeImg === i ? "border-foreground" : "border-transparent opacity-70"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="md:pt-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{product.category}</p>
          <h1 className="serif text-3xl md:text-4xl leading-tight">{product.name}</h1>
          <p className="mt-3 text-xl text-foreground">RM {product.price.toFixed(2)}</p>
          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest mb-3 text-foreground/70">
              Color · <span className="text-foreground">{color}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-9 w-9 rounded-full border-2 transition-colors ${
                    color === c.name ? "border-foreground" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-widest text-foreground/70">Size</p>
              <a href="#size-guide" className="text-xs text-muted-foreground underline underline-offset-4">Size guide</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] px-3 h-10 text-sm rounded-sm border transition-colors ${
                    size === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="mt-8 hidden md:flex items-stretch gap-3">
            <div className="flex items-center border border-border rounded-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3" aria-label="Decrease">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3" aria-label="Increase">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-primary text-primary-foreground py-3 px-6 text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {added ? <><Check className="h-4 w-4" /> Added</> : "Add to Cart"}
            </button>
          </div>

          {/* Size guide */}
          <div id="size-guide" className="mt-12 border-t border-border pt-8">
            <h3 className="serif text-xl mb-4">Fit & Size Guide</h3>
            <div className="rounded-md bg-secondary/40 p-5 space-y-3 text-sm">
              <p><span className="text-muted-foreground">Model: </span>{product.modelInfo}</p>
              <p><span className="text-muted-foreground">Staff: </span>{product.staffReview}</p>
            </div>
          </div>

          {/* Fabric */}
          <div className="mt-8 border-t border-border pt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Fabric</p>
              <p>{product.fabric}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Care</p>
              <p>{product.care}</p>
            </div>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            Ready stock · Ships from KL within 24h
          </div>
        </div>
      </div>

      {/* Complete the look */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-16 md:mt-24">
        <h2 className="serif text-2xl md:text-3xl mb-8">Complete the Look</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky mobile add-to-cart */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border p-3 flex items-stretch gap-3">
        <div className="flex items-center border border-border rounded-sm">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3" aria-label="Decrease">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-7 text-center text-sm">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="px-3" aria-label="Increase">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex-1 bg-primary text-primary-foreground py-3 text-sm rounded-sm flex items-center justify-center gap-2"
        >
          {added ? <><Check className="h-4 w-4" /> Added</> : `Add · RM ${(product.price * qty).toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
