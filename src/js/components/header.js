import { logout } from "../utils/logout.js";
import { getToken } from "../utils/storage.js";

export default class NavBar extends HTMLElement {
  constructor() {
    super();
    this.classList.add("block");
    this.isLoggedIn = getToken() ? true : false;
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
  loggedInMenu() {
    return `
    <nav class="flex space-x-6">
      <a href="/html/profile/userProfile.html" class="font-semibold text-accent2 hover:underline transition duration-200">Profile</a>
      <a href="/html/listings/createListing.html" class="font-semibold text-accent2 hover:underline transition duration-200">Create Listing</a>
    </nav>
    `;
  }
  loggedOutMenu() {
    return `
    <nav class="flex space-x-6">
      <a href="/html/auth/login.html" class="font-semibold text-accent2 hover:underline transition-all duration-200">Login</a>
      <a href="/html/auth/register.html" class="font-semibold text-accent2 hover:underline transition-all duration-200">Register</a>
    </nav>
    `;
  }

  render() {
    const token = getToken();

    // Dynamiske lenker for navigasjon basert på om token finnes
    const profileLink = token
      ? "/html/profile/userProfile.html"
      : "/html/auth/login.html";
    const loginLink = token
      ? ""
      : `<a href="/html/auth/login.html" class="font-semibold text-accent2 hover:underline transition duration-200">Login</a>`;
    const registerLink = token
      ? ""
      : `<a href="/html/auth/register.html" class="font-semibold text-accent2 hover:underline transition duration-200">Register</a>`;
    const logoutButton = token
      ? `<button id="logout-btn" class="cta-custom">Logout</button>`
      : "";

    this.innerHTML = `
      <header>
    <div class="header-custom bg-secondary" style="color: #333" >
      <div class="items-center space-x-2">
        <a href="/index.html">
          <img class="w-24 hover:scale-110 transition duration-200" src="/src/media/auctionBear_cropped_no_bg.png" alt="Auction Bear" />
        </a>
      </div>
      <!-- Desktop Navigation -->
      <div class="desk-nav-custom">
        <!-- Navigation Links -->
        ${this.isLoggedIn ? this.loggedInMenu() : this.loggedOutMenu()}
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
    <div id="navigation-mobile" class="hidden md:hidden p-4 bg-secondary border-accent">
      <nav class="flex flex-col text-center space-y-4">
        <a href="/index.html" class="text-lg font-semibold text-accent2 transition duration-200" >Home</a>
        <a href="${profileLink}" class="text-lg font-semibold text-accent2 transition duration-200">Profile</a>
        ${loginLink} <!-- Only show if no token -->
        ${registerLink} <!-- Only show if no token -->
      </nav>
      ${logoutButton} <!-- Only shown if token exists -->
    </div>
  </header>
    `;
  }
}
