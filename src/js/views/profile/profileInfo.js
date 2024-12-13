import { getProfile } from "../../api/profile/getProfile.js";
import { getProfileListings } from "../../api/profile/profileListings.js";
import { getHighestBid } from "../../utils/getBids.js";
import { authGuard } from "../../utils/authGuard.js";
import NavBar from "../../components/header.js";
import { updateProfile } from "../../api/profile/updateProfile.js";
import FooterNav from "../../components/footerNav.js";

customElements.define("footer-nav", FooterNav);
customElements.define("nav-bar", NavBar);

authGuard();

document.addEventListener("DOMContentLoaded", function () {
  async function renderProfileInfo() {
    const infoSection = document.querySelector("#userInfo");
    let profile = await getProfile();
    profile = profile.data;
    // console.log(profile);
    let html = `
      <div class="bg-[#f5f5f5] text-[#333] rounded-lg shadow p-4">
        <div class="flex items-center">
          <img
            class="w-12 h-12 object-cover rounded-full mr-4"
            src="${profile.avatar.url}"
            alt="User Avatar"
          />
            <div>
              <h2 class="font-semibold text-lg">${profile.name}</h2>
              <p class="text-sm">Coins: ${profile.credits}</p>
            </div>
          </div>
          <p class="mt-4 text-sm">
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
    html += listings
      .map((listing) => {
        let highestBid = "No bids yet";
        if (listing.bids.length > 0) {
          highestBid = getHighestBid(listing.bids);
        }
        return `
    <a class="rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-150" href="/html/listings/singleListing.html?id=${
      listing.id
    }">
    <div
      class="w-[300px] h-[200px] bg-white flex flex-col justify-between rounded-t-md overflow-hidden relative"
    >
      ${
        listing.media && listing.media[0]
          ? `<img class="w-full h-full object-cover" src="${
              listing.media[0].url
            }" alt="${listing.media.alt ? listing.media.alt : ""}" />`
          : `<img class="w-full h-full object-cover" src="/src/media/basic_placeholder.png" alt="Default image" />`
      }
      <div 
        class="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm"
      >
        ${highestBid}
      </div>
    </div>
    <div class="max-w-[300px] py-4 px-3 bg-[#f3f3f3] rounded-b-md text-center">
      <h2 class="font-bold text-lg truncate text-[#333]">${listing.title}</h2>
      <p class="text-sm text-gray-500">${listing.endsAt}</p>
    </div>
  </a>
`;
      })
      .join("");
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

async function updateProfileInfo() {
  const avatarUrl = document.querySelector("#update-avatar")?.value || "";
  const bio = document.querySelector("#update-description")?.value;

  // Konstruer oppdateringsobjektet riktig
  const update = {
    avatar: avatarUrl ? { url: avatarUrl, alt: "" } : null,
    bio,
    //banner: { url: "", alt: "" || null },
  };
  console.log("Update payload:", update); // Legg til denne for debugging
  try {
    const updateProfileResponse = await updateProfile(update);
    console.log("API Response:", updateProfileResponse);
    if (!updateProfileResponse) {
      throw new Error("Failed to update profile, please check img url");
    }
    alert("Profile updated successfully!");
    location.reload();
  } catch (error) {
    console.error("Failed to update profile:", error.message);
    alert(`Error updating profile: ${error.message}`);
  }
}
//updateProfileInfo();
document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.updateForm;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateProfileInfo();
  });
});
