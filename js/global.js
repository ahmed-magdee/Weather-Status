var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { languageList } from "./data.js";
import { createElement, getLocalStorage, removeAddClass, setLocalStorage, } from "./helpers.js";
import { linksLoopingNav } from "./nav.js";
const htmlElement = document.querySelector("html");
const nav = document.querySelector("nav");
const languageDiv = document.querySelector(".language-div");
const languageP = document.querySelector(".language-div p");
const spanLang = document.querySelector(".language-div p span");
const spanIconHeader = document.querySelector(".icon-menu-span");
const allDataDiv = document.querySelector(".all-data");
function directionOfPage() {
    if (getLocalStorage("language") === "" ||
        getLocalStorage("language") === "ar") {
        htmlElement.dir = "rtl";
    }
    else {
        htmlElement.dir = "ltr";
    }
}
// Set Language When We Open Page First Time Or Reload
function setLanguageInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        directionOfPage();
        if (getLocalStorage("language") === "") {
            if (spanLang) {
                spanLang.textContent = "";
                spanLang.appendChild(document.createTextNode("العربية"));
            }
            removeClassesInArabic();
            setLocalStorage({ key: "language", value: "ar" });
        }
        else {
            if (getLocalStorage("language") === "en") {
                linksLoopingNav();
                removeAddClass({ ele: allDataDiv, add: "en", remove: "ar" });
                removeAddClass({ ele: nav, add: "en", remove: "ar" });
                removeAddClass({ ele: spanIconHeader, add: "en", remove: "ar" });
                if (spanLang)
                    spanLang.textContent = "";
                spanLang === null || spanLang === void 0 ? void 0 : spanLang.appendChild(document.createTextNode("English"));
            }
            else {
                linksLoopingNav();
                removeClassesInArabic();
                if (spanLang)
                    spanLang.textContent = "";
                spanLang === null || spanLang === void 0 ? void 0 : spanLang.appendChild(document.createTextNode("العربية"));
            }
        }
    });
}
setLanguageInPage();
// Remove Classes And Add New Classes When We Change The Language
function removeClassesInArabic() {
    removeAddClass({ ele: allDataDiv, add: "ar", remove: "en" });
    removeAddClass({ ele: spanIconHeader, add: "ar", remove: "en" });
    removeAddClass({ ele: nav, add: "ar", remove: "en" });
}
// ==============================================
export function createListOfLanguagesAndModifyClasses() {
    if (languageP) {
        languageP.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!languageP.classList.contains("open")) {
                languageP.classList.add("open");
                const ul = createElement("ul", "language-list", "", languageDiv);
                languageList.forEach((lang) => {
                    const li = createElement("li", "li-language", lang.name, ul);
                    li.onclick = () => {
                        setLocalStorage({ key: "language", value: lang.lang });
                        setLanguageInPage();
                    };
                });
                setTimeout(() => {
                    ul.classList.add("open");
                }, 0);
            }
            else {
                removeAndCloseLanguagesList();
            }
        });
    }
}
// Start Change Language
document.addEventListener("click", (e) => {
    if (e.target !== languageP) {
        removeAndCloseLanguagesList();
    }
});
// Close The Languages List When We Click On Any Content
function removeAndCloseLanguagesList() {
    if (languageP === null || languageP === void 0 ? void 0 : languageP.classList.contains("open")) {
        languageP === null || languageP === void 0 ? void 0 : languageP.classList.remove("open");
        const ul = document.querySelector(".language-list");
        ul.classList.remove("open");
        setTimeout(() => {
            ul === null || ul === void 0 ? void 0 : ul.remove();
        }, 300);
    }
}
