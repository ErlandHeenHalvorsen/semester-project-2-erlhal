import { getHeaders } from "../../utils/headers.js";
import { API_AUTH_REGISTER } from "../../utils/constanst.js";

export async function getRegisterUser({ name, email, password }) {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  try {
    let response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    return response.data;
  } catch (error) {
    console.error(`Response status: ${error.status}: ${error.statusText} `);
  }
}
