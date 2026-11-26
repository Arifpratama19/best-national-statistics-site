/* NusaStat — main.js
 * Hash router: #/ #/economy #/population #/social #/regions #/about.
 * Renders the matching view from views.js into #view, marks the active
 * nav link, and scrolls to the top. No network, no framework. */

function currentRoute() {
  const hash = window.location.hash || "#/";
  const route = hash.replace(/^#\/?/, "").split("?")[0];
  return VIEWS[route] ? route : "";
}

function renderRoute() {
  const route = currentRoute();
  const view = document.getElementById("view");
  view.innerHTML = VIEWS[route]();
  bindRoute(route);
  document.querySelectorAll(".nav-link").forEach((a) => {
    const r = a.getAttribute("data-route") || "";
    a.classList.toggle("active", r === route);
    if (r === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  document.getElementById("site-nav").classList.remove("open");
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", renderRoute);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav-toggle").addEventListener("click", () => {
    const nav = document.getElementById("site-nav");
    const open = nav.classList.toggle("open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", String(open));
  });
  document.getElementById("year").textContent = String(new Date().getFullYear());
  renderRoute();
});
