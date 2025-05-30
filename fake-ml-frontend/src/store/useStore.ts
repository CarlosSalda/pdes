// src/store/useStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductListItem {
  id: string;
  price?: number;
  data_created: string;
  catalog_product_id: string;
  pdp_types: string[];
  status: string;
  domain_id: string;
  setting: Record<string, unknown>;
  name: string;
  main_features: string[];
  attributes: Record<string, unknown>[];
  pictures: {
    id: string;
    url: string;
  }[];
  parent_id: string;
  chlidren_ids: string[];
  quality_type: string;
  priority: string;
  type: string;
  variations: Record<string, unknown>[];
  site_id: string;
  keywords: string;
  description: string;
}
export interface Paging {
  total: number;
  limit: number;
  offset: number;
}

export interface ProductList {
  paging: Paging;
  results: ProductListItem[];
}

interface Store {
  user: User | null;
  cart: CartItem[];
  token: string | null;
  productsList: ProductList | null;
  setToken: (token: string | null) => void;
  setProductsList: (productsList: ProductList) => void;
  getToken: () => string | null;
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
}

// definimos el store, incluyendo `get`
export const useStore = create<Store>((set, get) => ({
  user: null,
  cart: [],
  token: Cookies.get("token") ?? null,
  productsList: null,
  setToken: (token: string | null) => set({ token }),
  getToken: () => get().token,
  setProductsList: (productsList: ProductList) => set({ productsList }),
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
}));
