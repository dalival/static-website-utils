const rubToUsd = 95.9;
const usdToByn = 3.11;
const bynToEur = 3.43;
const salaryRub = 222222;
const workMinutesPerMonth = 168 * 60;

function toRedNumber(num) {
    return `<span class="red">${num}</span>`;
}

function minutesToString(minutes) {
    const minutesInDay = 8 * 60; // 8 working hours in day
    const minutesInMonth = 21 * minutesInDay; // 21 working days in month
    const minutesInYear = 11 * minutesInMonth; // 1 working months in year

    const years = Math.floor(minutes / minutesInYear);
    const remainingMinutesAfterYears = minutes % minutesInYear;

    const months = Math.floor(remainingMinutesAfterYears / minutesInMonth);
    const remainingMinutesAfterMonths = remainingMinutesAfterYears % minutesInMonth;

    const days = Math.floor(remainingMinutesAfterMonths / minutesInDay);
    const remainingMinutesAfterDays = remainingMinutesAfterMonths % minutesInDay;

    const hours = Math.floor(remainingMinutesAfterDays / 60);
    const remainingMinutes = remainingMinutesAfterDays % 60;

    const timeParts = [];

    if (years > 0) {
        timeParts.push(`${toRedNumber(years)} year${years > 1 ? 's' : ''}`);
    }

    if (months > 0) {
        timeParts.push(`${toRedNumber(months)} month${months > 1 ? 's' : ''}`);
    }

    if (days > 0) {
        timeParts.push(`${toRedNumber(days)} day${days > 1 ? 's' : ''}`);
    }

    if (hours > 0) {
        timeParts.push(`${toRedNumber(hours)} hour${hours > 1 ? 's' : ''}`);
    }

    if (remainingMinutes > 0) {
        timeParts.push(`${toRedNumber(remainingMinutes)} minute${remainingMinutes > 1 ? 's' : ''}`);
    }

    return timeParts.join(', ');
}

document.addEventListener("DOMContentLoaded", function() {
    const inputBYN = document.getElementById("inputBYN");
    const inputUSD = document.getElementById("inputUSD");
    const inputEUR = document.getElementById("inputEUR");
    const resultText = document.getElementById("resultText");

    function calculateAndDisplay(inputRub) {
        if (!isNaN(inputRub)) {
            const minutes = Math.round(inputRub / salaryRub * workMinutesPerMonth);
            resultText.innerHTML = minutesToString(minutes);
            resultText.style.display = "block";
        } else {
            resultText.textContent = "";
            resultText.style.display = "none";
        }
    }

    inputBYN.addEventListener("input", function() {
        const byn = parseFloat(inputBYN.value);
        const rub = byn / usdToByn * rubToUsd;
        calculateAndDisplay(rub);

        inputUSD.value = Math.round(byn / usdToByn);
        inputEUR.value = Math.round(byn / bynToEur);
    });

    inputUSD.addEventListener("input", function() {
        const usd = parseFloat(inputUSD.value);
        const rub = usd * rubToUsd;
        calculateAndDisplay(rub);

        inputBYN.value = Math.round(usd * usdToByn);
        inputEUR.value = Math.round(usd * usdToByn / bynToEur);
    });

    inputEUR.addEventListener("input", function() {
        const eur = parseFloat(inputEUR.value);
        const rub = eur * bynToEur / usdToByn * rubToUsd;
        calculateAndDisplay(rub);

        inputBYN.value = Math.round(eur * bynToEur);
        inputUSD.value = Math.round(eur * bynToEur / usdToByn);
    });
});