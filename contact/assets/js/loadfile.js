async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  for (const el of elements) {
    const file = el.getAttribute("data-include");
    const response = await fetch(file);
    if (response.ok) {
      el.innerHTML = await response.text();
    } else {
      el.innerHTML = "Error loading " + file;
    }
  }
}

function showTooltipWithDelay() {
  const tooltip = document.querySelector(".tooltip");
  if (!tooltip) return;

  setTimeout(() => {
    tooltip.classList.add("show");
  }, 10000);
}

function enablePageTransitions() {
  const body = document.body;
  if (!body) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  const baseClass = "page-transition-enabled";
  const hiddenClass = "page-transition-hidden";
  const visibleClass = "page-transition-visible";
  const fadingClass = "page-transition-fading";
  const duration = 350;
  let isTransitioning = false;

  body.classList.add(baseClass, hiddenClass);

  requestAnimationFrame(() => {
    body.classList.add(visibleClass);
    body.classList.remove(hiddenClass);
  });

  const handleLinkClick = (event) => {
    const link = event.target.closest("a[href]");
    if (!link || isTransitioning) return;

    if (link.target && link.target !== "_self") return;
    if (link.dataset && "noTransition" in link.dataset) return;
    if (link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href) return;
    const trimmedHref = href.trim();
    if (!trimmedHref) return;
    const normalizedHref = trimmedHref.toLowerCase();
    const skipProtocols = ["#", "mailto:", "tel:", "javascript:"];
    if (skipProtocols.some((prefix) => normalizedHref.startsWith(prefix)))
      return;

    const destination = new URL(trimmedHref, window.location.href);

    if (destination.origin !== window.location.origin) return;

    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash === window.location.hash
    )
      return;

    event.preventDefault();
    isTransitioning = true;

    body.classList.remove(visibleClass);
    body.classList.add(fadingClass);

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, duration);
  };

  document.addEventListener("click", handleLinkClick);

  window.addEventListener("pageshow", () => {
    isTransitioning = false;
    body.classList.remove(fadingClass);
    body.classList.remove(hiddenClass);
    body.classList.add(visibleClass);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  includeHTML();
  showTooltipWithDelay();
  enablePageTransitions();
});
