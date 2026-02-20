import "../css/style.css";
import "../css/home.css";

import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  // we have multiple links to build...so we map to transform the array of objects into an array of HTML strings.
  const html = data.map(mediaCardTemplate);
  // join the array of strings into one string and insert it into the section
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (!menuButton || !globalNav) return;

  menuButton.addEventListener("click", () => {
    globalNav.classList.toggle("show");
    const isOpen = globalNav.classList.contains("show");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });
}

init();
enableNavigation();