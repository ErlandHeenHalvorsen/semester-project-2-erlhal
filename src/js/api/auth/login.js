import { API_AUTH_LOGIN } from "../constanst.js";
import { getHeaders } from "../headers.js";
import { setToken } from "../utils/storage.js";
// import { setUserData } from "../utils/storage.js";

export async function getLogin(email, password) {
  const body = {
    email: email,
    password: password,
  };
  try {
    let response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    const data = response.data;
    console.log(data);
    setToken(data.accessToken);

    // setUserData(data.name, data.email, data.avatar.url);

    return data;
  } catch (error) {
    console.error(`Response status: ${error.status}: ${error.statusText} `);
  }
}
