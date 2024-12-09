import { API_AUCTION_BASE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";

export async function bidOnListing(id, amount) {
  try {
    let response = await fetch(`${API_AUCTION_BASE}/${id}/bids`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `API Error: ${errorDetails.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data; // Sørg for at du returnerer riktig felt fra responsen
  } catch (error) {
    console.error("Error in bidOnListing:", error);
    throw error; // Kast alltid feilen videre
  }
}
