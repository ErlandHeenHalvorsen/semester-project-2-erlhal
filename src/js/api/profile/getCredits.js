import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getUsername } from "../../utils/storage.js";
import { getHeaders } from "../../utils/headers.js";

export async function getCredits() {
  const username = getUsername();
  try {
    let response = await fetch(`${API_GET_PROFILE}/${username}/credits`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    let res = response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}
