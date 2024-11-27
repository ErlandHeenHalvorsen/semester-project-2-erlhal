import { getProfile } from "../../api/profile/getProfile.js";
import { getProfileListings } from "../../api/profile/profileListings.js";
import { getHighestBid } from "../../utils/getBids.js";
import { authGuard } from "../../utils/authGuard.js";

authGuard();

document.addEventListener("DOMContentLoaded", function () {
  async function renderProfileInfo() {
    const infoSection = document.querySelector("#userInfo");
    let profile = await getProfile();
    profile = profile.data;
    // console.log(profile);
    let html = `
    <div class="">
        <div class="flex bg-gray-400 items-center justify-between">
          <img
            class="ml-1 w-16 h-16 object-cover rounded-full border-2 border-gray-500 shadow-md"
            src="${profile.avatar.url}"
            alt="placeholder"
          />
          <div class="mr-1">
            <h2 class="font-bold first-letter:capitalize">${profile.name}</h2>
            <p>Coins: ${profile.credits}</p>
          </div>
        </div>
        <p class="p-2">
          ${profile.bio ? profile.bio : "This user has no bio..."}
        </p>
      </div>
    `;
    infoSection.innerHTML = html;
  }
  renderProfileInfo();

  async function renderProfileListings() {
    const listingSection = document.querySelector("#userListings");
    let listings = await getProfileListings();
    if (listings === 0) {
      listingSection.innerHTML = "<p>This user has no listings...</p>";
      return;
    }
    console.log(listings.map((listing) => listing));

    let html = "";
    html += listings.map((listing) => {
      let highestBid = "No bids yet";
      if (listing.bids.length > 0) {
        highestBid = getHighestBid(listing.bids);
      }
      return `
    <a href="/html/listings/singleListing.html?id=${listing.id}">
        <div
          class="w-[300px] h-[200px] bg-white flex flex-col justify-between rounded-t-md overflow-hidden shadow-sm relative"
        >
        ${
          listing.media && listing.media[0]
            ? `<img class="w-full h-full object-cover" src="${
                listing.media[0].url
              }" alt="${listing.media.alt ? listing.media.alt : ""}" />`
            : `<img class="w-full h-full object-cover" src="/src/media/Komplett_wallpaper_2022_3rdplace_preciousillusion_dark.jpg" alt="Random image" />`
        } 
          <p
            class="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-md"
          >
            ${highestBid}
          </p>
        </div>
        <div class="py-2 bg-white rounded-b-md text-center">
          <span>${listing.tags}</span>
          <h2 class="font-bold text-xl">${listing.title}</h2>
          <p>${listing.endsAt}</p>
        </div>
      </a>
    `;
    });
    listingSection.innerHTML = html;
  }
  renderProfileListings();

  const toggleEditProfile = document.querySelector("#toggle-update-profile");
  const formToToggle = document.querySelector("#hidden-form");
  const closeTag = document.querySelector("#close-tag");
  toggleEditProfile.addEventListener("click", function () {
    formToToggle.classList.toggle("hidden");
    toggleEditProfile.classList.add("hidden");
    if (!formToToggle.classList.contains("hidden")) {
      closeTag.addEventListener("click", function () {
        formToToggle.classList.add("hidden");
        toggleEditProfile.classList.remove("hidden");
      });
    }
  });
});
