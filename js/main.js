var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KEY } from "./Api.js";
import { cities } from "./cities.js";
import { dayDetails, days, detailOfDay } from "./data.js";
import { createListOfLanguagesAndModifyClasses } from "./global.js";
import { buttonChangeTem, compass, createAnimation, createElement, createImageWeather, getDay, getLocalStorage, getSessionStorage, hoursWithAmAndPm, setSessionStorage, toDegree, weatherForecast, } from "./helpers.js";
const form = document.forms[0];
const input = document.querySelector("form input");
const searchIconInLabel = document.querySelector(".search-icon");
const deleteCityIcon = document.querySelector(".delete-search");
const dataDiv = document.querySelector(".data");
// Stop The Default Of The Form
form.onsubmit = (e) => {
    e.preventDefault();
};
// Variable For Storing Data
let dataFetching = {};
createListOfLanguagesAndModifyClasses(); // Create Languages List And Modify Classes Whether Enlish Or Arabic
// When We Click On The Li Language And Change The Content WIth the language
document.addEventListener("click", (e) => {
    const lis = document.querySelectorAll(".li-language");
    const ul = document.querySelector(".cities");
    const language = getLocalStorage("language");
    lis.forEach((one) => {
        if (e.target == one) {
            createDivsAndLoopingOnData(dataFetching);
        }
    });
    if (e.target === document.querySelector(".temperature-button") ||
        e.target === document.querySelectorAll(".temperature-button span")[0] ||
        e.target === document.querySelectorAll(".temperature-button span")[1]) {
        createDivsAndLoopingOnData(dataFetching);
    }
    else if (e.target === input) {
        if (!ul) {
            const ulCreated = createElement("ul", "cities", "", form);
            const newCities = cities.filter((one) => one[language].toLowerCase().includes(e.target.value.toLowerCase()));
            createLisCities(language, newCities, ulCreated);
            setTimeout(() => {
                ulCreated.classList.add("open");
            }, 0);
        }
    }
    else if (e.target !== deleteCityIcon) {
        const ul = document.querySelector(".cities");
        if (ul) {
            ul.classList.remove("open");
            setTimeout(() => {
                ul.remove();
            }, 300);
        }
    }
    else {
        input.value = "";
        if (ul === null || ul === void 0 ? void 0 : ul.classList.contains("open")) {
            ul.textContent = "";
            createLisCities(language, cities, ul);
        }
    }
});
// When We Write In Input Field
input.addEventListener("input", (e) => {
    filtercities(e);
});
// Filering Cities When Writing In Input
function filtercities(e) {
    const ulCities = document.querySelector(".cities");
    const language = getLocalStorage("language");
    const inputValue = e.target.value;
    setTimeout(() => {
        if (ulCities) {
            if (inputValue !== "") {
                ulCities.textContent = "";
                const newCities = cities.filter((one) => one[language].toLowerCase().includes(inputValue.toLowerCase()));
                createLisCities(language, newCities, ulCities);
                if (newCities.length == 0) {
                    createElement("li", "city-none", language == "en" ? "City not found" : "لم يتم العثور علي المدينة", ulCities);
                }
            }
            else {
                setTimeout(() => {
                    ulCities.textContent = "";
                    createLisCities(language, cities, ulCities);
                }, 300);
            }
        }
    }, 300);
}
// Create Lis Cities filter
function createLisCities(lang, cities, element) {
    cities.forEach((city) => {
        const li = createElement("li", "", city[lang], element);
        li.onclick = () => {
            input.value = city[lang];
            getDataWeather(city.id);
        };
    });
}
// ("C°");
// Get Session Data If Existed We Make The DataFetching Veriable Equal The Data In Session Storage
const sessionData = getSessionStorage("weatherData");
if (sessionData) {
    dataFetching = sessionData[sessionData.length - 1];
    createDivsAndLoopingOnData(dataFetching);
}
else {
    getDataWeather("الاسكندرية,مصر");
}
// Get Data Weather When Click City Or If There Is Not Data In Session Storage
function getDataWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionData = getSessionStorage("weatherData");
        if (sessionData) {
            const cityExistsInSessionIndex = sessionData.findIndex((one) => one.address === city);
            if (cityExistsInSessionIndex !== -1) {
                dataFetching = sessionData[cityExistsInSessionIndex];
                const spliceCityFromSession = sessionData.splice(cityExistsInSessionIndex, 1)[0];
                sessionData.push(spliceCityFromSession);
                setSessionStorage({ key: "weatherData", value: sessionData });
                createDivsAndLoopingOnData(dataFetching);
            }
            else {
                fetchingDataWeather(city);
            }
        }
        else {
            fetchingDataWeather("الاسكندرية,مصر");
        }
    });
}
function fetchingDataWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        dataDiv.textContent = "";
        createAnimation(dataDiv);
        const response = yield fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?key=${KEY}`);
        const data = yield response.json();
        dataFetching = data;
        const sessionData = getSessionStorage("weatherData");
        setSessionStorage({
            key: "weatherData",
            value: [...sessionData, dataFetching],
        });
        createDivsAndLoopingOnData(dataFetching);
    });
}
// Main Function To Create And Loop Divs
function createDivsAndLoopingOnData(data) {
    dataDiv.textContent = "";
    const lang = getLocalStorage("language");
    searchIconInLabel === null || searchIconInLabel === void 0 ? void 0 : searchIconInLabel.classList.remove("ar");
    searchIconInLabel === null || searchIconInLabel === void 0 ? void 0 : searchIconInLabel.classList.remove("en");
    searchIconInLabel === null || searchIconInLabel === void 0 ? void 0 : searchIconInLabel.classList.add(lang);
    deleteCityIcon === null || deleteCityIcon === void 0 ? void 0 : deleteCityIcon.classList.remove("ar");
    deleteCityIcon === null || deleteCityIcon === void 0 ? void 0 : deleteCityIcon.classList.remove("en");
    deleteCityIcon === null || deleteCityIcon === void 0 ? void 0 : deleteCityIcon.classList.add(lang);
    createTitleDivs(data, lang);
    createTodayDetails(data, lang);
    createDayDetails(data, lang);
    sevenDayWeatherForscast(data, lang);
    animateDivs();
}
// Create The Title Div
function createTitleDivs(data, lang) {
    const titleContainerAllData = createElement("div", "title-container animate-div custom-div", "", dataDiv);
    const addressDivAndButton = createElement("div", "address-and-button", "", titleContainerAllData);
    const addressDiv = createElement("div", "address-div", "", addressDivAndButton);
    buttonChangeTem(addressDivAndButton);
    createElement("i", "fa-solid fa-location-dot", "", addressDiv);
    createElement("p", "", data.address.split(",")[0], addressDiv);
    const titleDiv = createElement("div", "title-div", "", titleContainerAllData);
    const rightColumnDiv = createElement("div", "title-right-div", "", titleDiv);
    const dayDiv = createElement("div", "day-div", "", rightColumnDiv);
    const day = days.find((day) => day.en.toLocaleLowerCase() ===
        new Date(data.days[0].datetime).toString().split(" ")[0].toLowerCase());
    createElement("h1", "", lang == "en"
        ? day.enName[0].toUpperCase() + day.enName.slice(1).toLowerCase()
        : day[lang], dayDiv);
    createElement("span", "", data.days[0].datetime, dayDiv);
    const temperatureDiv = createElement("div", "temperature-div", "", rightColumnDiv);
    createElement("h2", "", toDegree(data.currentConditions.temp), temperatureDiv);
    createElement("p", "", (lang == "ar" ? "المحسوسة الآن: " : "Feels like: ") +
        toDegree(data.currentConditions.feelslike), temperatureDiv);
    createElement("p", "", `${lang == "ar" ? "النهار: " : "Day "}${toDegree(data.days[0].tempmax)} ${lang == "ar" ? "الليل: " : "Night: "} ${toDegree(data.days[0].tempmin)}`, temperatureDiv);
    const imgDiv = createElement("div", "title-img-div", "", titleDiv);
    createElement("img", "", "", imgDiv, null, createImageWeather(data.currentConditions.conditions, data.currentConditions.icon, lang), "weather image");
    const div = createElement("div", "", "", imgDiv);
    createElement("h2", "", weatherForecast(data.currentConditions.conditions, lang), div);
    createElement("p", "", (lang === "ar"
        ? "إحتمالية تساقط الأمطار اليوم: "
        : "Chance of rain today: ") +
        data.days[0].precipprob +
        "%" +
        " ", div);
}
// Create Today Details Divs
function createTodayDetails(data, lang) {
    const detailsDiv = createElement("div", "main-details-div animate-div custom-div", "", dataDiv);
    const rightDiv = createElement("div", "", "", detailsDiv);
    createElement("h2", "h2", lang == "ar" ? "توقعات اليوم" : "Day Forecast", rightDiv);
    const divContainerSlider = createElement("div", "div-container-hours overflow-x gradient", "", rightDiv);
    const div = createElement("div", "hours-slider-div", "", divContainerSlider);
    const daysOneAndTwo = [data.days[0], data.days[1]];
    daysOneAndTwo === null || daysOneAndTwo === void 0 ? void 0 : daysOneAndTwo.forEach((day) => {
        day.hours.forEach((hour) => {
            if (Number(hour.datetime.split(":")[0]) < new Date().getHours() &&
                +day.datetime.split("-")[2] === new Date().getDate()) {
                return;
            }
            else {
                const oneDiv = createElement("div", "hour-div", "", div);
                createElement("h3", "", hoursWithAmAndPm(hour.datetime, lang), oneDiv);
                createElement("img", "", "", oneDiv, null, createImageWeather(hour.conditions, hour.icon, lang), "hours-image");
                compass(oneDiv, hour.winddir, lang, hour.windspeed);
                if (hour.precipprob) {
                    const div = createElement("div", "precipprob", "", oneDiv);
                    createElement("i", "fa-solid fa-cloud-rain", "", div);
                    createElement("p", "", hour.precipprob + "%", div);
                }
                createElement("p", "", toDegree(hour.temp), oneDiv);
            }
        });
    });
}
// Day Details Div
function createDayDetails(data, lang) {
    const mainDivDetails = createElement("div", "day-details animate-div custom-div", "", dataDiv);
    createElement("h2", "h2", lang == "ar" ? "تفاصيل اليوم" : "Day details", mainDivDetails);
    const detailTheDay = detailOfDay.find((one) => one.en.toLowerCase() === data.days[0].description.toLowerCase());
    createElement("p", "", lang == "ar" && detailTheDay
        ? detailTheDay === null || detailTheDay === void 0 ? void 0 : detailTheDay.ar
        : lang == "en"
            ? data.days[0].description
            : data.days[0].description, mainDivDetails);
    const dataUl = createElement("ul", "gradient", "", mainDivDetails);
    dayDetails.forEach((one) => {
        const li = createElement("li", lang, "", dataUl);
        createElement("i", one.icon + " " + "text-gradient", "", li);
        const dataText = one.en.toLowerCase() === "cloudcover"
            ? data.days[0].cloudcover + "%"
            : one.en.toLowerCase() === "conditions"
                ? weatherForecast(data.days[0].conditions, lang)
                : one.en.toLowerCase() === "humidity"
                    ? data.days[0].humidity + "%"
                    : one.en.toLowerCase() === "pressure"
                        ? data.days[0].pressure + (lang == "ar" ? "مليبار " : " hPa")
                        : toDegree(data.days[0].dew);
        createElement("p", lang, lang == "ar" ? one.ar : one.en[0].toUpperCase() + one.en.slice(1), li);
        createElement("span", lang, dataText.toString(), li);
    });
}
// 7 day weather forecast
function sevenDayWeatherForscast(data, lang) {
    const mainDiv = createElement("div", "seven-day-weather animate-div custom-div", "", dataDiv);
    createElement("h2", "h2", lang == "ar" ? "التوقعات لـ 7 أيام" : "7 Day Forecast", mainDiv);
    const ulContainer = createElement("div", "ul-container-seven-days overflow-x", "", mainDiv);
    const ulDays = createElement("ul", "", "", ulContainer);
    data.days.forEach((day) => {
        const li = createElement("li", "gradient", "", ulDays);
        const temContainer = createElement("div", "", "", li);
        const temDivDay = createElement("div", "", "", temContainer);
        createElement("h2", "", toDegree(day.tempmax), temDivDay);
        createElement("span", "", lang == "ar" ? "النهار" : "Day", temDivDay);
        const temDivNight = createElement("div", "", "", temContainer);
        createElement("h2", "", toDegree(day.tempmin), temDivNight);
        createElement("span", "", lang == "ar" ? "الليل" : "Night", temDivNight);
        const dayAndImage = createElement("div", "", "", li);
        createElement("img", "", "", dayAndImage, null, createImageWeather(day.conditions, day.icon, lang), "day image");
        compass(li, day.winddir, lang, day.windspeed, day.windgust);
        createElement("p", "", weatherForecast(day.conditions, lang), dayAndImage);
        createElement("p", lang, getDay(day.datetime, lang), li);
    });
}
// Animation Div
function animateDivs() {
    const allDivsAnimate = document.querySelectorAll(".animate-div");
    allDivsAnimate.forEach((ele, index) => (ele.style.animation = `show-div 1s ${index * 0.5}s forwards`));
}
