import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBundle, bundleMemberPriceSum } from "./products";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
  /** If present, this item belongs to a combo SKU. Items sharing the same
   *  bundleId + bundleGroup are treated as one set for discount + display. */
  bundleId?: string;
  bundleGroup?: string;
}

export interface BundleApplied {
  bundleId: string;
  bundleGroup: string;
  name: string;
  productIds: string[];
  /** RM discount applied for this set instance. */
  discount: number;
  /** Sum of member prices before discount, for this instance. */
  fullPrice: number;
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  addBundle: (bundleId: string, members: Omit<CartItem, "bundleId" | "bundleGroup">[]) => void;
  remove: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
  /** Total discount across all complete bundle instances in the cart. */
  bundleDiscount: () => number;
  /** Complete bundle instances detected in the cart. */
  appliedBundles: () => BundleApplied[];
}

const keyMatch = (a: CartItem, productId: string, size: string, color: string) =>
  a.productId === productId && a.size === size && a.color === color;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) =>
            keyMatch(i, item.productId, item.size, item.color)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                keyMatch(i, item.productId, item.size, item.color)
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter((i) => !keyMatch(i, productId, size, color)),
        })),
      updateQty: (productId, size, color, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              keyMatch(i, productId, size, color) ? { ...i, qty: Math.max(1, qty) } : i
            ),
        })),
      addBundle: (bundleId, members) =>
        set((state) => {
          const bundleGroup = `${bundleId}-${Date.now()}`;
          const tagged: CartItem[] = members.map((m) => ({
            ...m,
            bundleId,
            bundleGroup,
          }));
          return { items: [...state.items, ...tagged] };
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0) -
        get().bundleDiscount(),
      appliedBundles: () => {
        const groups = new Map<string, CartItem[]>();
        for (const it of get().items) {
          if (!it.bundleId || !it.bundleGroup) continue;
          const key = it.bundleGroup;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(it);
        }
        const applied: BundleApplied[] = [];
        for (const [group, items] of groups) {
          const bundleId = items[0].bundleId!;
          const b = getBundle(bundleId);
          if (!b) continue;
          const hasAll = b.productIds.every((pid) =>
            items.some((i) => i.productId === pid && i.qty >= 1)
          );
          if (!hasAll) continue;
          applied.push({
            bundleId,
            bundleGroup: group,
            name: b.name,
            productIds: b.productIds,
            discount: b.discount,
            fullPrice: bundleMemberPriceSum(b),
          });
        }
        return applied;
      },
      bundleDiscount: () =>
        get().appliedBundles().reduce((sum, b) => sum + b.discount, 0),
    }),
    { name: "cippy-cart" }
  )
);
