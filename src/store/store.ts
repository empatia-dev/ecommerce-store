import { create } from 'zustand'
import type { Product } from '../types/Product';

export type CartItem = {
  product: Product;
  quantity: number;
}

export type Order = {
  cartItems: CartItem[];
  id: string;
  purchaseDate: Date;
}

type CartStore = {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  checkoutTotal: () => number;
  addToOrders: (orders: Order) => void;
  clearOrders: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart-items") || "[]"),

  orders: JSON.parse(localStorage.getItem("store-orders") || "[]"),

  addToCart: (item) =>
      set((state) => {
        const existing = state.items.find((i) => i.product.id === item.product.id);
        const updatedItems = existing
          ? state.items.map((i) =>
              i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.items, { ...item, quantity: 1 }];

        localStorage.setItem("cart-items", JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),

  removeFromCart: (id) =>
    set((state) => {
      const updated = state.items.filter((item) => item.product.id !== id);
      localStorage.setItem("cart-items", JSON.stringify(updated));
      return { items: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("cart-items");
    set({ items: [] });
  },

  updateQuantity: (id, quantity) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item);
      localStorage.setItem("cart-items", JSON.stringify(updated));
      return { items: updated };
    }),

    checkoutTotal: () => {
    return get().items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);
    },

    addToOrders: (order) =>
      set((state) => {
        const existing = state.orders.find((i) => i.id === order.id);
        const updatedOrders = existing
          ? state.orders
          : [...state.orders, order];
          localStorage.setItem("store-orders", JSON.stringify(updatedOrders));
        return { orders: updatedOrders };
      }),

    clearOrders: () => {
      localStorage.removeItem("store-orders");
      set({ orders: [] });
    },

 
}));