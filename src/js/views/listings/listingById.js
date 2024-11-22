import { getListingFromId } from "../../api/listings/getListings.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function renderListingFromId() {
  const listingSection = document.querySelector("#listing-from-id");
  const listing = await getListingFromId(id);
  console.log(listing);
  /* let html = `
    
  ` */
}
renderListingFromId();
