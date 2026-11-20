/**
 * Ditervo — Interactive helpers for navigation, color swatch copying,
 * SVG asset downloads, and static-site inquiry form handling.
 */
(function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open", !expanded);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  // Click-to-copy brand color swatches
  document.querySelectorAll("[data-copy-hex]").forEach((card) => {
    card.addEventListener("click", async () => {
      const hex = card.getAttribute("data-copy-hex");
      if (!hex) return;
      try {
        await navigator.clipboard.writeText(hex);
        showToast(`Copied ${hex} to clipboard`);
      } catch {
        showToast(`Color code: ${hex}`);
      }
    });
  });

  // Static inquiry form handling (GitHub Pages compatible)
  const inquiryForm = document.getElementById("inquiry-form");
  const formStatus = document.getElementById("form-status");

  if (inquiryForm && formStatus) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const topic = document.getElementById("contact-topic").value;
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please complete your name, email, and project brief.";
        return;
      }

      const subject = encodeURIComponent(`[Ditervo Inquiry] ${topic} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nFocus Area: ${topic}\n\nProject Brief:\n${message}`
      );

      formStatus.textContent =
        "Inquiry prepared. Opening your email client to send directly to hello@ditervo.com.";
      window.location.href = `mailto:hello@ditervo.com?subject=${subject}&body=${body}`;
    });
  }
})();
