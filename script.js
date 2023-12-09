const data = document.querySelector(".data");

const today = new Date().toLocaleDateString("ru");

const todayDay = today.split(".")[0];
const todayMonth = today.split(".")[1];
const todayYear = today.split(".")[2];

const months1 = [
    "января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "ноября",
    "декабря",
];
const months2 = [
    "январь",
    "Февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
];

data.textContent = `Сегодня ${todayDay} ${months1[todayMonth - 1]} ${todayYear}`;

const calendarMonth = document.querySelector(".calendar-date");
calendarMonth.textContent = months2[todayMonth - 1];

// Регистрация
