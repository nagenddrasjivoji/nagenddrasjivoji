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
window.addEventListener("DOMContentLoaded", includeHTML);

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".tooltip").classList.add("show");
  }, 10000); // 10-second delay
});

