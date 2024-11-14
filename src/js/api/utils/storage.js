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
/*
export function setUserData(username, email, avatarUrl) {
  const userData = {
    username: username,
    email: email,
    avatarUrl: avatarUrl,
  };
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error(error);
  }
}
 */
