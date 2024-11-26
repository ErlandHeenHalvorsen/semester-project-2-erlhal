import { getListings } from "../api/listings/getListings.js";
import { getHighestBid } from "../utils/getBids.js";
import FooterBar from "../components/header.js";

customElements.define("footer-bar", FooterBar);

async function renderListings() {
  const listings = await getListings(22, 1);

  console.log(listings);

  //if (listings.)

  const listingsContainer = document.querySelector("#listings");
  let html = "";
  listings.map((listing) => {
    let highestBid = "No bids yet";
    if (listing.bids.length > 0) {
      highestBid = getHighestBid(listing.bids);
    }

    //console.log(listing);
    html += `
    <a class="shadow-sm hover:shadow-md" href="/html/listings/singleListing.html?id=${
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
  listingsContainer.innerHTML = html;
}
renderListings();
