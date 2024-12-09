import { getToken } from "../utils/storage.js";
export default class FooterNav extends HTMLElement {
  constructor() {
    super();
    this.classList.add("block");
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const token = getToken();
    const profileLink = token
      ? "/html/profile/userProfile.html"
      : "/html/auth/login.html";
    const createListingLink = token
      ? "/html/listings/createListing.html"
      : "/html/auth/login.html";

    this.innerHTML = `
    <footer
      class="md:hidden flex bg-opacity-85 bg-secondary  border-t-2 border-opacity-40 border-accent w-full"
    >
      <div class="flex mx-8 p-2 justify-between items-center w-full gap-x-4">
        <a href="/index.html" class="p-2">
          <i class="fa-solid fa-house fa-2xl"></i>
        </a>
        <a href="${createListingLink}" class="p-2">
          <i class="fa-solid fa-circle-plus fa-2xl"></i>
        </a>
        <a href="${profileLink}" class="p-2">
          <i class="fa-solid fa-user-tie fa-2xl"></i>
        </a>
      </div>
    </footer>
    `;
  }
}
