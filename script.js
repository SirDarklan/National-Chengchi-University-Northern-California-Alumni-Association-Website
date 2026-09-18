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
});

const teamDetailsDialog = document.querySelector(".team-details-dialog");
const teamDetailsPhoto = document.querySelector(".team-details-dialog__photo");
const teamDetailsName = document.querySelector("#team-details-name");
const teamDetailsTitle = document.querySelector(".team-details-dialog__title");
const teamDetailsBio = document.querySelector(".team-details-dialog__bio");

document.querySelectorAll(".team-member").forEach((member) => {
  const memberPhoto = member.querySelector(
    ".team-member-photo, .team-photo-placeholder",
  );
  const memberName = member.querySelector(".team-member-copy h2");

  if (!memberPhoto || !memberName || !teamDetailsDialog) return;

  const openTeamDetails = () => {
    const memberTitle = member.querySelector(".team-member-title");
    const memberBio = member.querySelectorAll(
      ".team-member-copy > p:not(.team-member-title)",
    );

    teamDetailsPhoto?.replaceChildren(memberPhoto.cloneNode(true));
    if (teamDetailsName) teamDetailsName.textContent = memberName.textContent;
    if (teamDetailsTitle) {
      teamDetailsTitle.textContent = memberTitle?.textContent.trim() || "";
    }
    teamDetailsBio?.replaceChildren(
      ...[...memberBio].map((paragraph) => paragraph.cloneNode(true)),
    );
    teamDetailsDialog.showModal();
  };

  memberPhoto.dataset.teamDetailsTrigger = "true";
  memberPhoto.tabIndex = 0;
  memberPhoto.setAttribute("role", "button");
  memberPhoto.setAttribute(
    "aria-label",
    `View details for ${memberName.textContent}`,
  );
  memberPhoto.addEventListener("click", openTeamDetails);
  memberPhoto.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTeamDetails();
    }
  });
});

document
  .querySelector("[data-team-details-close]")
  ?.addEventListener("click", () => {
    teamDetailsDialog?.close();
  });

teamDetailsDialog?.addEventListener("click", (event) => {
  if (event.target === teamDetailsDialog) teamDetailsDialog.close();
});

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
