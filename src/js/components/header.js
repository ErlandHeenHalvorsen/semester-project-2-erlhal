import { logout } from "../utils/logout.js";
import { getToken } from "../utils/storage.js";

export default class NavBar extends HTMLElement {
  constructor() {
    super();
    this.classList.add("block");
  }

  connectedCallback() {
    this.render();
    this.listeners();
  }

  listeners() {
    const mobileMenu = this.querySelector("#navigation-mobile");
    const barIcon = this.querySelector("#bar-icon");

    this.addEventListener("click", (e) => {
      if (e.target.id === "logout-btn") {
        logout();
        window.location.reload();
      }
    });
    this.addEventListener("click", (e) => {
      if (e.target.id === "bar-icon") {
        mobileMenu.classList.toggle("hidden");
        barIcon.classList.toggle("rotate-90");
      }
    });
  }

  render() {
    const token = getToken();

    // Dynamiske lenker for navigasjon basert på om token finnes
    const profileLink = token
      ? "/html/profile/userProfile.html"
      : "/html/auth/login.html";
    const loginLink = token
      ? ""
      : `<a href="/html/auth/login.html" class="hover:underline transition duration-200">Login</a>`;
    const registerLink = token
      ? ""
      : `<a href="/html/auth/register.html" class="hover:underline transition duration-200">Register</a>`;
    const logoutButton = token
      ? `<button id="logout-btn" class="cta-custom">Logout</button>`
      : "";

    this.innerHTML = `
      <header>
        <div class="header-custom">
          <div class="items-center space-x-2">
            <a href="/index.html">
              <img class="w-24 hover:scale-110 transition duration-200" src="/src/media/auctionBear_cropped_no_bg.png" alt="Auction Bear" />
            </a>
          </div>
          <!-- Desktop Navigation -->
          <div class="desk-nav-custom">
            <!-- Navigation Links -->
            <nav class="flex space-x-6">
              <a href="${profileLink}" class="hover:underline transition duration-200">Profile</a>
              ${loginLink} <!-- Only show if no token -->
              ${registerLink} <!-- Only show if no token -->
            </nav>
          </div>
          <!-- Logout Button (only shown if token exists) -->
          <div class="hidden md:flex">
            ${logoutButton}
          </div>
          <!-- Mobile Button -->
          <div id="mobile-dropdown-bars" class="md:hidden flex items-center cursor-pointer">
            <i id="bar-icon" class="fa-solid fa-bars fa-xl transition-all duration-300"></i>
          </div>
        </div>
        <!-- Navigation for Mobile-->
        <div id="navigation-mobile" class="hidden md:hidden p-4 bg-secondary border-b border-accent">
          <nav class="flex flex-col text-center space-y-4">
            <a href="/index.html" class="text-lg font-semibold text-gray-800 transition duration-200">Home</a>
            <a href="${profileLink}" class="text-lg font-semibold text-gray-800 transition duration-200">Profile</a>
            ${loginLink} <!-- Only show if no token -->
            ${registerLink} <!-- Only show if no token -->
          </nav>
          ${logoutButton} <!-- Only shown if token exists -->
        </div>
      </header>
    `;
  }
}
