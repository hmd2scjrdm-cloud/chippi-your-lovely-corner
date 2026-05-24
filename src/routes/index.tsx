import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import hero from "@/assets/hero.jpg";
import packaging from "@/assets/packaging.jpg";
import ig1 from "@/assets/ig1.jpg";
import ig2 from "@/assets/ig2.jpg";
import ig3 from "@/assets/ig3.jpg";
import ig4 from "@/assets/ig4.jpg";
import ig5 from "@/assets/ig5.jpg";
import ig6 from "@/assets/ig6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chippi — Korean coquette fashion in Malaysia" },
      { name: "description", content: "Discover Chippi's newest dresses, bows and pearl-button knits. Made for every lovely moment." },
      { property: "og:title", content: "Chippi — Korean coquette fashion in Malaysia" },
      { property: "og:description", content: "Discover Chippi's newest dresses, bows and pearl-button knits." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Home,
});

function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 1)[0];
  const bestSeller = products.filter((p) => p.isBest).slice(0, 1)[0];
  const bowProduct = products.find((p) => p.category === "Bow Series")!;
  const featured = products.slice(0, 4);
  const igPosts = [ig1, ig2, ig3, ig4, ig5, ig6];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Chippi spring collection"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-8 flex items-end pb-16 md:pb-24">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-background/90 mb-3">
              Spring Edit · 2026
            </p>
            <h1 className="serif text-5xl md:text-7xl text-background leading-[1.05]">
              For every
              <br />
              <em className="not-italic text-background">lovely</em> moment.
            </h1>
            <div className="mt-8 flex gap-3">
              <Link
                to="/shop"
                className="bg-background text-foreground px-7 py-3 text-sm tracking-wide hover:bg-background/90 transition-colors rounded-sm"
              >
                Shop the Edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="serif text-3xl md:text-4xl">Curated for you</h2>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:h-[600px]">
          <Link
            to="/product/$id"
            params={{ id: newArrivals.id }}
            className="relative col-span-2 md:row-span-2 overflow-hidden rounded-md group bg-secondary/50"
          >
            <img src={newArrivals.images[1]} alt={newArrivals.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-5 left-5 text-background">
              <p className="text-[10px] uppercase tracking-widest opacity-90">New Arrivals</p>
              <h3 className="serif text-2xl md:text-3xl mt-1">{newArrivals.name}</h3>
            </div>
          </Link>
          <Link
            to="/product/$id"
            params={{ id: bestSeller.id }}
            className="relative col-span-2 overflow-hidden rounded-md group bg-secondary/50"
          >
            <img src={bestSeller.images[0]} alt={bestSeller.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-background">
              <p className="text-[10px] uppercase tracking-widest opacity-90">Best Seller</p>
              <h3 className="serif text-xl mt-0.5">{bestSeller.name}</h3>
            </div>
          </Link>
          <Link
            to="/shop"
            search={{ cat: "Bow Series" }}
            className="relative overflow-hidden rounded-md group bg-accent/40 aspect-square md:aspect-auto"
          >
            <img src={bowProduct.images[0]} alt="Bow Series" loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-background">
              <p className="text-[10px] uppercase tracking-widest opacity-90">Collection</p>
              <h3 className="serif text-xl mt-0.5">Bow Series</h3>
            </div>
          </Link>
          <div className="relative overflow-hidden rounded-md bg-gradient-soft aspect-square md:aspect-auto p-6 flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-foreground/70">Made for KL</p>
            <div>
              <h3 className="serif text-2xl leading-tight">Ready stock<br/>in PJ.</h3>
              <p className="text-xs text-muted-foreground mt-2">Ships in 24h via J&T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Featured</p>
          <h2 className="serif text-3xl md:text-4xl">The Soft List</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Packaging story */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <img src={packaging} alt="Chippi packaging" loading="lazy" width={1200} height={900} className="w-full rounded-md shadow-soft" />
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">The Unboxing</p>
            <h2 className="serif text-3xl md:text-4xl leading-tight">A little ceremony,<br/>in every parcel.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every Chippi piece arrives wrapped in tissue, tied with a satin ribbon, and folded inside our blush-pink box. Because the moment you open it is part of the outfit too.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tag us</p>
          <h2 className="serif text-3xl md:text-4xl">@chippi.my</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {igPosts.map((src, i) => (
            <a key={i} href="#" className="aspect-square overflow-hidden rounded-sm group">
              <img src={src} alt={`Chippi community post ${i + 1}`} loading="lazy" width={600} height={600} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
