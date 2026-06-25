/* =================================================================
   POLÍTICAMENTE CORRECTO — Interacciones (JavaScript vanilla)
   Sin dependencias. Cero errores en consola.
     1. Nav: transparente → sólida al hacer scroll
     2. Menú móvil (hamburguesa)
     3. Smooth scroll + cierre de menú al navegar
     4. Scroll reveal con IntersectionObserver
     5. Comparador de paquetes (toggle Básico / Premium)
     6. Acordeón (sección "Por qué cuesta")
     7. Año dinámico en el footer
   ================================================================= */
(function () {
  "use strict";

  /* ---- 1. NAV sólida al hacer scroll --------------------------- */
  const nav = document.querySelector("[data-nav]");
  const SOLID_AT = 40; // px de scroll para volverse sólida

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-solid", window.scrollY > SOLID_AT);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // estado inicial

  /* ---- 2. Menú móvil ------------------------------------------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    menu.classList.remove("is-open");
  }
  function openMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    menu.classList.add("is-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- 3. Smooth scroll + cierre de menú ----------------------- */
  // El smooth scroll real lo da CSS (scroll-behavior). Aquí solo
  // cerramos el menú móvil y damos foco al destino por accesibilidad.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Foco accesible sin volver a saltar el scroll
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- 4. Scroll reveal (IntersectionObserver) ----------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: mostrar todo si no hay soporte
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- 5. Comparador de paquetes ------------------------------- */
  // En móvil y tablet se ve un plan a la vez y el toggle desliza el carrusel.
  // En escritorio (CSS ≥992px) se ven los dos y el efecto es por hover.
  const toggleBtns = document.querySelectorAll("[data-plan-btn]");
  const toggleWrap = document.querySelector(".plan-toggle");
  const plansViewport = document.querySelector(".plans-viewport");

  function setActivePlan(plan) {
    if (toggleWrap) toggleWrap.setAttribute("data-active", plan);
    if (plansViewport) plansViewport.setAttribute("data-active", plan);

    toggleBtns.forEach(function (btn) {
      const isActive = btn.getAttribute("data-plan-btn") === plan;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  if (toggleBtns.length) {
    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActivePlan(btn.getAttribute("data-plan-btn"));
      });
    });
    // Estado inicial: empezamos en Básico (a la izquierda del carrusel)
    setActivePlan("basico");
  }

  /* ---- 6. Acordeón --------------------------------------------- */
  const accordion = document.querySelector("[data-accordion]");

  if (accordion) {
    const items = accordion.querySelectorAll(".accordion__item");

    function setPanelHeight(item, open) {
      const panel = item.querySelector(".accordion__panel");
      if (!panel) return;
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : null;
    }

    items.forEach(function (item) {
      const trigger = item.querySelector(".accordion__trigger");
      if (!trigger) return;

      // Estado inicial (el primero viene abierto desde el HTML)
      setPanelHeight(item, item.classList.contains("is-open"));

      trigger.addEventListener("click", function () {
        const willOpen = !item.classList.contains("is-open");

        // Cierra los demás (comportamiento tipo acordeón)
        items.forEach(function (other) {
          if (other === item) return;
          other.classList.remove("is-open");
          const t = other.querySelector(".accordion__trigger");
          if (t) t.setAttribute("aria-expanded", "false");
          setPanelHeight(other, false);
        });

        item.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
        setPanelHeight(item, willOpen);
      });
    });

    // Recalcula alturas si cambia el tamaño de la ventana
    window.addEventListener("resize", function () {
      items.forEach(function (item) {
        if (item.classList.contains("is-open")) setPanelHeight(item, true);
      });
    });
  }

  /* ---- 7. Año dinámico ----------------------------------------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
