import { getLogin } from "../../api/auth/login.js";
import { setUsername } from "../../utils/storage.js";
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  try {
    const loginUser = await getLogin(email, password);
    if (loginUser) {
      setUsername(loginUser.name);
      console.log("User logged in successfully:", loginUser);
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
  }
});
