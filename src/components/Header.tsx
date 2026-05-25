import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { collectionList } from "@/lib/products";
import logo from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());

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
            Home
          </Link>
          <Link to="/shop" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Shop
          </Link>
          <Link to="/shop" search={{ cat: "Dresses" }} className="hover:text-foreground transition-colors">
            Dresses
          </Link>
          <Link to="/shop" search={{ cat: "Tops" }} className="hover:text-foreground transition-colors">
            Tops
          </Link>
          <Link to="/shop" search={{ cat: "Skirts" }} className="hover:text-foreground transition-colors">
            Skirts
          </Link>

          {/* Series dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              Series <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-background border border-border rounded-md shadow-lg py-2 min-w-[180px]">
                {collectionList.map((c) => (
                  <Link
                    key={c}
                    to="/shop"
                    search={{ collection: c }}
                    className="block px-4 py-2 text-sm hover:bg-secondary/60 whitespace-nowrap"
                  >
                    {c}
                  </Link>
                ))}
                <div className="border-t border-border my-1" />
                <Link
                  to="/shop"
                  search={{ cat: "Bow Series" }}
                  className="block px-4 py-2 text-sm hover:bg-secondary/60 whitespace-nowrap"
                >
                  Bow Series
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Link to="/cart" className="relative p-2 -mr-2" aria-label="Cart" onClick={() => setOpen(false)}>
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col text-sm divide-y divide-border/60">
            <Link to="/" onClick={() => setOpen(false)} className="py-3">Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)} className="py-3">Shop all</Link>
            <Link to="/shop" search={{ cat: "new" }} onClick={() => setOpen(false)} className="py-3">New arrivals</Link>

            <div className="pt-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Categories</p>
            </div>
            <Link to="/shop" search={{ cat: "Dresses" }} onClick={() => setOpen(false)} className="py-3">Dresses</Link>
            <Link to="/shop" search={{ cat: "Tops" }} onClick={() => setOpen(false)} className="py-3">Tops</Link>
            <Link to="/shop" search={{ cat: "Skirts" }} onClick={() => setOpen(false)} className="py-3">Skirts</Link>
            <Link to="/shop" search={{ cat: "Bow Series" }} onClick={() => setOpen(false)} className="py-3">Bow Series</Link>

            <div className="pt-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Series</p>
            </div>
            {collectionList.map((c) => (
              <Link
                key={c}
                to="/shop"
                search={{ collection: c }}
                onClick={() => setOpen(false)}
                className="py-3"
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
