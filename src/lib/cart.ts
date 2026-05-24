import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
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
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: "cippy-cart" }
  )
);
