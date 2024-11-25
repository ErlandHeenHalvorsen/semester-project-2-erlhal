import { newPost } from "../../api/listings/createListing.js";
const createBtn = document.querySelector("#create-btn");

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
  const mediaUrl = document.querySelector("#create-image-url")?.value || "";
  const endsAt = document.querySelector("#create-ends-at")?.value;

  const createBody = {
    title,
    description,
    tags,
    media: mediaUrl ? [{ url: mediaUrl, alt: title || "Media image" }] : [],
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
  const form = document.forms.createListing;
  form.addEventListener("submit", onCreateListing);
});
