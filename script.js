document.addEventListener("DOMContentLoaded", function() {
    const inputNumber = document.getElementById("inputNumber");
    const resultText = document.getElementById("resultText");

    inputNumber.addEventListener("input", function() {
        const inputValue = parseFloat(inputNumber.value);
        if (!isNaN(inputValue)) {
            const calculatedValue = Math.round(((inputValue / 3.2 * 100.5) / 222222) * 168 * 60);
            resultText.innerHTML = formatTime(calculatedValue); // Use innerHTML
            resultText.style.display = "block"; // Show the result text
        } else {
            resultText.textContent = "";
            resultText.style.display = "none"; // Hide the result text if input is invalid
        }
    });
});

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `<span class="red">${remainingMinutes}</span> minutes`;
    } else if (remainingMinutes === 0) {
        return `<span class="red">${hours}</span> hour(s)`;
    } else {
        return `<span class="red">${hours}</span> hour(s) <span class="red">${remainingMinutes}</span> minutes`;
    }
}