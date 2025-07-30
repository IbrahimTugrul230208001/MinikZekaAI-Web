const questions = [
    "İsmin nedir?",
    "Kaçıncı Sınıfsın?",
    // Add more...
];

let current = 0;

function nextQuestion() {
    current++;

    // 1. If on "Kaçıncı Sınıfsın?" (current == 1), show select, hide input
    if (current === 1) {
        document.getElementById("survey-label").textContent = questions[current];
        document.getElementById("answer").classList.add("hidden");
        document.getElementById("grade-select").classList.remove("hidden");
    }
    // 2. If beyond last question, show thank you
    else if (current >= questions.length) {
        document.getElementById("survey-label").textContent = "Teşekkürler!";
        document.getElementById("survey-label").classList.add("justify-center");
        document.getElementById("answer").classList.add("hidden");
        document.getElementById("grade-select").classList.add("hidden");
        document.getElementById("next").style.display = "none";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    // 3. For other questions, show input, hide select
    else {
        document.getElementById("survey-label").textContent = questions[current];
        document.getElementById("answer").placeholder = questions[current];
        document.getElementById("answer").value = "";
        document.getElementById("answer").classList.remove("hidden");
        document.getElementById("grade-select").classList.add("hidden");
    }
}

document.getElementById("next").onclick = nextQuestion;

document.getElementById("answer").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        nextQuestion();
    }
});
