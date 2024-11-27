const toggleMenu = document.querySelector("#mobile-dropdown-bars");
const mobileMenu = document.querySelector("#navigation-mobile");
const barIcon = document.querySelector("#bar-icon");

export function dropDown() {
  toggleMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    barIcon.classList.toggle("rotate-90");
  });
}
