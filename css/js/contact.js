
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Automatically update copyright year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Project inquiry form
  const form = document.getElementById("projectForm");
  const status = document.getElementById("formStatus");
  const submitButton = document.getElementById("submitButton");
  const submitText = document.getElementById("submitText");

  if (!form || !status || !submitButton || !submitText) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.className = "form-status";
    status.textContent = "";

    const formAction = form.getAttribute("action");

    // Prevent a misleading success message if Formspree isn't configured.
    if (!formAction || formAction.includes("YOUR_FORM_ID")) {
      status.classList.add("error");
      status.textContent =
        "The form isn't connected yet. Set up your Formspree form and replace YOUR_FORM_ID in contact.html before accepting inquiries.";
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitText.textContent = "Sending your inquiry...";

    try {
      const response = await fetch(formAction, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.classList.add("success");
        status.textContent =
          "Thank you! Your project inquiry was submitted. I'll get back to you using the contact details you provided.";
        form.reset();
      } else {
        let errorMessage =
          "Your inquiry couldn't be sent. Please try again or contact me directly by email or WhatsApp.";

        try {
          const result = await response.json();
          if (result.errors && result.errors.length) {
            errorMessage = result.errors
              .map((item) => item.message)
              .join(" ");
          }
        } catch {
          // Keep the default error message if no JSON response is available.
        }

        status.classList.add("error");
        status.textContent = errorMessage;
      }
    } catch (error) {
      status.classList.add("error");
      status.textContent =
        "A network error occurred. Please check your internet connection or contact me directly by email or WhatsApp.";
    } finally {
      submitButton.disabled = false;
      submitText.textContent = "Send project inquiry ↗";
    }
  });
});
