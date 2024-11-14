import { getRegisterUser } from "../../api/auth/register.js";

const submitBtn = document.querySelector("#register-btn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#username-input").value;
  const email = document.querySelector("#email-input").value;
  const password = document.querySelector("#password-input").value;
  try {
    const newUser = await getRegisterUser({ name, email, password });
    if (newUser) {
      console.log("User registered successfully:", newUser);
      //window.location.href = "/login";
    }
  } catch (error) {
    console.error(error);
  }
  console.log(name, email, password);
});
