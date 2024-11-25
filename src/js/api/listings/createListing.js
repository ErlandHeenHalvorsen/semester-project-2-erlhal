import { API_AUCTION_BASE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";

export async function newPost(createBody) {
  try {
    const response = await fetch(`${API_AUCTION_BASE}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(createBody),
    });

    // Check for a non-2xx status
    if (!response.ok) {
      const errorDetails = await response.json(); // Parse the error response
      console.error("API Error Details:", errorDetails);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the successful response
    const result = await response.json();
    return result; // Assuming the API returns the listing directly
  } catch (error) {
    console.error("Error in newPost:", error.message);
    throw error; // Rethrow to handle higher up in the chain
  }
}
