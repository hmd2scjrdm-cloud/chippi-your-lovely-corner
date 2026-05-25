import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { categoryLabel, copy, useLanguage } from "@/lib/language";
import logo from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const language = useLanguage((s) => s.language);
  const toggleLanguage = useLanguage((s) => s.toggleLanguage);
  const t = copy[language];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          className="md:hidden p-2 -ml-2 touch-manipulation"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" aria-label="Cippy home" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={logo} alt="Cippy" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            {t.nav.home}
          </Link>
          <Link to="/shop" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            {t.nav.shop}
          </Link>
          <Link to="/shop" search={{ cat: "Bebe Bow" }} className="hover:text-foreground transition-colors">
            {categoryLabel("Bebe Bow", language)}
          </Link>
          <Link to="/shop" search={{ cat: "Le Garden" }} className="hover:text-foreground transition-colors">
            {categoryLabel("Le Garden", language)}
          </Link>
          <Link to="/shop" search={{ cat: "The Daily" }} className="hover:text-foreground transition-colors">
            {categoryLabel("The Daily", language)}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
            aria-label="Switch language"
          >
            {t.nav.language}
          </button>
          <Link to="/cart" className="relative p-2 -mr-2" aria-label={t.nav.cart} onClick={() => setOpen(false)}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col text-sm divide-y divide-border/60">
            <Link to="/" onClick={() => setOpen(false)} className="py-3">{t.nav.home}</Link>
            <Link to="/shop" onClick={() => setOpen(false)} className="py-3">{t.nav.shop}</Link>
            <Link to="/shop" search={{ cat: "new" }} onClick={() => setOpen(false)} className="py-3">{t.nav.new}</Link>
            <Link to="/shop" search={{ cat: "Bebe Bow" }} onClick={() => setOpen(false)} className="py-3">{categoryLabel("Bebe Bow", language)}</Link>
            <Link to="/shop" search={{ cat: "Le Garden" }} onClick={() => setOpen(false)} className="py-3">{categoryLabel("Le Garden", language)}</Link>
            <Link to="/shop" search={{ cat: "The Daily" }} onClick={() => setOpen(false)} className="py-3">{categoryLabel("The Daily", language)}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
