const LANG_KEY = "preferredLanguage";
const DEFAULT_LANG = "English";
let translations = {};

const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujarati");

/* Apply saved language immediately to avoid English flash */
const savedLangOnStart = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

if (savedLangOnStart === "Hindi") {
  document.documentElement.lang = "Hindi";
  document.documentElement.setAttribute("data-lang", "hi");
  document.body?.setAttribute("data-lang", "hi");
} else if (savedLangOnStart === "Gujarati") {
  document.documentElement.lang = "Gujarati";
  document.documentElement.setAttribute("data-lang", "gu");
  document.body?.setAttribute("data-lang", "gu");
} else {
  document.documentElement.lang = "English";
  document.documentElement.setAttribute("data-lang", "en");
  document.body?.setAttribute("data-lang", "en");
}

function setActiveButton(activeBtn) {
  [btnEn, btnHi, btnGu].forEach((btn) => btn?.classList.remove("active"));
  activeBtn?.classList.add("active");
}

function applyLanguage(lang) {
  const langData = translations[lang];
  if (!langData) return;

  document.documentElement.lang = lang;

  if (lang === "English") {
    document.documentElement.setAttribute("data-lang", "en");
    document.body.setAttribute("data-lang", "en");
    setActiveButton(btnEn);
  } else if (lang === "Hindi") {
    document.documentElement.setAttribute("data-lang", "hi");
    document.body.setAttribute("data-lang", "hi");
    setActiveButton(btnHi);
  } else if (lang === "Gujarati") {
    document.documentElement.setAttribute("data-lang", "gu");
    document.body.setAttribute("data-lang", "gu");
    setActiveButton(btnGu);
  }

  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    const value = langData[key];

    if (value !== undefined) {
      if (
        typeof value === "string" &&
        (value.includes("<br>") || value.includes("<br/>") || value.includes("<br />"))
      ) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });

  localStorage.setItem(LANG_KEY, lang);
}

async function loadTranslations() {
  try {
    const response = await fetch("./assets/json/data.json", {
      cache: "no-store",
    });

    translations = await response.json();

    const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    applyLanguage(savedLang);
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
}

function setActivePage() {
  const pageLinks = document.querySelectorAll(".pages .page");
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  pageLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initPageTransitions() {
  document.body.classList.add("loaded");

  document.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel")
    )
      return;

    link.addEventListener("click", function (e) {
      if (e.defaultPrevented) return;

      e.preventDefault();
      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const topicsContainer = document.querySelector(".topics");
  const topicLinks = document.querySelectorAll(".topics .topic");

  topicLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetPage = this.getAttribute("href");

      if (topicsContainer?.classList.contains("roll-up")) return;

      topicsContainer?.classList.add("roll-up");
      topicsContainer.style.pointerEvents = "none";

      setTimeout(() => {
        window.location.href = targetPage;
      }, 550);
    });
  });

  btnEn?.addEventListener("click", () => applyLanguage("English"));
  btnHi?.addEventListener("click", () => applyLanguage("Hindi"));
  btnGu?.addEventListener("click", () => applyLanguage("Gujarati"));

  setActivePage();
  loadTranslations();
  initPageTransitions();
});

console.log("App initialized");