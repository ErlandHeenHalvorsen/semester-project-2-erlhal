import { getProfile } from "../../api/profile/getProfile.js";
import { getProfileListings } from "../../api/profile/getProfile.js";

async function renderProfileInfo() {
  const infoSection = document.querySelector("#userInfo");
  let profile = await getProfile();
  profile = profile.data;
  console.log(profile);
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
getProfileListings();
