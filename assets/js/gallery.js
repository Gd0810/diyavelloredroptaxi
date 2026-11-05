/* ========================================================================== 
   Gallery filtering and accessible lightbox
   Requires the shared gallery markup in gallery.html; no external library.
   ========================================================================== */

"use strict";

(() => {
  const initGallery = () => {
    const grid = document.querySelector("[data-gallery-grid]");
    const dialog = document.querySelector("[data-lightbox]");
    if (!grid || !dialog) return;

    const items = Array.from(grid.querySelectorAll("[data-category]"));
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    const status = document.querySelector("[data-gallery-status]");
    const image = dialog.querySelector("[data-lightbox-image]");
    const caption = dialog.querySelector("[data-lightbox-caption]");
    const counter = dialog.querySelector("[data-lightbox-counter]");
    const closeButton = dialog.querySelector("[data-lightbox-close]");
    const previousButton = dialog.querySelector("[data-lightbox-prev]");
    const nextButton = dialog.querySelector("[data-lightbox-next]");
    let activeTriggers = [];
    let activeIndex = 0;

    const isOpen = () => dialog.hasAttribute("open");

    const renderImage = () => {
      const trigger = activeTriggers[activeIndex];
      if (!trigger) return;

      const thumbnail = trigger.querySelector("img");
      image.src = trigger.dataset.full || thumbnail.src;
      image.alt = thumbnail.alt;
      caption.textContent = trigger.dataset.caption || thumbnail.alt;
      counter.textContent = `${activeIndex + 1} of ${activeTriggers.length}`;

      const multipleImages = activeTriggers.length > 1;
      previousButton.disabled = !multipleImages;
      nextButton.disabled = !multipleImages;
    };

    const openLightbox = (trigger) => {
      activeTriggers = items
        .filter((item) => !item.hidden)
        .map((item) => item.querySelector("[data-gallery-trigger]"));
      activeIndex = Math.max(0, activeTriggers.indexOf(trigger));
      renderImage();

      document.body.classList.add("lightbox-open");
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      closeButton.focus();
    };

    const closeLightbox = () => {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
        document.body.classList.remove("lightbox-open");
      }
    };

    const showPrevious = () => {
      if (!activeTriggers.length) return;
      activeIndex = (activeIndex - 1 + activeTriggers.length) % activeTriggers.length;
      renderImage();
    };

    const showNext = () => {
      if (!activeTriggers.length) return;
      activeIndex = (activeIndex + 1) % activeTriggers.length;
      renderImage();
    };

    items.forEach((item) => {
      const trigger = item.querySelector("[data-gallery-trigger]");
      trigger.addEventListener("click", () => openLightbox(trigger));
    });

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach((control) => {
          const selected = control === button;
          control.classList.toggle("active", selected);
          control.setAttribute("aria-pressed", String(selected));
        });

        items.forEach((item) => {
          const visible = filter === "all" || item.dataset.category === filter;
          item.hidden = !visible;
          item.classList.toggle("is-hidden", !visible);
          if (visible) visibleCount += 1;
        });

        if (status) {
          const label = button.textContent.trim();
          status.textContent = `Showing ${visibleCount} ${label.toLowerCase()} ${visibleCount === 1 ? "image" : "images"}.`;
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPrevious);
    nextButton.addEventListener("click", showNext);

    dialog.addEventListener("close", () => {
      document.body.classList.remove("lightbox-open");
    });

    dialog.addEventListener("cancel", () => {
      document.body.classList.remove("lightbox-open");
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen()) return;
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    });
  };

  document.addEventListener("DOMContentLoaded", initGallery);
})();
