import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getUsername } from "../../utils/storage.js";
import { getHeaders } from "../../utils/headers.js";

export async function getCredits() {
  const username = getUsername();
  // console.log("Username:", username); // Logger brukernavnet

  try {
    const url = `${API_GET_PROFILE}/${username}/credits`;
    // console.log("Fetching credits from URL:", url);

    let response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    // console.log("Raw response:", response);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error fetching credits:", errorDetails);
      throw new Error(
        errorDetails.message ||
          `Failed to fetch credits: ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("Credits Data:", data);
    return data.data.credits; // Returner kun verdien av credits
  } catch (error) {
    console.error("Error in getCredits:", error);
  }
}
