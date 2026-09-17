document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menu && nav) {
    menu.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (nav) nav.classList.remove("open");
    });
  });

  // Keep the counters usable even when animation APIs are unavailable.
  document.querySelectorAll(".counter").forEach(function (el) {
    const target = Number(el.getAttribute("data-target") || 0);
    if (!Number.isFinite(target)) return;

    const finish = function () {
      el.textContent = target < 10 ? "0" + target : String(target);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            finish();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(el);
    } else {
      finish();
    }
  });

  const cards = Array.prototype.slice.call(document.querySelectorAll(".product-card"));
  const filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  const search = document.querySelector("#phoneSearch");
  let activeBrand = "all";

  function applyFilters() {
    const q = search ? String(search.value || "").toLowerCase() : "";
    cards.forEach(function (card) {
      const brand = card.getAttribute("data-brand") || "";
      const text = (card.textContent || "").toLowerCase();
      const okBrand = activeBrand === "all" || brand === activeBrand;
      const okText = !q || text.indexOf(q) !== -1;
      card.style.display = (okBrand && okText) ? "" : "none";
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeBrand = btn.getAttribute("data-brand") || "all";
      applyFilters();
    });
  });

  if (search) search.addEventListener("input", applyFilters);
  applyFilters();
});
