export const API_KEY = "5374c292-0340-4886-8ab1-a4be580b69c6";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUCTION_BASE = `${API_BASE}/auction/listings`;
export const API_ALL_LISTINGS = `${API_BASE}/auction/listings?limit=22&_seller=true&_bids=true`;
export const API_SINGLE_LISTING = `${API_ALL_LISTINGS}/<id>`;
