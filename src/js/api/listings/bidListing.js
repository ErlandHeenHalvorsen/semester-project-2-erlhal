import { API_AUCTION_BASE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";

export async function bidOnListing(id, amount) {
  try {
    let response = await fetch(`${API_AUCTION_BASE}/${id}/bids`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        amount: amount,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json(); // Parse the error response
      console.error("API Error Details:", errorDetails);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    response = await response.json();
    let res = response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}
