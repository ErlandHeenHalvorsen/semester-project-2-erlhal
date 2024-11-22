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
    let data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getListingFromId(id) {
  try {
    let response = await fetch(
      `${API_AUCTION_BASE}/${id}?_seller=true&_bids=true`
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    let singleListing = response.data;
    return singleListing;
  } catch (error) {
    console.error(error.message);
  }
}
