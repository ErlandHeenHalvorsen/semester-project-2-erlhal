import { API_AUCTION_BASE } from "../../utils/constanst.js";
export async function searchListings(query) {
  try {
    let response = await fetch(
      `${API_AUCTION_BASE}/search?q=${query}&_bids=true`
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    let data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
