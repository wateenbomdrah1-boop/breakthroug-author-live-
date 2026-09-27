// Breakthrough Author Live — landing page interactions
// Mobile menu toggle + accessible FAQ accordion. No tracking, no external calls.

document.addEventListener("DOMContentLoaded", function () {
  // Light/Dark mode toggle — persisted in localStorage, default is the
  // original light design (no attribute / no stored value = light).
  var themeToggle = document.getElementById("theme-toggle");
  var root = document.documentElement;

  function setTheme(isDark) {
    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    try {
      localStorage.setItem("bal-theme", isDark ? "dark" : "light");
    } catch (e) {}
  }

  if (themeToggle) {
    // Sync button state with whatever the head script already applied.
    setTheme(root.getAttribute("data-theme") === "dark");

    themeToggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") !== "dark");
    });
  }

  // Mobile nav toggle
  var menuToggle = document.querySelector(".menu-toggle");
  var siteNav = document.getElementById("site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Accessible FAQ accordion
  var faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(button.getAttribute("aria-controls"));

      // Close all other answers (single-open accordion)
      faqButtons.forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          var otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) {
        answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
      }
    });
  });

  // Video placeholder click — reminder that this needs the real VSL embed
  var videoPlaceholder = document.querySelector("[data-video-placeholder]");
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener("click", function () {
      videoPlaceholder.querySelector(".video-frame__note").textContent =
        "Replace this block with your embedded VSL (YouTube/Vimeo/Wistia)";
    });
  }
});
