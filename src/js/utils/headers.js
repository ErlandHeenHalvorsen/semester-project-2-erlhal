import { API_KEY } from "./constanst.js";

export function getHeaders() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (API_KEY) {
    headers.append("X-Noroff-Api-Key", API_KEY);
  }
  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return headers;
}
