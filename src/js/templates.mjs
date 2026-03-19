import spritePath from '../images/sprite.symbol.svg';

export function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
        </p>`;
}

export function mediaCardTemplate(info) {
  return `<div class="media-card">
  <a href="${info.link}">
  <img src="${info.image}" alt="${info.name}" class="media-card__img">
  <h3 class="media-card__title">${info.name}</h3>
  </a>
 <p>${info.description}</p>
   </div>`;
}
function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice.phoneNumber;
}
export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
  <h3>Contact Info</h3>
  <h4>Mailing Address:</h4>
  <div><p>${mailing.line1}<p>
  <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
  <h4>Phone:</h4>
  <p>${voice}</p>
</section>
  `;
}

export function alertTemplate(alert){
  let alertType = "";
  switch(alert.category){
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}

export function visitorCenterTemplate(center){
  return `<li class="visitor-center">
  <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
  <p>${center.description}</p>
  <p>${center.directionsInfo}</p>
  </li>`;
}

export function activityListTemplate(activities){
  return activities.map((activity) => `<li>${activity.name}</li>`).join("");
}

function iconTemplate(iconId) {
  return `<svg class="icon" role="presentation" focusable="false">
  <use
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xlink:href="/images/sprite.symbol.svg#${iconId}"
  ></use>
</svg>`;
}

export function vcTitleTemplate(text) {
  return `${iconTemplate("ranger-station")} ${text}`;
}

export function vcInfoTemplate(data) {
  const image = data?.images?.[0] ?? {};
  const imgUrl = image.url ?? "";
  const alt = image.altText ?? image.title ?? "";
  const caption = image.caption ?? image.title ?? "";
  const credit = image.credit ?? "";
  return `<figure>
  <img src="${imgUrl}" alt="${alt}" />
  <figcaption>
    ${caption} ${credit ? `<span>${credit}</span>` : ""}
  </figcaption>
</figure>
<p>${data?.description ?? ""}</p>`;
}

export function listTemplate(data = [], contentTemplate) {
  const html = data.map(contentTemplate).join("");
  return `<ul>${html}</ul>`;
}

function getFirst(arr) {
  return Array.isArray(arr) ? arr[0] : undefined;
}

function formatTel(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function vcAddressTemplate(address, typeClass) {
  if (!address) return "";
  const line1 = address.line1 ?? "";
  const line2 = address.line2 ?? "";
  const city = address.city ?? "";
  const state = address.stateCode ?? "";
  const postal = address.postalCode ?? "";
  const line2Html = line2 ? `<br />${line2}` : "";
  return `<section class="${typeClass}">
  <h3>${address.type} Address</h3>
  <address>
    ${line1}${line2Html}
    <br />
    ${city}, ${state} ${postal}
  </address>
</section>`;
}

export function vcAddressesListTemplate(addresses = []) {
  const physical = addresses.find((address) => address.type === "Physical");
  const mailing = addresses.find((address) => address.type === "Mailing");
  let html = vcAddressTemplate(physical, "vc-addresses__physical");
  if (mailing) html += vcAddressTemplate(mailing, "vc-addresses__mailing");
  return html;
}

export function vcAmenityTemplate(data) {
  const text = typeof data === "string" ? data : data?.name ?? data?.amenity ?? "";
  return `<li>${text}</li>`;
}

export function vcDirectionsTemplate(data) {
  return `<p>${data ?? ""}</p>`;
}

export function vcContactsTemplate(data) {
  // Per project requirements: use the first email and first phone number.
  const emailObj = getFirst(data?.contacts?.emailAddresses);
  const email =
    emailObj?.emailAddress ?? emailObj?.email ?? data?.contacts?.emailAddress ?? "";

  const phoneObj = getFirst(data?.contacts?.phoneNumbers);
  const phone = phoneObj?.phoneNumber ?? data?.contacts?.phoneNumber ?? "";

  const mailto = email ? `mailto:${email}` : "mailto:";
  const tel = phone ? `tel:${formatTel(phone)}` : "tel:";

  return `<section class="vc-contact__email">
  <h3>Email Address</h3>
  <a href="${mailto}">${email}</a>
</section>
<section class="vc-contact__phone">
  <h3>Phone numbers</h3>
  <a href="${tel}">${phone}</a>
</section>`;
}

export function vcImageTemplate(data) {
  const alt = data?.altText ?? data?.title ?? "";
  return `<li><img src="${data?.url ?? ""}" alt="${alt}" /></li>`;
}