const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);

// Donation Box
const donationDialog = document.querySelector(".donation-dialog");
const donationOpeners = document.querySelectorAll("[data-donate-open]");
const donationClosers = document.querySelectorAll("[data-donate-close]");

donationOpeners.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.preventDefault();
    donationDialog?.showModal();
  }),
);

donationClosers.forEach((button) =>
  button.addEventListener("click", () => {
    donationDialog?.close();
  }),
);

donationDialog?.addEventListener("click", (event) => {
  if (event.target === donationDialog) donationDialog.close();
});

// Language Toggle
const languageToggle = document.querySelector(".language-toggle");
<<<<<<< HEAD

languageToggle?.addEventListener("click", () => {
  const chineseMode = document.body.classList.toggle("zh-mode");
  languageToggle.setAttribute("aria-pressed", String(chineseMode));
=======
const languagePreferenceKey = "nccuncaf-language";

const setLanguage = (useChinese) => {
  document.documentElement.classList.toggle("zh-mode", useChinese);
  document.body.classList.toggle("zh-mode", useChinese);
  languageToggle?.setAttribute("aria-pressed", String(useChinese));
};

try {
  setLanguage(localStorage.getItem(languagePreferenceKey) === "zh");
} catch {
  // Keep the default language if browser storage is unavailable.
  setLanguage(false);
}

languageToggle?.addEventListener("click", () => {
  const chineseMode = !document.body.classList.contains("zh-mode");
  setLanguage(chineseMode);

  try {
    localStorage.setItem(languagePreferenceKey, chineseMode ? "zh" : "en");
  } catch {
    // The current page switches even if browser storage is unavailable.
  }
>>>>>>> site
});

const teamTabs = document.querySelectorAll("[data-team-tab]");
const teamPanels = document.querySelectorAll("[data-team-panel]");

teamTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const group = tab.dataset.teamTab;

    teamTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    teamPanels.forEach((panel) => {
      const isActive = panel.dataset.teamPanel === group;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const homeHeaderBrand = document.querySelector(
  '.site-header .brand[href="#top"]',
);

homeHeaderBrand?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
