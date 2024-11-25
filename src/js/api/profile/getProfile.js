import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";
import { getUsername } from "../../utils/storage.js";
const username = getUsername();

export async function getProfile() {
  try {
    const response = await fetch(`${API_GET_PROFILE}/${username}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(response.message);
    }
    let res = await response.json();
    return res;
  } catch (error) {
    console.error(`Response status: ${error.status}: ${error.statusText} `);
  }
}

