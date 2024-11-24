export function setToken(token) {
  try {
    localStorage.setItem("token", token);

    setTimeout(() => {
      localStorage.removeItem("token");
      console.log("Token has been cleared after expiration time.");
    }, 7200000); // after 2 hours local storage is cleared.

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export function getToken() {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export function setUsername(username) {
  localStorage.setItem("username", username);
}

export function getUsername() {
  return localStorage.getItem("username");
}
