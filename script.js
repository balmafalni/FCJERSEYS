// Mobile drawer
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");

function setDrawer(open) {
  if (open) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
  } else {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

menuBtn?.addEventListener("click", () => {
  const isOpen = drawer.classList.contains("open");
  setDrawer(!isOpen);
});

drawer?.addEventListener("click", (e) => {
  // close if user clicks the overlay, not the menu itself
  if (e.target === drawer) setDrawer(false);
});

// Close drawer when clicking a link
document.querySelectorAll(".drawerLink").forEach((a) => {
  a.addEventListener("click", () => setDrawer(false));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dialog / modal handling
function openDialog(id) {
  const d = document.getElementById(id);
  if (d && typeof d.showModal === "function") d.showModal();
}
function closeDialogs() {
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
}

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => openDialog(btn.dataset.open));
});
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeDialogs());
});

// Close modal on backdrop click
document.querySelectorAll("dialog").forEach((d) => {
  d.addEventListener("click", (e) => {
    const rect = d.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    // Clicking outside closes
    if (!inDialog) d.close();
  });
});

// Contact form -> mailto (no backend required)
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const business = (data.get("business") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  const subject = encodeURIComponent(`BEIN Studio Inquiry${business ? " — " + business : ""}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nBusiness: ${business || "-"}\n\nMessage:\n${message}\n`
  );
  // FC Jerseys iframe fallback if embedding is blocked
(function () {
  const frame = document.querySelector('.previewFrame');
  const fallback = document.getElementById('fcPreviewFallback');
  if (!frame || !fallback) return;

  let loaded = false;

  frame.addEventListener('load', () => {
    loaded = true;
    // If it loads, keep fallback hidden
    fallback.hidden = true;
  });

  // If it doesn't "load" in a reasonable time, show fallback
  // (Some blocked iframes never fully load or show errors)
  setTimeout(() => {
    if (!loaded) fallback.hidden = false;
  }, 2500);
})();

  // Opens the user's email client
  window.location.href = `mailto:balmafalni@gmail.com?subject=${subject}&body=${body}`;

  if (hint) {
    hint.textContent = "If your email app didn’t open, copy: balmafalni@gmail.com";
  }
});