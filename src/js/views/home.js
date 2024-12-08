import { getListings } from "../api/listings/getListings.js";
import { getHighestBid } from "../utils/getBids.js";
import { searchListings } from "../api/listings/searchListings.js";
import NavBar from "../components/header.js";
import FooterNav from "../components/footerNav.js";

customElements.define("footer-nav", FooterNav);
customElements.define("nav-bar", NavBar);

async function renderListings(listings) {
  const listingsContainer = document.querySelector("#listings");
  let html = "";

  if (listings.length === 0) {
    html = `<p class="text-center text-gray-600">No listings found. Try a different search term!</p>`;
  } else {
    listings.map((listing) => {
      let highestBid = "No bids yet";
      if (Array.isArray(listing.bids) && listing.bids.length > 0) {
        highestBid = getHighestBid(listing.bids);
      }

      html += `
        <a class="border-2 border-accent border-opacity-40 rounded-lg shadow-sm hover:shadow-md transition-all ease-in-out duration-150" href="/html/listings/singleListing.html?id=${
          listing.id
        }">
          <div
            class="w-[300px] h-[200px] bg-white  flex flex-col justify-between rounded-t-md overflow-hidden relative"
          >
          ${
            listing.media && listing.media[0]
              ? `<img class="w-full h-full object-cover" src="${
                  listing.media[0].url
                }" alt="${listing.media.alt ? listing.media.alt : ""}" />`
              : `<img class="w-full h-full object-cover" src="/src/media/Komplett_wallpaper_2022_3rdplace_preciousillusion_dark.jpg" alt="Random image" />`
          } 
            <p 
              class="absolute bottom-4 left-4 font-bold text-black bg-primary bg-opacity-40 p-2 rounded-md"
            >
              ${highestBid}
            </p>
          </div>
          <div class="max-w-[300px] py-2 px-1 bg-secondary rounded-b-md text-center transition-all">
            <span>${listing.tags}</span>
            <h2 class="font-bold text-xl truncate">${listing.title}</h2>
            <p>${listing.endsAt}</p>
          </div>
        </a>
      `;
    });
  }

  listingsContainer.innerHTML = html;
}

async function loadDefaultListings() {
  const defaultListings = await getListings(20, 1); // Last inn standardlistinger
  renderListings(defaultListings); // Gjør standardlistinger synlige
}

async function search() {
  const searchInput = document.querySelector("#search");
  const searchButton = document.querySelector("#searchButton");

  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim(); // Hent og trim inputverdien
    if (query) {
      console.log("Searching for:", query);
      const searchResults = await searchListings(query); // Søk med API
      renderListings(searchResults); // Vis søkeresultater
      console.log(searchResults);
    } else {
      console.log("Please enter a search term.");
      loadDefaultListings(); // Hvis søkefeltet er tomt, last standardlistinger
    }
  });
}

// Kjør initialisering
loadDefaultListings();
search();

/* const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", logout);
dropDown(); */
