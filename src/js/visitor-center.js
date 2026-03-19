import "../css/style.css";
import "../css/visitor-center.css";

import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import { enableNavigation } from "./navigation.mjs";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcAmenityTemplate,
  vcContactsTemplate,
  vcImageTemplate
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

function normalizeAmenities(data) {
  const raw = data?.amenities ?? data?.amenity ?? [];
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.amenities)) return raw.amenities;
  return [];
}

function setAccordionBehavior() {
  const accordions = document.querySelectorAll(".vc-details-list details");
  if (!accordions.length) return;

  accordions.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      accordions.forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });
}

function renderVisitorCenter(center) {
  const titleEl = document.querySelector(".vc-name");
  const infoEl = document.querySelector(".vc-info");

  if (titleEl && center?.name) titleEl.innerHTML = vcTitleTemplate(center.name);
  if (infoEl) infoEl.innerHTML = vcInfoTemplate(center);

  // Addresses
  const addressesDetails = document.querySelector("#vcAddresses");
  if (addressesDetails) {
    addressesDetails.querySelectorAll("section").forEach((el) => el.remove());
    const html = vcAddressesListTemplate(center?.addresses ?? []);
    if (html) addressesDetails.insertAdjacentHTML("beforeend", html);
  }

  // Directions
  const directionsDetails = document.querySelector("#vcDirections");
  if (directionsDetails) {
    directionsDetails.querySelectorAll("p").forEach((p) => p.remove());
    const html = vcDirectionsTemplate(center?.directionsInfo ?? "");
    directionsDetails.insertAdjacentHTML("beforeend", html);
  }

  // Amenities
  const amenitiesDetails = document.querySelector("#vcAmenities");
  if (amenitiesDetails) {
    const items = normalizeAmenities(center);
    const ul = amenitiesDetails.querySelector("ul");
    if (ul) ul.innerHTML = items.map((a) => vcAmenityTemplate(a)).join("");
  }

  // Contact info
  const contactDetails = document.querySelector("#vcContact");
  if (contactDetails) {
    contactDetails.querySelectorAll("section").forEach((el) => el.remove());
    const html = vcContactsTemplate(center);
    if (html) contactDetails.insertAdjacentHTML("beforeend", html);
  }

  // Gallery
  const galleryUl = document.querySelector(".vc-gallery ul");
  if (galleryUl) {
    const images = center?.images ?? [];
    galleryUl.innerHTML = images.map((img) => vcImageTemplate(img)).join("");
  }

  setAccordionBehavior();
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const id = getParam("id");
  if (!id) return;

  const centerDetails = await getParkVisitorCenterDetails(id);
  renderVisitorCenter(centerDetails);
}

init();
enableNavigation();

