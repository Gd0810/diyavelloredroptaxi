/* ========================================================================== 
   Contact form — client-side validation only
   This script does NOT transmit, store, email, or persist booking requests.
   ========================================================================== */

"use strict";

(() => {
  const initContactForm = () => {
    const form = document.querySelector("[data-booking-form]");
    if (!form) return;

    const status = form.querySelector("[data-form-status]");
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const dateField = form.elements.travelDate;
    const submitButton = form.querySelector("[data-submit-button]");

    const localISODate = (date) => {
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().split("T")[0];
    };

    if (dateField) dateField.min = localISODate(new Date());
    // Disabled in HTML so a no-JavaScript visit cannot accidentally submit data.
    if (submitButton) submitButton.disabled = false;

    const showStatus = (type, message) => {
      status.textContent = message;
      status.className = `form-status is-visible is-${type}`;
    };

    const clearStatus = () => {
      status.textContent = "";
      status.className = "form-status";
    };

    const setError = (field, message) => {
      const error = form.querySelector(`#${field.id}Error`);
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message;
      return !message;
    };

    const validateField = (field) => {
      const value = field.value.trim();
      let message = "";

      if (field.required && !value) {
        message = "This field is required.";
      } else {
        switch (field.name) {
          case "fullName":
            if (value.length < 2) message = "Enter your full name (at least 2 characters).";
            else if (value.length > 80) message = "Keep your name under 80 characters.";
            break;
          case "phone": {
            const digits = value.replace(/\D/g, "");
            if (digits.length < 10 || digits.length > 15) {
              message = "Enter a valid phone number with 10 to 15 digits.";
            }
            break;
          }
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
              message = "Enter a valid email address, such as name@example.com.";
            }
            break;
          case "pickupLocation":
          case "dropLocation":
            if (value.length < 2) message = "Enter a more complete location.";
            else if (value.length > 150) message = "Keep the location under 150 characters.";
            break;
          case "travelDate": {
            if (value) {
              const selected = new Date(`${value}T00:00:00`);
              const today = new Date(`${localISODate(new Date())}T00:00:00`);
              if (Number.isNaN(selected.getTime())) message = "Choose a valid travel date.";
              else if (selected < today) message = "Travel date cannot be in the past.";
            }
            break;
          }
          case "message":
            if (value.length > 1000) message = "Keep your message under 1,000 characters.";
            break;
          default:
            break;
        }
      }

      if (!message && field.name === "dropLocation") {
        const pickup = form.elements.pickupLocation.value.trim().toLowerCase();
        if (pickup && value.toLowerCase() === pickup) {
          message = "Pickup and drop locations should be different.";
        }
      }

      return setError(field, message);
    };

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
        clearStatus();
      });
      field.addEventListener("change", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
        clearStatus();
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearStatus();

      const results = fields.map((field) => validateField(field));
      const firstInvalid = fields[results.indexOf(false)];

      if (firstInvalid) {
        showStatus("error", "Please correct the highlighted fields. Your request has not been sent.");
        firstInvalid.focus();
        return;
      }

      showStatus(
        "info",
        "Details checked — this request has not been sent or stored. Please call the business to book, or configure an external form service before launch."
      );
    });
  };

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
