const questions = [
    "İsmin nedir?",
    "Kaçıncı Sınıfsın?",

];

let current = 0;
function validateCurrentInput() {
    if (current === 0) {
        // Validate name input
        const val = document.getElementById("answer").value.trim();
        if (val === "") {
            alert("Lütfen isminizi giriniz."); // Replace with better UI if wanted
            document.getElementById("answer").focus();
            return false;
        }
    } else if (current === 1) {
        // Validate grade selection
        const sel = document.getElementById("grade-select").value;
        if (!sel) {
            alert("Lütfen sınıfınızı seçiniz.");
            document.getElementById("grade-select").focus();
            return false;
        }
    }
    return true;
}

function nextQuestion() {
    if (!validateCurrentInput()) return;

    // 1. Before incrementing, determine which answer to send
    if (current === 0) {
        // Sending answer to first question (nickname, from input)
        sendAnswer(questions[current], document.getElementById("answer").value);
    } else if (current === 1) {
        // Sending answer to grade question (from select)

        sendAnswer(questions[current], document.getElementById("grade-select").value);
    } // Add more as needed for more questions

    current++;

    if (current === 1) {
        // Show grade select
        document.getElementById("survey-label").textContent = questions[current];
        document.getElementById("answer").classList.add("hidden");
        document.getElementById("grade-select").classList.remove("hidden");
        document.getElementById("familyaccount").style.display = "none";
    }
   
    else if (current >= questions.length) {
        document.getElementById("survey-label").textContent = "Teşekkürler!";
        document.getElementById("survey-label").classList.add("justify-center");
        document.getElementById("answer").classList.add("hidden");
        document.getElementById("grade-select").classList.add("hidden");
        document.getElementById("next").style.display = "none";
        document.getElementById("familyaccount").style.display = "none";

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(function () {
            window.location.href = "/Platform/AnaSayfa";
        }, 1500); // Redirect after 1.5 seconds
    }
    else {
        // For additional questions (if any)
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
function sendAnswer(question, answer) {
    fetch('/Giris/Cevap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            answer: answer
        })
    })
        .then(response => {
            if (!response.ok) {
                // Optional: handle error
            }
        })
        .catch(error => {
            console.log('Error sending answer:', error);
        });
}
