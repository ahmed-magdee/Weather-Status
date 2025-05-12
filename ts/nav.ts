import { createElement, getLocalStorage } from "./helpers.js";

const navDiv = document.querySelector("nav div");
const nav = document.querySelector("nav");
const iconMenu = document.querySelector(".icon-menu-i");

const navContent = [
  {
    ar: "الرئيسية",
    en: "Home",
    icon: "fa-solid fa-house",
    href: "/index.html",
  },
  // {
  //   ar: "الإعدادات",
  //   en: "Settings",
  //   icon: "fa-solid fa-gear",
  //   href: "/settings.html",
  // },
];

const pathname = window.location.pathname;

export function linksLoopingNav() {
  if (navDiv) {
    navDiv.textContent = "";
    navContent.forEach((one: { [key: string]: string }) => {
      const link = createElement(
        "a",
        pathname === one.href ? "nav-link-active" : "",
        "",
        navDiv,
        one.href
      );
      link.title = one[getLocalStorage("language")];
      createElement("i", one.icon, "", link);
    });
  }
}
linksLoopingNav();

if (iconMenu) {
  iconMenu.addEventListener("click", () => {
    nav?.classList.toggle("active");
  });
}
