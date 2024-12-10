import { getListingFromId } from "../../api/listings/getListings.js";
import { bidOnListing } from "../../api/listings/bidListing.js";
import { getCredits } from "../../api/profile/getCredits.js";
import NavBar from "../../components/header.js";
import Carousell from "../../components/carousell.js";
import FooterNav from "../../components/footerNav.js";

customElements.define("footer-nav", FooterNav);
customElements.define("nav-bar", NavBar);
customElements.define("image-carousel", Carousell);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function renderListingFromId() {
  const listingSection = document.querySelector("#listing-from-id");
  const listing = await getListingFromId(id);
  console.log(listing);

  // Generate Bids Table
  let bidRows = "";
  if (listing.bids.length > 0) {
    listing.bids.map((bidder) => {
      bidRows += `
        <tr>
          <td class="border border-gray-200 px-2 py-2">${bidder.bidder.name}</td>
          <td class="border border-gray-200 px-2 py-2">${bidder.amount}</td>
          <td class="border border-gray-200 px-2 py-2">${bidder.created}</td>
        </tr>
      `;
    });
  }

  let html = `
    <div class="flex flex-col p-6 mx-4 my-6 border border-1 border-gray-200 rounded-lg shadow-md">
        <!-- Image Carousel -->
        <image-carousel listing-id="${id}"></image-carousel>

        <!-- Product Details -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">${listing.title}</h1>
          <p class="text-gray-600 mb-4">
            ${listing.description}
          </p>
          <p class="mb-4 first-letter:capitalize">Seller: ${listing.seller.name}</p>
          <p class="text-gray-700">
            <strong>Ends At:</strong> ${listing.endsAt}
          </p>
        </div>
        <!-- Call to Action -->
        <div>
          <form name="bid-form" id="bid-form">
            <select name="bid-amount">
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Place Bid</button>
          </form>
        </div>

        <!-- Bids Table -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Bid History</h2>
          <table class="w-full border border-gray-200 text-left text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-200 px-2 py-2">Bidder</th>
                <th class="border border-gray-200 px-2 py-2">Amount</th>
                <th class="border border-gray-200 px-2 py-2">Time</th>
              </tr>
            </thead>
             <tbody>
              ${bidRows}
            </tbody> 
          </table>
        </div>
      </div>
  `;

  listingSection.innerHTML = html;

  document.querySelector("#bid-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bidAmount = Number(formData.get("bid-amount"));
    // console.log(`Bid Amount Entered: ${bidAmount}`);

    try {
      const credits = await getCredits();
      // console.log(`Fetched Credits: ${credits}`);

      if (!credits || isNaN(credits)) {
        alert("Unable to fetch your credits. Please try again later.");
        return;
      }

      const result = await bidOnListing(id, bidAmount);
      console.log("Bid result:", result);
      alert("Bid placed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(
        `An error occurred while placing your bid. Please try again later: --${error.message}`
      );
    }
  });
}

renderListingFromId();
