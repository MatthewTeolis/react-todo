import { create } from "apisauce";

const backendHost = process.env.BACKEND_HOST || "localhost";

const api = create({
  baseURL: `http://${backendHost}:5000`
});

const authApi = create({
  baseURL: `http://${backendHost}:5000`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const Api = {
  updateToken: token => {
    authApi.setHeader("Authorization", `Bearer ${token}`);
  },

  register: (email, password, firstName, lastName) =>
    api.post("/authentication/register", { email, password, firstName, lastName }),

  login: (email, password) => api.post("/authentication/login", { email, password }),

  getCategories: () => authApi.get("/categories"),

  createCategory: name => authApi.post("/categories", { name }),

  deleteCategory: id => authApi.delete(`/categories/${id}`),

  updateList: (id, title, data, category_id) =>
    authApi.put(`/lists/${id}`, { title, category_id, data: JSON.stringify(data) }),

  createNewList: (category_id, title, data) =>
    authApi.post(`/lists`, { category_id, title, data: JSON.stringify(data) }),

  deleteList: id => authApi.delete(`/lists/${id}`)
};
