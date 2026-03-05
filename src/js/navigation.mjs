/**
 * Shared navigation behavior for global nav toggle.
 * Call enableNavigation() after DOM is ready (e.g. from main.js or conditions.js).
 */
export function enableNavigation() {
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
