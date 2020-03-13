import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:5000"
});

export const Api = {
  register: (email, password, firstName, lastName) =>
    api.post("/authentication/register", { email, password, firstName, lastName }),

  login: (email, password) => api.post("/authentication/login", { email, password })
};
