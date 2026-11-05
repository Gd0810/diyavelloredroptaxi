/* ========================================================================== 
   Diyavellore Drop Taxi — Shared UI behavior
   Vanilla JavaScript only; no libraries or backend dependencies.
   ========================================================================== */

"use strict";

document.documentElement.classList.add("js");

const TaxiSite = (() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /** Add the sticky-header shadow and toggle the back-to-top control. */
  function initScrollUI() {
    const header = document.querySelector("[data-header]");
    const backToTop = document.querySelector("[data-back-to-top]");
    let ticking = false;

    function update() {
      const hasScrolled = window.scrollY > 24;
      if (header) header.classList.toggle("is-scrolled", hasScrolled);
      if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 550);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
      });
    }
  }

  /** Accessible responsive navigation with Escape and outside-click support. */
  function initNavigation() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");

    if (!header || !toggle || !menu) return;

    const closeMenu = (returnFocus = false) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      if (returnFocus) toggle.focus();
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (menu.classList.contains("is-open") && !header.contains(event.target)) {
        closeMenu();
      }
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  /** Keep the current page indicated even if a page is renamed or moved. */
  function initActiveNavigation() {
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkFile = new URL(link.href, window.location.href).pathname.split("/").pop() || "index.html";
      const isCurrent = linkFile === currentFile;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /** Reveal elements once, with a no-IntersectionObserver fallback. */
  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });

    elements.forEach((element) => observer.observe(element));
  }

  /** Smooth same-page anchor navigation without breaking normal page links. */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
        if (history.pushState) history.pushState(null, "", id);
      });
    });
  }

  /** Auto-rotate homepage testimonials left to right with accessible controls. */
  function initTestimonialCarousel() {
    const root = document.querySelector("[data-testimonial-carousel]");
    if (!root) return;

    const track = root.querySelector("[data-testimonial-track]");
    const viewport = root.querySelector("[data-testimonial-viewport]");
    const previousButton = document.querySelector("[data-testimonial-prev]");
    const nextButton = document.querySelector("[data-testimonial-next]");
    const pauseButton = document.querySelector("[data-testimonial-pause]");
    const carouselControls = document.querySelector(".carousel-controls");
    const pauseLabel = document.querySelector("[data-testimonial-pause-label]");
    const pauseIcon = pauseButton ? pauseButton.querySelector("[data-icon-pause]") : null;
    const playIcon = pauseButton ? pauseButton.querySelector("[data-icon-play]") : null;
    const stateLabel = root.querySelector("[data-testimonial-state]");
    const liveStatus = root.querySelector("[data-testimonial-live]");

    if (!track || !viewport || !previousButton || !nextButton || !pauseButton || track.children.length < 2) return;

    let autoTimer = null;
    let animationTimer = null;
    let resizeTimer = null;
    let isAnimating = false;
    let userPaused = false;
    let hoverPaused = false;
    let focusPaused = false;
    let inView = !("IntersectionObserver" in window);

    const getGap = () => parseFloat(window.getComputedStyle(track).gap) || 0;
    const getStep = () => track.children[0].getBoundingClientRect().width + getGap();

    const stopAutoRotation = () => {
      window.clearInterval(autoTimer);
      autoTimer = null;
    };

    const shouldRotate = () => (
      !userPaused && !hoverPaused && !focusPaused && inView &&
      !document.hidden && !reducedMotion.matches && !isAnimating
    );

    const restartAutoRotation = () => {
      stopAutoRotation();
      if (shouldRotate()) {
        autoTimer = window.setInterval(() => moveTestimonial("previous"), 4500);
      }
    };

    const updatePauseUI = (announce = false) => {
      const motionDisabled = reducedMotion.matches;
      const message = motionDisabled
        ? "Automatic rotation is off for your reduced-motion preference."
        : userPaused
          ? "Automatic testimonial rotation paused."
          : "Automatic testimonial rotation resumed.";

      pauseButton.disabled = motionDisabled;
      pauseButton.setAttribute("aria-pressed", String(userPaused));
      pauseButton.setAttribute("aria-label", userPaused ? "Resume automatic testimonial rotation" : "Pause automatic testimonial rotation");
      if (pauseLabel) pauseLabel.textContent = userPaused ? "Resume" : "Pause";
      if (pauseIcon) pauseIcon.hidden = userPaused;
      if (playIcon) playIcon.hidden = !userPaused;
      root.classList.toggle("is-paused", userPaused || motionDisabled);

      if (stateLabel) {
        stateLabel.textContent = motionDisabled
          ? "Auto-rotation off for reduced motion"
          : userPaused
            ? "Automatic rotation paused"
            : "Auto-moving left to right";
      }
      if (announce && liveStatus) liveStatus.textContent = message;
    };

    const updateVisibleSlides = () => {
      const styles = window.getComputedStyle(viewport);
      const availableWidth = viewport.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      const step = getStep();
      if (step <= 0) return;
      const visibleCount = Math.max(1, Math.floor((availableWidth + getGap()) / step + 0.001));

      Array.from(track.children).forEach((slide, index) => {
        slide.setAttribute("aria-hidden", String(index >= visibleCount));
      });
    };

    const finishMove = () => {
      window.clearTimeout(animationTimer);
      track.style.transition = "none";
      track.style.transform = "translate3d(0, 0, 0)";
      isAnimating = false;
      updateVisibleSlides();
      restartAutoRotation();
    };

    function moveTestimonial(direction, manual = false) {
      if (isAnimating) return;
      if (manual) {
        userPaused = true;
        updatePauseUI(true);
      }

      stopAutoRotation();
      const step = getStep();
      if (step <= 0) return;

      isAnimating = true;
      const duration = reducedMotion.matches ? 0 : 420;
      const transition = duration ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none";

      if (direction === "previous") {
        // Put the last card first, then reveal it from the left: motion is L → R.
        track.prepend(track.lastElementChild);
        track.style.transition = "none";
        track.style.transform = `translate3d(${-step}px, 0, 0)`;
        void track.offsetWidth;

        window.requestAnimationFrame(() => {
          track.style.transition = transition;
          track.style.transform = "translate3d(0, 0, 0)";
          animationTimer = window.setTimeout(finishMove, duration + 40);
        });
      } else {
        track.style.transition = transition;
        track.style.transform = `translate3d(${-step}px, 0, 0)`;
        animationTimer = window.setTimeout(() => {
          track.appendChild(track.firstElementChild);
          finishMove();
        }, duration + 40);
      }
    }

    previousButton.addEventListener("click", () => moveTestimonial("previous", true));
    nextButton.addEventListener("click", () => moveTestimonial("next", true));
    pauseButton.addEventListener("click", () => {
      userPaused = !userPaused;
      updatePauseUI(true);
      restartAutoRotation();
    });

    root.addEventListener("mouseenter", () => {
      hoverPaused = true;
      stopAutoRotation();
    });
    root.addEventListener("mouseleave", () => {
      hoverPaused = false;
      restartAutoRotation();
    });
    const handleFocusIn = () => {
      focusPaused = true;
      stopAutoRotation();
    };
    const handleFocusOut = () => {
      window.setTimeout(() => {
        focusPaused = root.contains(document.activeElement) ||
          (carouselControls && carouselControls.contains(document.activeElement));
        restartAutoRotation();
      }, 0);
    };
    [root, carouselControls].filter(Boolean).forEach((element) => {
      element.addEventListener("focusin", handleFocusIn);
      element.addEventListener("focusout", handleFocusOut);
    });
    document.addEventListener("visibilitychange", restartAutoRotation);
    reducedMotion.addEventListener("change", () => {
      updatePauseUI();
      restartAutoRotation();
    });
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!isAnimating) {
          track.style.transition = "none";
          track.style.transform = "translate3d(0, 0, 0)";
          updateVisibleSlides();
        }
      }, 120);
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        restartAutoRotation();
      }, { threshold: 0.12 });
      observer.observe(root);
    }

    updatePauseUI();
    updateVisibleSlides();
    restartAutoRotation();
  }

  /** Single-open FAQ accordion with keyboard navigation and no-JS readability. */
  function initFaqAccordion() {
    document.querySelectorAll("[data-faq-accordion]").forEach((accordion) => {
      const items = Array.from(accordion.querySelectorAll("[data-faq-item]"));
      const triggers = items.map((item) => item.querySelector("[data-faq-trigger]"));

      const setItemState = (item, open, animate = true) => {
        const trigger = item.querySelector("[data-faq-trigger]");
        const answer = item.querySelector("[data-faq-answer]");
        trigger.setAttribute("aria-expanded", String(open));
        item.classList.toggle("is-open", open);
        answer.hidden = !open;

        if (open && animate && !reducedMotion.matches && typeof answer.animate === "function") {
          answer.animate([
            { opacity: 0, transform: "translateY(-6px)" },
            { opacity: 1, transform: "translateY(0)" }
          ], { duration: 220, easing: "ease-out" });
        }
      };

      items.forEach((item, index) => setItemState(item, index === 0, false));

      triggers.forEach((trigger, index) => {
        trigger.addEventListener("click", () => {
          const currentItem = items[index];
          const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
          items.forEach((item) => {
            if (item !== currentItem) setItemState(item, false);
          });
          setItemState(currentItem, shouldOpen);
        });

        trigger.addEventListener("keydown", (event) => {
          let targetIndex = null;
          if (event.key === "ArrowDown") targetIndex = (index + 1) % triggers.length;
          if (event.key === "ArrowUp") targetIndex = (index - 1 + triggers.length) % triggers.length;
          if (event.key === "Home") targetIndex = 0;
          if (event.key === "End") targetIndex = triggers.length - 1;
          if (targetIndex !== null) {
            event.preventDefault();
            triggers[targetIndex].focus();
          }
        });
      });
    });
  }

  /** Keep copyright dates current without requiring annual HTML edits. */
  function initCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });
  }

  function init() {
    const modules = [
      initScrollUI,
      initNavigation,
      initActiveNavigation,
      initScrollReveal,
      initSmoothScrolling,
      initTestimonialCarousel,
      initFaqAccordion,
      initCurrentYear
    ];

    modules.forEach((module) => {
      try {
        module();
      } catch (error) {
        // Isolate a non-critical UI failure so other page features still work.
        console.error(`UI module could not initialize: ${module.name}`, error);
      }
    });
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", TaxiSite.init);
