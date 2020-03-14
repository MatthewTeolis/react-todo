import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:5000"
});

const authApi = create({
  baseURL: "http://localhost:5000",
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

  getCategories: () => authApi.get("/categories")
};
