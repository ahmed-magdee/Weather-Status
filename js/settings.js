import { createListOfLanguagesAndModifyClasses } from "./global.js";
import { getLocalStorage } from "./helpers.js";
createListOfLanguagesAndModifyClasses();
const h1 = document.querySelector("h1");
const data = document.querySelector(".data");
document.addEventListener("click", (e) => {
    const lis = document.querySelectorAll(".li-language");
    lis.forEach((one) => {
        if (e.target == one) {
            changeH1Text();
        }
    });
});
export function changeH1Text() {
    if (h1) {
        const language = getLocalStorage("language");
        if (language == "ar") {
            h1.textContent = "الإعدادات";
        }
        else {
            h1.textContent = "Settings";
        }
    }
}
changeH1Text();
