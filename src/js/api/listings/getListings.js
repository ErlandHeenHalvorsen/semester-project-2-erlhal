import { API_ALL_LISTINGS } from "../../utils/constanst.js";
import { API_AUCTION_BASE } from "../../utils/constanst.js";

export async function getListings(limit = 22, page = 1) {
  try {
    let response = await fetch(
      `${API_AUCTION_BASE}?limit=${limit}&page=${page}&_bids=true&_active=true`
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}
