/**
 * Ditervo — Interactive helpers for accessible navigation, color swatch
 * copying, and static-site inquiry form validation.
 */
(function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  function closeNav(returnFocus) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
    if (returnFocus) {
      navToggle.focus();
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open", !expanded);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeNav(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeNav(true);
      }
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

  // Static inquiry form handling with aria-invalid and focus management
  const inquiryForm = document.getElementById("inquiry-form");
  const formStatus = document.getElementById("form-status");

  if (inquiryForm && formStatus) {
    const requiredFields = [
      document.getElementById("contact-name"),
      document.getElementById("contact-email"),
      document.getElementById("contact-message"),
    ].filter(Boolean);

    requiredFields.forEach((field) => {
      field.addEventListener("input", () => {
        if (field.value.trim()) {
          field.removeAttribute("aria-invalid");
        }
      });
    });

    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        const isEmail = field.type === "email";
        const valid =
          field.value.trim().length > 0 &&
          (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        if (!valid) {
          field.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      if (firstInvalid) {
        formStatus.classList.add("is-error");
        formStatus.textContent = "Please complete your name, a valid email, and a short project brief.";
        firstInvalid.focus();
        return;
      }

      formStatus.classList.remove("is-error");
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const topic = document.getElementById("contact-topic").value;
      const message = document.getElementById("contact-message").value.trim();

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
