import { Instagram } from "lucide-react";
import { categoryLabel, copy, useLanguage } from "@/lib/language";

export function Footer() {
  const language = useLanguage((s) => s.language);
  const t = copy[language];

  return (
    <footer className="border-t border-border/60 mt-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="serif text-2xl mb-3">cippy<span className="text-primary">.</span></div>
          <p className="text-muted-foreground leading-relaxed">
            For every lovely moment. Made in KL, designed for the soft and the strong.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">{t.footer.shop}</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>{t.footer.newArrivals}</li>
            <li>{categoryLabel("Bebe Bow", language)}</li>
            <li>{categoryLabel("Le Garden", language)}</li>
            <li>{categoryLabel("The Daily", language)}</li>
            <li>{t.footer.giftCards}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">{t.footer.help}</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>{t.footer.sizeGuide}</li>
            <li>{t.footer.shipping}</li>
            <li>{t.footer.faq}</li>
            <li>{t.footer.contact}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 text-foreground/70">{t.footer.follow}</h4>
          <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Instagram className="h-4 w-4" /> @cippy.my
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            Ships across Malaysia via J&T, NinjaVan, PosLaju.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cippy. All rights reserved.
      </div>
    </footer>
  );
}
