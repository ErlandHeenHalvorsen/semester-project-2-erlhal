import { getListingFromId } from "../api/listings/getListings.js";

export default class Carousell extends HTMLElement {
  constructor() {
    super();
    this.classList.add("block");
    this.listingId = null; // To store the listing ID
    this.listing = null; // To store fetched listing data
  }

  async connectedCallback() {
    this.listingId = this.getAttribute("listing-id"); // Get the listing ID from the attribute
    await this.fetchListing(); // Fetch listing data
    this.render(); // Render the carousel
    this.listeners(); // Add carousel functionality
  }

  async fetchListing() {
    try {
      this.listing = await getListingFromId(this.listingId); // Fetch listing data by ID
    } catch (error) {
      console.error("Failed to fetch listing:", error);
    }
  }

  listeners() {
    if (
      !this.listing ||
      !this.listing.media ||
      this.listing.media.length <= 1
    ) {
      return; // No carousel needed if no images or only one image
    }

    const carousel = this.querySelector("#carousel");
    const prevBtn = this.querySelector("#prev");
    const nextBtn = this.querySelector("#next");
    const images = this.listing.media;
    const totalImages = images.length;
    let currentIndex = 0;

    // Update carousel position
    const updateCarousel = () => {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Next button functionality
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalImages; // Loop back to start
      updateCarousel();
    });

    // Previous button functionality
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Loop back to end
      updateCarousel();
    });
  }

  render() {
    if (
      !this.listing ||
      !this.listing.media ||
      this.listing.media.length === 0
    ) {
      this.innerHTML = `<p>No images available for this listing.</p>`;
      return;
    }

    this.innerHTML = `
      <div class="relative mb-6">
  <!-- Image Wrapper -->
  <div class="overflow-hidden rounded-md">
    <div
      id="carousel"
      class="flex transition-transform duration-500 ease-in-out"
    >
      ${this.listing.media
        .map(
          (img, idx) =>
            `<img
              key="${idx}"
              src="${img.url}"
              alt="Product Image ${idx + 1}"
              class="w-full  sm:h-80 lg:h-[500px] object-cover  flex-none"
            />`
        )
        .join("")}
    </div>
  </div>

  <!-- Navigation Buttons -->
  <button id="prev" class="carousell-button-prev">
    <i class="fa-solid fa-chevron-left md:fa-xl"></i>
  </button>
  <button id="next" class="carousell-buttons-next">
    <i class="fa-solid fa-chevron-right md:fa-xl"></i>
  </button>
</div>
    `;
  }
}
