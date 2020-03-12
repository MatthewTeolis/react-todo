import { create } from "apisauce";

export const anonymousApi = create({
  baseURL: "http://localhost:5000"
});

export const authenticatedApi = create({
  baseURL: "http://localhost:5000"
});
