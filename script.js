// Tomer Zamir · Portfolio v2 · Material Tonal Chapters
// Vanilla JS, no dependencies. Progressive enhancement.

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------------------------
   * Year in footer
   * ---------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------------------
   * Local time (TLV or the user's zone)
   * ---------------------------------------------------------------------- */
  const timeEl = document.getElementById("localTime");
  const tzLabel = document.getElementById("tzLabel");
  if (timeEl) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const h = parts.find((p) => p.type === "hour")?.value || "--";
      const m = parts.find((p) => p.type === "minute")?.value || "--";
      const zone = parts.find((p) => p.type === "timeZoneName")?.value || "";
      timeEl.textContent = `${h}:${m}`;
      if (tzLabel) tzLabel.textContent = zone.replace("GMT", "UTC");
    };
    tick();
    setInterval(tick, 30_000);
  }

  /* -------------------------------------------------------------------------
   * Theme toggle — remembers, respects prefers-color-scheme, uses View
   * Transitions API where supported.
   * ---------------------------------------------------------------------- */
  const html = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const stored = (() => {
    try { return localStorage.getItem("tz-theme"); } catch { return null; }
  })();
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = stored || (systemDark ? "dark" : "light");
  html.setAttribute("data-theme", initialTheme);
  updateThemeColorMeta(initialTheme);

  function updateThemeColorMeta(t) {
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0C1B1C" : "#A6DBDC");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      const doSwap = () => {
        html.setAttribute("data-theme", next);
        updateThemeColorMeta(next);
        try { localStorage.setItem("tz-theme", next); } catch {}
      };
      if (document.startViewTransition && !prefersReducedMotion) {
        const t = document.startViewTransition(doSwap);
        t.finished.catch(() => {}); // swallow benign interruption on rapid toggle
      } else {
        doSwap();
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Topbar scroll state
   * ---------------------------------------------------------------------- */
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const onScroll = () => {
      if (window.scrollY > 12) topbar.classList.add("is-scrolled");
      else topbar.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------------
   * Dock nav — active section highlight + moving dot
   * ---------------------------------------------------------------------- */
  const dockLinks = Array.from(document.querySelectorAll(".dock a"));
  const dockDot = document.querySelector(".dock__dot");
  const sections = ["#hero", "#work", "#about", "#contact"]
    .map((s) => document.querySelector(s))
    .filter(Boolean);

  const moveDockDotTo = (link) => {
    if (!dockDot || !link) return;
    const dockRect = link.parentElement.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const center = linkRect.left - dockRect.left + linkRect.width / 2 - 3;
    dockDot.style.transform = `translateX(${center}px)`;
  };

  if ("IntersectionObserver" in window && sections.length) {
    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            dockLinks.forEach((link) => {
              const active = link.getAttribute("href") === id;
              if (active) {
                link.setAttribute("aria-current", "true");
                moveDockDotTo(link);
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => activeObs.observe(s));
  }

  // Initial dot position — set to first active
  const settleDockDot = () => {
    const active = dockLinks.find((l) => l.getAttribute("aria-current") === "true") || dockLinks[0];
    moveDockDotTo(active);
  };
  requestAnimationFrame(settleDockDot);
  // Coalesce resize work into a single frame to avoid layout thrash
  let resizeQueued = false;
  window.addEventListener("resize", () => {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      settleDockDot();
    });
  }, { passive: true });

  /* -------------------------------------------------------------------------
   * Reveal on scroll
   * ---------------------------------------------------------------------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if (revealables.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    revealables.forEach((el) => obs.observe(el));
  }

  /* -------------------------------------------------------------------------
   * Hero title ambient settle (one-shot on load)
   * ---------------------------------------------------------------------- */
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    requestAnimationFrame(() => heroTitle.classList.add("is-loaded"));
  }

  /* -------------------------------------------------------------------------
   * Ripple effect on [data-ripple] elements
   * ---------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document.addEventListener("pointerdown", (e) => {
      const el = e.target.closest("[data-ripple]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  /* -------------------------------------------------------------------------
   * Video thumb play on hover of workindex rows
   * ---------------------------------------------------------------------- */
  document.querySelectorAll(".workindex__link").forEach((row) => {
    const video = row.querySelector("video");
    if (!video) return;
    const play = () => video.play().catch(() => {});
    const pause = () => video.pause();
    row.addEventListener("mouseenter", play);
    row.addEventListener("focus", play, true);
    row.addEventListener("mouseleave", pause);
    row.addEventListener("blur", pause, true);
  });

  /* -------------------------------------------------------------------------
   * Contact form — dual-signal success on submit
   * ---------------------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      // Progressive enhancement — only intercept if fetch is available
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      // Reset any prior result state so success/error stay mutually exclusive
      form.classList.remove("is-success", "is-error");
      status.textContent = "";
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.classList.add("is-success");
          status.innerHTML = "✓&nbsp;&nbsp;Message sent — I'll reply within a day.";
          form.reset();
        } else {
          form.classList.add("is-error");
          status.textContent = "Something went wrong. Try email instead.";
        }
      } catch {
        // network failure — fall back to native submit
        form.submit();
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Easter egg — triple-click the topbar logo to launch the sailboat.
   * ---------------------------------------------------------------------- */
  const brand = document.querySelector(".topbar__mark");
  const sailboat = document.getElementById("sailboat");
  if (brand && sailboat && !prefersReducedMotion) {
    let clickCount = 0;
    let clickTimer = null;
    let sailing = false;
    let sailFallback = null;

    /* Idle hint: after a few still seconds, a cursor appears and "taps" the
       logo to invite a click. Retired for good once the egg is discovered.
       Only on devices with a real pointer. */
    const hint = document.getElementById("logoHint");
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const IDLE_MS = 5000;
    let idleTimer = null;
    let discovered = false;

    const hideHint = () => { if (hint) hint.classList.remove("is-visible"); };
    const resetIdle = () => {
      hideHint();
      clearTimeout(idleTimer);
      if (hint && hasPointer && !discovered) {
        idleTimer = setTimeout(() => {
          if (!discovered) hint.classList.add("is-visible");
        }, IDLE_MS);
      }
    };
    if (hint && hasPointer) {
      ["scroll", "mousemove", "keydown", "pointerdown", "wheel", "touchstart"]
        .forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
      resetIdle();
    }

    brand.addEventListener("click", () => {
      clickCount++;
      clearTimeout(clickTimer);
      if (clickCount >= 3) {
        clickCount = 0;
        launchSailboat();
      } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 600);
      }
    });

    const stopSailing = () => {
      sailboat.classList.remove("is-swinging");
      sailing = false;
      clearTimeout(sailFallback);
    };

    function launchSailboat() {
      // discovered — retire the idle hint for the rest of the session
      discovered = true;
      hideHint();
      clearTimeout(idleTimer);

      if (sailing) return;
      sailing = true;
      sailboat.classList.remove("is-swinging");
      void sailboat.offsetWidth; // force reflow so a re-trigger restarts cleanly
      sailboat.classList.add("is-swinging");
      sailboat.addEventListener("animationend", stopSailing, { once: true });
      sailboat.addEventListener("animationcancel", stopSailing, { once: true });
      // Safety net: if animationend never fires (e.g. animation suppressed),
      // clear the guard so the egg stays re-triggerable. 4.6s anim + margin.
      clearTimeout(sailFallback);
      sailFallback = setTimeout(stopSailing, 6000);
    }
  }
})();
