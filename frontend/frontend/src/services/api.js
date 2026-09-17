import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const luckyNumberService = {
  list: (product = null) =>
    api
      .get("/api/lucky-numbers", {
        params: product ? { product } : {},
      })
      .then((res) => res.data),

  get: (id) => api.get(`/api/lucky-numbers/${id}`).then((res) => res.data),

  create: (payload) =>
    api.post("/api/lucky-numbers", payload).then((res) => res.data),

  update: (id, payload) =>
    api.put(`/api/lucky-numbers/${id}`, payload).then((res) => res.data),

  remove: (id) => api.delete(`/api/lucky-numbers/${id}`),
};

export default api;
