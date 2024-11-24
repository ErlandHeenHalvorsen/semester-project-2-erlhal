import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";
import { getUsername } from "../../utils/storage.js";

export async function getProfile() {
  const username = getUsername();
  try {
    const response = await fetch(`${API_GET_PROFILE}/${username}`, {
      method: "GET",
      headers: getHeaders(),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.message);
    }
    let res = await response.json();
  } catch (error) {
    console.error(`Response status: ${error.status}: ${error.statusText} `);
  }
}
getProfile();
