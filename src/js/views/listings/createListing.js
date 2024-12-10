import { newPost } from "../../api/listings/createListing.js";
import { authGuard } from "../../utils/authGuard.js";
import NavBar from "../../components/header.js";
import FooterNav from "../../components/footerNav.js";

customElements.define("footer-nav", FooterNav);
customElements.define("nav-bar", NavBar);

authGuard();

async function onCreateListing(event) {
  event.preventDefault();

  const title = document.querySelector("#create-title")?.value || "";
  const description =
    document.querySelector("#create-description")?.value || "";
  const tags =
    document
      .querySelector("#create-tags")
      ?.value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag) || [];
  const endsAt = document.querySelector("#create-ends-at")?.value;

  // Collect all image URLs
  const mediaInputs = document.querySelectorAll('input[name="image-url"]');
  const media = Array.from(mediaInputs)
    .map((input) => input.value.trim())
    .filter((url) => url)
    .map((url) => ({ url, alt: title || "Media image" }));

  const createBody = {
    title,
    description,
    tags,
    media,
    endsAt: endsAt ? new Date(endsAt).toISOString() : new Date().toISOString(),
  };

  console.log("Sending createBody:", JSON.stringify(createBody, null, 2)); // Debugging

  try {
    const newListing = await newPost(createBody);
    console.log("API Response:", newListing);
    alert("Listing created successfully!");
  } catch (error) {
    console.error("Failed to create listing:", error.message);
    alert(`Error creating listing: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const imageUrlsContainer = document.querySelector("#image-urls-container");
  const addImageUrlBtn = document.querySelector("#add-image-url");
  const form = document.forms.createListing;
  form.addEventListener("submit", onCreateListing);
  addImageUrlBtn.addEventListener("click", () => {
    const newInput = document.createElement("input");
    newInput.type = "url";
    newInput.name = "image-url";
    newInput.className =
      "w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none";
    newInput.placeholder = "Enter another image URL";
    imageUrlsContainer.appendChild(newInput);
  });
});
