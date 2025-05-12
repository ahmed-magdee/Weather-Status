import { conditionStatus, days, temVariable } from "./data.js";
// Start LocalStorage
export function getLocalStorage(value) {
    const localstorage = window.localStorage.getItem(value);
    if (localstorage) {
        return localstorage;
    }
    return "";
}
export function setLocalStorage(value) {
    if (typeof value.value !== "string") {
        window.localStorage.setItem(value.key, JSON.stringify(value.value));
    }
    else {
        window.localStorage.setItem(value.key, value.value);
    }
}
// End LocalStorage
// Start SessionStorage
export function getSessionStorage(value) {
    const localstorage = window.sessionStorage.getItem(value);
    if (localstorage) {
        const data = JSON.parse(localstorage);
        return data;
    }
    return "";
}
export function setSessionStorage(value) {
    if (typeof value.value !== "string") {
        window.sessionStorage.setItem(value.key, JSON.stringify(value.value));
    }
    else {
        window.sessionStorage.setItem(value.key, value.value);
    }
}
// End SessionStorage
export function getDay(day, lang) {
    const date = new Date().toString().split(" ");
    const today = date[0];
    const numberOfDay = date[2];
    const theDay = new Date(day).toString().split(" ")[0];
    const theDate = new Date(day).toString().split(" ")[2];
    const dayWant = days.find((day) => day.en.toLowerCase() === theDay.toLowerCase());
    return theDay.toLowerCase() === today.toLowerCase() && numberOfDay === theDate
        ? lang == "ar"
            ? "اليوم"
            : "Today"
        : lang == "ar"
            ? dayWant[lang]
            : dayWant.enName || "";
}
// Start Functions
export function createElement(ele, classes, data, elementAppend, href, src, alt) {
    const element = document.createElement(ele);
    if (data) {
        element.appendChild(document.createTextNode(data));
    }
    if (classes) {
        element.className = classes;
    }
    if (ele === "a") {
        element.href = href;
    }
    else if (ele === "img") {
        element.src = src;
        element.alt = alt;
    }
    if (elementAppend) {
        elementAppend.appendChild(element);
    }
    return element;
}
export function weatherForecast(weather, lang) {
    const status = conditionStatus.find((one) => one.en.toLowerCase() === weather.toLowerCase());
    return (lang === "ar" ? status === null || status === void 0 ? void 0 : status.ar : status === null || status === void 0 ? void 0 : status.en) || "";
}
export function createImageWeather(type, icon, lang) {
    return (weatherForecast(type, lang) === "صافِ" ||
        weatherForecast(type, lang) === "Clear") &&
        icon.includes("night")
        ? "imgs/clear-night.png"
        : (weatherForecast(type, lang) === "صافِ" ||
            weatherForecast(type, lang) === "Clear") &&
            icon.includes("day")
            ? "imgs/sunny.png"
            : (weatherForecast(type, lang) === "غائم جزئياً" ||
                weatherForecast(type, lang) === "Partially cloudy") &&
                icon.includes("day")
                ? "imgs/sun-cloud.png"
                : (weatherForecast(type, lang) === "غائم جزئياً" ||
                    weatherForecast(type, lang) === "Partially cloudy") &&
                    icon.includes("night")
                    ? "imgs/night-cloud.svg"
                    : weatherForecast(type, lang) === "غائم" ||
                        weatherForecast(type, lang) === "Overcast"
                        ? "imgs/night-all-cloud.svg"
                        : weatherForecast(type, lang) === "مطر، غائم جزئياً" ||
                            weatherForecast(type, lang) === "Rain, Partially cloudy"
                            ? "imgs/rain.png"
                            : weatherForecast(type, lang) === "ثلج، مطر، غائم" ||
                                weatherForecast(type, lang) === "ثلوج، مطر، غائم جزئيا" ||
                                weatherForecast(type, lang) === "Snow, Rain, cloudy" ||
                                weatherForecast(type, lang) === "Snow, Rain, Partially cloudy"
                                ? "imgs/snow-storm.svg"
                                : weatherForecast(type, lang) === "ثلوج، غائم جزئيا" ||
                                    weatherForecast(type, lang) === "Snow, Partially cloudy"
                                    ? "imgs/snow.svg"
                                    : "";
}
// weatherForecast(type) === "غائم"
// weatherForecast(type) === "غائم جزئياً"
//"مطر، غائم جزئياً"
// "ثلج، مطر، غائم"
// "صافِ"
export function toDegree(temp) {
    const temperature = getLocalStorage("temperature");
    return ("°" +
        (temperature === "م" || temperature === "C"
            ? Math.round((temp - 32) / 1.8)
            : Math.round(temp)));
}
export function hoursWithAmAndPm(hour, lang) {
    const hourSplit = hour.split(":");
    const hourOnly = +hourSplit[0];
    return hourOnly > 12
        ? hourOnly - 12 + (lang == "ar" ? " م" : " PM ")
        : hourOnly < 12 && hourOnly !== 0
            ? hourOnly + " " + (lang == "ar" ? " ص" : " AM ")
            : lang == "ar"
                ? "12 م"
                : "12 PM";
}
export function windSpeedFunction(windspeed) {
    const km = (1.60934 * windspeed).toFixed(2);
    return km;
}
export function compass(element, degree, lang, windspeed, windgust) {
    const container = createElement("div", "compass-container", "", element);
    const compass = createElement("div", "compass", "", container);
    const span = createElement("span", "", "", compass);
    span.style.transform = `rotate(${degree}deg)`;
    if (windspeed && !windgust) {
        const pWindspeed = createElement("p", "", windSpeedFunction(windspeed), container);
        createElement("span", "", lang == "ar" ? "كم/س " : " km/h", pWindspeed);
    }
    else if (windspeed && windgust) {
        const div = createElement("div", "", "", container);
        createElement("p", "", (lang == "ar" ? "سرعة الرياح: " : "Wind Speed: ") +
            windSpeedFunction(windspeed) +
            (lang == "ar" ? " كم/س" : " km/h"), div);
        createElement("p", "", (lang == "ar" ? "هبات الرياح: " : "Wind Gust: ") +
            windSpeedFunction(windgust) +
            (lang == "ar" ? " كم/س" : " km/h"), div);
    }
    return container;
}
export function removeAddClass({ ele, add, remove, }) {
    ele === null || ele === void 0 ? void 0 : ele.classList.remove(remove);
    ele === null || ele === void 0 ? void 0 : ele.classList.add(add);
}
export function buttonChangeTem(parent) {
    const lang = getLocalStorage("language");
    const temperatureSession = getLocalStorage("temperature");
    const button = createElement("button", "temperature-button right", "", parent);
    button.type = "button";
    button.ariaLabel = "change temperature";
    createElement("span", "", lang == "ar" ? "م" : "C", button);
    createElement("span", "", lang == "ar" ? "ف" : "F", button);
    if (lang == "ar") {
        button.classList.add("ar");
    }
    if (temperatureSession == "") {
        setLocalStorage({ key: "temperature", value: temVariable[lang].c });
    }
    else {
        if (temperatureSession == "F" || temperatureSession == "ف") {
            button.classList.remove("right");
        }
    }
    button.onclick = function (e) {
        this.classList.toggle("right");
        checkTemperatureFromButton(button, lang);
    };
    checkTemperatureFromButton(button, lang);
}
function checkTemperatureFromButton(button, lang) {
    if (button.classList.contains("right")) {
        setLocalStorage({ key: "temperature", value: temVariable[lang].c });
    }
    else {
        setLocalStorage({ key: "temperature", value: temVariable[lang].f });
    }
}
export function createAnimation(element) {
    const divContainer = createElement("div", "animation-container", "", element);
    createElement("span", "", "", divContainer);
    createElement("span", "", "", divContainer);
    createElement("span", "", "", divContainer);
}
// End Functions
