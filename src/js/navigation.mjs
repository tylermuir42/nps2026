/**
 * Shared navigation behavior for global nav: main menu toggle and submenu toggles.
 * Call enableNavigation() after DOM is ready (e.g. from main.js or conditions.js).
 */
export function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");
  const submenuToggles = document.querySelectorAll(".global-nav__split-button__toggle");

  if (!menuButton || !globalNav) return;

  // Main menu open/close (hamburger)
  menuButton.addEventListener("click", () => {
    globalNav.classList.toggle("show");
    const isOpen = globalNav.classList.contains("show");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
    if (!isOpen) {
      submenuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    }
  });

  // Submenu toggles (split-button arrows)
  submenuToggles.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
    });
  });
}
