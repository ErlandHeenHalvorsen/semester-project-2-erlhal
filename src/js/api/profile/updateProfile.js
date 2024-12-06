import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getUsername } from "../../utils/storage.js";
import { getHeaders } from "../../utils/headers.js";

export async function updateProfile(update) {
  const username = getUsername();
  try {
    console.log("Payload before sending:", JSON.stringify(update)); // Debug her
    let response = await fetch(`${API_GET_PROFILE}/${username}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(response.status + " " + response.statusText);
    }
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}
