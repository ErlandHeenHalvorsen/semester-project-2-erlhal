import { API_GET_PROFILE } from "../../utils/constanst.js";
import { getHeaders } from "../../utils/headers.js";
import { getUsername } from "../../utils/storage.js";
const username = getUsername();

export async function getProfileListings(limit = 22, page = 1) {
  try {
    let response = await fetch(
      `${API_GET_PROFILE}/${username}/listings?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_bids=true`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    response = await response.json();
    let res = response.data;
    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}
