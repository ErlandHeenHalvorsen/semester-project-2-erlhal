import { getListings } from "../api/listings/getListings.js";

async function renderListings() {
  const listings = await getListings(22, 1);
  console.log(listings);
  const listingsContainer = document.querySelector("#listings");
  if (listings === 0) {
    listingsContainer.innerHTML = `<h2>No listings available</h2>`;
  }
  let html = "";
  listings.map((listing) => {
    html += `
    <a href="/listings/singleListing.html?id=${listing.id}">
        <div
          class="w-[300px] h-[200px] bg-white flex flex-col justify-between rounded-t-md overflow-hidden shadow-sm relative"
        >
        ${
          listing.media && listing.media[0].url
            ? `<img class="w-full h-full object-cover" src="${
                listing.media[0].url
              }" alt="${listing.media.alt ? listing.media.alt : ""}" />`
            : `<img class="w-full h-full object-cover" src="/src/media/Komplett_wallpaper_2022_3rdplace_preciousillusion_dark.jpg" alt="Random image" />`
        } 
          <p
            class="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-md"
          >
            $200
          </p>
        </div>
        <div class="py-2 bg-white rounded-b-md text-center">
          <span>Tags</span>
          <h2 class="font-bold text-xl">${listing.title}</h2>
        </div>
      </a>
    `;
  });
  listingsContainer.innerHTML = html;
}
renderListings();
