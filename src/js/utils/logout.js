export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  if (localStorage.getItem("token") === null) {
    console.log("Logged out");
    window.location.href = "/html/auth/login.html";
  }
}
