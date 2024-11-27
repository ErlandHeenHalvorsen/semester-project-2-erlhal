import { logout } from "../utils/logout.js";
import { dropDown } from "../utils/dropDown.js";

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
    const toggleMenu = this.querySelector("#mobile-dropdown-bars");
    const mobileMenu = this.querySelector("#navigation-mobile");
    const barIcon = this.querySelector("#bar-icon");

    this.addEventListener("click", (e) => {
      if (e.target.id === "logout-btn") {
        logout();
        window.location.reload();
      } else if (e.target.id === "mobile-dropdown-bars") {
        mobileMenu.classList.toggle("hidden");
        barIcon.classList.toggle("rotate-90");
      }
    });
  }
  render() {
    this.innerHTML = `
        <header class="bg-gray-400 shadow-xl">
      <div class="flex items-center justify-between bg-gray-400 p-4 shadow-xl">
        <div class="items-center space-x-2">
          <img
            class="w-24 hover:scale-110 transition duration-200"
            src="/src/media/auctionBear_cropped_no_bg.png"
            alt="Auction Bear"
          />
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">
          <!-- Navigation Links -->
          <nav class="flex space-x-6">
            <a
              href="/html/profile/userProfile.html"
              class="hover:text-yellow-400 transition duration-200"
              >Profile</a
            >
            <a
              href="/html/auth/login.html"
              class="hover:text-yellow-400 transition duration-200"
              >Login</a
            >
            <a
              href="/html/auth/register.html"
              class="hover:text-yellow-400 transition duration-200"
              >Register</a
            >
          </nav>
        </div>
        <!-- Logout Button -->
        <div class="hidden md:flex">
          <button
            id="logout-btn"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
        <!-- Mobile Button -->
        <div
          id="mobile-dropdown-bars"
          class="md:hidden flex items-center cursor-pointer"
        >
          <i
            id="bar-icon"
            class="fa-solid fa-bars fa-xl transition-all duration-300"
          ></i>
        </div>
      </div>
      <!-- Navigation for Mobile-->
      <div
        id="navigation-mobile"
        class="hidden md:hidden p-4 bg-gray-400 border-b border-gray-300 shadow-lg"
      >
        <nav class="flex flex-col text-center space-y-4">
          <a
            href=""
            class="text-lg font-semibold text-gray-800 transition duration-200"
          >
            Erland
          </a>
          <a
            href=""
            class="text-lg font-semibold text-gray-800 transition duration-200"
          >
            Petrine
          </a>
          <a
            href=""
            class="text-lg font-semibold text-gray-800 transition duration-200"
          >
            Christer
          </a>
          <a
            href=""
            class="text-lg font-semibold text-gray-800 transition duration-200"
          >
            Juleglede
          </a>
        </nav>
      </div>
    </header>
    `;
  }
}
