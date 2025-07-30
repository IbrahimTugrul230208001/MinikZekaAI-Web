// Place in your LogIn.js or inline <script>
const questions = [
    "İsmin nedir?",
    "Kaçıncı Sınıfsın?",
    
    // Add more...
];

let current = 0;

document.getElementById("next").onclick = function () {
    current++;
    if (current < questions.length) {
        document.getElementById("survey-label").textContent = questions[current];
        document.getElementById("answer").value = "";
    } else {
        // All done: show a message, hide form, etc.
        document.getElementById("survey-label").textContent = "Teşekkürler!";
        document.getElementById("answer").style.display = "none";
        this.style.display = "none";
    }
};
