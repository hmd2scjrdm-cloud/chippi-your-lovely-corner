import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Cippi" },
      { name: "description", content: "Review your Cippi bag before checkout. Free Malaysia shipping over RM150." },
      { property: "og:title", content: "Your Bag — Cippi" },
      { property: "og:description", content: "Review your Cippi bag before checkout." },
    ],
  }),
  component: CartPage,
});

const payMethods = [
  { id: "tng", label: "Touch 'n Go eWallet" },
  { id: "grab", label: "GrabPay" },
  { id: "fpx", label: "FPX Online Banking" },
  { id: "card", label: "Credit / Debit Card" },
];

function CartPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const [pay, setPay] = useState("tng");

  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 8;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md text-center py-24 md:py-32 px-4 animate-fade-in">
        <h1 className="serif text-3xl md:text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Find something lovely to take home.</p>
        <Link to="/shop" className="inline-block mt-8 bg-primary text-primary-foreground px-6 py-3 text-sm rounded-sm hover:bg-primary/90 transition-colors">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-16 animate-fade-in">
      <h1 className="serif text-4xl md:text-5xl mb-10">Your Bag</h1>

      <div className="grid md:grid-cols-[1fr_360px] gap-12">
        {/* Items */}
        <div className="divide-y divide-border">
          {items.map((it) => (
            <div key={`${it.productId}-${it.size}-${it.color}`} className="py-6 flex gap-4">
              <img src={it.image} alt={it.name} className="h-28 w-28 md:h-32 md:w-32 object-cover rounded-sm bg-secondary/40" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="serif text-lg leading-tight">{it.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {it.color} · {it.size}
                    </p>
                  </div>
                  <button onClick={() => remove(it.productId, it.size, it.color)} aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-border rounded-sm">
                    <button onClick={() => updateQty(it.productId, it.size, it.color, it.qty - 1)} className="px-2.5 py-1.5">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-sm">{it.qty}</span>
                    <button onClick={() => updateQty(it.productId, it.size, it.color, it.qty + 1)} className="px-2.5 py-1.5">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm">RM {(it.price * it.qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="md:sticky md:top-24 self-start">
          <div className="bg-secondary/40 rounded-md p-6">
            <h2 className="serif text-xl mb-5">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `RM ${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal < 150 && (
                <p className="text-xs text-primary pt-1">
                  Add RM {(150 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between text-base mb-5">
              <span>Total</span>
              <span className="serif text-lg">RM {total.toFixed(2)}</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-foreground/70 mb-3">Payment</p>
            <div className="space-y-2 mb-5">
              {payMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm border cursor-pointer text-sm transition-colors ${
                    pay === m.id ? "border-foreground bg-background" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    value={m.id}
                    checked={pay === m.id}
                    onChange={() => setPay(m.id)}
                    className="accent-primary"
                  />
                  {m.label}
                </label>
              ))}
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-colors">
              Checkout
            </button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Estimated delivery 2–4 days via J&T / NinjaVan / PosLaju
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
