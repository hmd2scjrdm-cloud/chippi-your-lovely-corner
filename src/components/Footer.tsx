import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="serif text-2xl mb-3">chippi<span className="text-primary">.</span></div>
          <p className="text-muted-foreground leading-relaxed">
            For every lovely moment. Made in KL, designed for the soft and the strong.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">Shop</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Bow Series</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">Help</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Size Guide</li>
            <li>Shipping & Returns</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">Follow</h4>
          <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Instagram className="h-4 w-4" /> @chippi.my
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            Ships across Malaysia via J&T, NinjaVan, PosLaju.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Chippi. All rights reserved.
      </div>
    </footer>
  );
}
