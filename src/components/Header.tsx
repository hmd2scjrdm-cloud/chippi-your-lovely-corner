import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.jpeg";

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());

  const links = [
    { to: "/shop", label: "Shop" },
    { to: "/shop", label: "New", search: { cat: "new" } as const },
    { to: "/shop", label: "Bow Series", search: { cat: "Bow Series" } as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" aria-label="Cippy home" className="flex items-center">
          <img src={logo} alt="Cippy" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/shop" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Shop
          </Link>
          <Link to="/shop" search={{ cat: "Bow Series" }} className="hover:text-foreground transition-colors">
            Bow Series
          </Link>
        </nav>

        <Link to="/cart" className="relative p-2 -mr-2" aria-label="Cart">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <nav className="px-4 py-4 flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)} className="py-2">Shop all</Link>
            <Link to="/shop" search={{ cat: "Dresses" }} onClick={() => setOpen(false)} className="py-2">Dresses</Link>
            <Link to="/shop" search={{ cat: "Tops" }} onClick={() => setOpen(false)} className="py-2">Tops</Link>
            <Link to="/shop" search={{ cat: "Skirts" }} onClick={() => setOpen(false)} className="py-2">Skirts</Link>
            <Link to="/shop" search={{ cat: "Bow Series" }} onClick={() => setOpen(false)} className="py-2">Bow Series</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
