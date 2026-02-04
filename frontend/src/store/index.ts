import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: Product;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartStore {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: { items: [], total: 0 },
  addToCart: (item) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: [...state.cart.items, item],
      },
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item.id !== id),
      },
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      },
    })),
  clearCart: () => set({ cart: { items: [], total: 0 } }),
  getTotalPrice: () => {
    const { cart } = get();
    return cart.items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0,
    );
  },
}));

interface AuthStore {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
