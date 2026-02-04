import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const API = axios.create({
  baseURL,
});

// Products API
export const productService = {
  getAll: (params?: any) => API.get("/products", { params }),
  getById: (id: number) => API.get(`/products/${id}`),
  create: (data: any) => API.post("/products", data),
  update: (id: number, data: any) => API.put(`/products/${id}`, data),
  delete: (id: number) => API.delete(`/products/${id}`),
};

// Cart API
export const cartService = {
  get: () => API.get("/cart"),
  add: (data: any) => API.post("/cart", data),
  update: (id: number, data: any) => API.put(`/cart/${id}`, data),
  remove: (id: number) => API.delete(`/cart/${id}`),
  clear: () => API.delete("/cart"),
};

// Orders API
export const orderService = {
  getAll: () => API.get("/orders"),
  getById: (id: number) => API.get(`/orders/${id}`),
  create: (data: any) => API.post("/orders", data),
  updateStatus: (id: number, status: string) =>
    API.put(`/orders/${id}/status`, { status }),
};

// Reviews API
export const reviewService = {
  getByProduct: (productId: number) => API.get(`/reviews/${productId}`),
  create: (data: any) => API.post("/reviews", data),
  delete: (id: number) => API.delete(`/reviews/${id}`),
};

export default API;
