# Front-End Milestone Audit

**Scope:** HTML + CSS static content, mobile-first responsiveness, baseline UX/accessibility  
**Audited:** `src/index.html`, `src/conditions.html`, `src/css/**`

---

## 1. Skip link target missing (High)

**Finding:** The skip link “Skip to this park navigation” points to `#local-nav`, but no element in either page has `id="local-nav"`. The park nav uses `class="park-nav"` only, so the link does nothing and fails accessibility expectations.

**Why it matters:** Skip links are critical for keyboard and screen-reader users. A broken target wastes a tab stop and breaks trust; it also fails WCAG 2.4.1 (Bypass Blocks) when the target doesn’t exist.

**Fix:** Add `id="local-nav"` to the park navigation element in both HTML files.

```html
<nav class="park-nav" id="local-nav">
```

---

## 2. No focus visibility on interactive elements (High)

**Finding:** Only `.skip-links a:focus` has visible focus styles. The global nav toggle button, search link, global-nav links, and park-nav links have no custom focus indicator. Default browser outline may be weak or removed by reset/global styles.

**Why it matters:** Keyboard users need a clear focus indicator to know where they are. Missing or low-contrast focus can fail WCAG 2.4.7 (Focus Visible) and makes the site harder to use for motor and keyboard-only users.

**Fix:** Add visible focus styles for header/nav interactive elements, preferably with `:focus-visible` to avoid focus rings on mouse click where not desired.

Example in `header.css` or `global.css`:

```css
.global-header a:focus-visible,
.global-header button:focus-visible,
.global-nav a:focus-visible,
.park-nav a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

(Adjust color/offset to meet contrast and design.)

---

## 3. CSS bugs in conditions.css (High)

**Finding:** In `src/css/conditions.css`: (1) `var(bs-grey-3)` is missing the `--` prefix, so the variable is invalid and the border color won’t apply. (2) `font-size: 1.em` has an erroneous dot; it should be `1em`.

**Why it matters:** Invalid CSS means the alert border and font size don’t render as intended, hurting both appearance and consistency with the rest of the site.

**Fix:** In `conditions.css`, change:

- `var(bs-grey-3)` → `var(--bs-grey-3)`
- `1.em` → `1em`

---

## 4. Hero images have empty alt (and empty src) (Medium)

**Finding:** Both pages use `<img src="" alt="" />` for the hero banner. The `src` is filled by JS; the `alt` is always empty.

**Why it matters:** When the image is meaningful (hero content), empty `alt` makes that content invisible to screen readers and can fail WCAG 1.1.1 (Non-text Content). Empty `alt` is only appropriate for purely decorative images.

**Fix:** Ensure hero images get descriptive alt text when `src` is set. Either: (1) have JS set both `src` and `alt` (e.g. from park name or existing caption data), or (2) add a default descriptive alt in HTML that JS can override, e.g. `alt="Park banner"` or `alt=""` only if the image is later treated as decorative and the same info is available in text nearby.

---

## 5. Skip links container semantics (Medium)

**Finding:** The skip links are in a `<div class="skip-links" aria-label="short-cut links" role="navigation">`. Using a div with an ARIA label and role works, but a `<nav>` with a clear label is more semantic and consistent with common practice.

**Why it matters:** Using the right landmark (nav) and a standard label (“Skip links”) improves screen-reader navigation and aligns with WCAG 2.4.1 (Bypass Blocks) and common patterns.

**Fix:** Replace the wrapper with:

```html
<nav class="skip-links" aria-label="Skip links">
```

Remove the redundant `role="navigation"` (implied by `<nav>`). Optionally tighten the list to only the links you actually need per page.

---

## 6. conditions.html header inconsistent and less accessible (Medium)

**Finding:** `conditions.html` is missing the expandable `.global-nav` block and uses a simplified menu button (no `aria-expanded`, no “Open/Close” aria-label, no open/close icon states). The global nav toggle behavior and semantics from `index.html` are not present.

**Why it matters:** Inconsistent headers confuse users and accessibility: the menu button on conditions doesn’t expose state or purpose to assistive tech, and the second skip link (“Skip to global NPS navigation”) still targets `#global-nav-toggle` even though the expandable nav isn’t on this page.

**Fix:** Align the conditions header with index: add the same `.global-nav` block and full toggle button markup (with `aria-expanded`, `aria-label`, and open/closed content), and ensure the same `enableNavigation()` (or equivalent) runs on conditions so the menu works and is keyboard-accessible. If the global nav is intentionally absent on conditions, then remove or repurpose the “Skip to global NPS navigation” link on that page.

---

## 7. Limited responsive behavior (Medium)

**Finding:** The only layout breakpoint is in `home.css` at 630px for `.info` (flex direction row). Header, global nav, and park nav have no width-based rules; body uses a single `max-width: 1200px` with no intermediate or large-screen layout changes for nav/header.

**Why it matters:** For a “mobile-first responsiveness” milestone, the lack of breakpoints for primary navigation and header makes it harder to validate behavior across small and large screens and to avoid cramped or awkward layouts on very small or very large viewports.

**Fix:** Add at least one breakpoint that affects header/nav (e.g. in `header.css`): for example, at a chosen min-width, define how `.park-nav > ul` should behave (e.g. flex wrap, gap, or max-width) and optionally adjust global header padding or font sizes so layout is intentional on both small and large screens.

---

## 8. details name and typo in conditions.html (Low)

**Finding:** Both `<details>` elements use `name="current-details"`. In HTML, same-name details in the same document can behave as a single control (opening one may close the other). Also, “All Activiites” is a typo.

**Why it matters:** Shared `name` can make the two sections behave like one accordion instead of two independent sections, which may not be the intended UX. The typo looks unprofessional and can affect search and screen-reader output.

**Fix:** Either remove the `name` attribute from both `<details>` if they should open/close independently, or give them distinct names if you need to control them as a group. Change “All Activiites” to “All Activities”.

---

## Prioritized “fix first” list for this week

1. **conditions.css** – Fix `var(--bs-grey-3)` and `1em` (quick, fixes broken styles).
2. **Skip link target** – Add `id="local-nav"` to `.park-nav` in both HTML files (quick, high impact for a11y).
3. **Focus visibility** – Add `:focus-visible` (or `:focus`) styles for header/nav buttons and links (high impact for keyboard/a11y).
4. **Hero alt text** – Ensure hero `<img>` gets descriptive `alt` when `src` is set (via JS or static default).
5. **Skip links landmark** – Change wrapper to `<nav class="skip-links" aria-label="Skip links">` and remove redundant role.
6. **conditions.html header** – Bring conditions in line with index (global nav + full toggle markup and behavior), or adjust skip links if global nav is intentionally omitted.
7. **Responsive nav/header** – Add one breakpoint that explicitly defines header/park-nav behavior at a larger width.
8. **conditions.html details** – Fix “Activiites” and resolve `name="current-details"` (remove or use unique names).

---

*End of audit.*
