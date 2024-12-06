import { getProfile } from "../../api/profile/getProfile.js";
import { getProfileListings } from "../../api/profile/profileListings.js";
import { getHighestBid } from "../../utils/getBids.js";
import { authGuard } from "../../utils/authGuard.js";
import NavBar from "../../components/header.js";
import { updateProfile } from "../../api/profile/updateProfile.js";

customElements.define("nav-bar", NavBar);

authGuard();

document.addEventListener("DOMContentLoaded", function () {
  async function renderProfileInfo() {
    const infoSection = document.querySelector("#userInfo");
    let profile = await getProfile();
    profile = profile.data;
    // console.log(profile);
    let html = `
      <div class="bg-ctaPositive text-white">
        <div class="flex items-center justify-between">
          <img
            class="ml-8  w-16 h-16 object-cover rounded-full border-2 border-accent shadow-md"
            src="${profile.avatar.url}"
            alt="placeholder"
          />
          <div class="mr-1 text-cta">
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
    html += listings
      .map((listing) => {
        let highestBid = "No bids yet";
        if (listing.bids.length > 0) {
          highestBid = getHighestBid(listing.bids);
        }
        return `
    <a href="/html/listings/singleListing.html?id=${listing.id}">
        <div
          class="w-[300px] h-[200px] flex flex-col justify-between rounded-t-md overflow-hidden shadow-sm relative"
        >
        ${
          listing.media && listing.media[0]
            ? `<img class="w-full h-full object-cover" src="${
                listing.media[0].url
              }" alt="${listing.media.alt ? listing.media.alt : ""}" />`
            : `<img class="w-full h-full object-cover" src="/src/media/Komplett_wallpaper_2022_3rdplace_preciousillusion_dark.jpg" alt="Random image" />`
        } 
          <p
            class="absolute bottom-4 left-4 font-bold text-black bg-primary bg-opacity-50 p-2 rounded-md"
          >
            ${highestBid}
          </p>
        </div>
        <div class="py-2 bg-secondary rounded-b-md text-center shadow-sm hover:shadow-md transition-all">
          <span>${listing.tags}</span>
          <h2 class="font-bold text-xl">${listing.title}</h2>
          <p>${listing.endsAt}</p>
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
