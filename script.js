// Mobile drawer
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const topbar = document.getElementById("topbar");

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
  if (e.target === drawer) setDrawer(false);
});

document.querySelectorAll(".drawerLink").forEach((a) => {
  a.addEventListener("click", () => setDrawer(false));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Topbar entrance
requestAnimationFrame(() => topbar?.classList.add("ready"));

// Topbar scroll state
window.addEventListener("scroll", () => {
  if (!topbar) return;
  const y = window.scrollY || 0;
  topbar.classList.toggle("scrolled", y > 16);
}, { passive: true });

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
document.querySelectorAll("dialog").forEach((d) => {
  d.addEventListener("click", (e) => {
    const rect = d.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!inDialog) d.close();
  });
});

// Contact form -> mailto (no backend)
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

  window.location.href = `mailto:balmafalni@gmail.com?subject=${subject}&body=${body}`;

  if (hint) hint.textContent = "If your email app didn’t open, copy: balmafalni@gmail.com";
});

// Scroll-reveal (animates the whole site)
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

// Subtle ambient parallax (desktop only)
(function () {
  const ambient = document.querySelector(".ambient");
  if (!ambient) return;

  const isMobile = window.matchMedia("(max-width: 980px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isMobile || reduce) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      ambient.style.transform = `translateY(${y * 0.03}px)`;
      ticking = false;
    });
  }, { passive: true });
})();

// Tilt effect on hover (desktop only, light)
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 980px)").matches;
  if (reduce || isMobile) return;

  const maxTilt = 6; // degrees
  const cards = document.querySelectorAll(".tilt");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      const rx = (-dy * maxTilt).toFixed(2);
      const ry = (dx * maxTilt).toFixed(2);

      card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

// FC Jerseys iframe fallback if embedding is blocked
(function () {
  const frame = document.querySelector(".previewFrame");
  const fallback = document.getElementById("fcPreviewFallback");
  if (!frame || !fallback) return;

  let loaded = false;

  frame.addEventListener("load", () => {
    loaded = true;
    fallback.hidden = true;
  });

  setTimeout(() => {
    if (!loaded) fallback.hidden = false;
  }, 2500);
})();