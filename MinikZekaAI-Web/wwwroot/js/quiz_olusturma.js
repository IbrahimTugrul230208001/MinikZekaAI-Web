var hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/ai-hub")
    .build();

async function startHubConnection() {
    await hubConnection.start();
    console.log("SignalR Connected. Connection ID:", hubConnection.connectionId);
}
startHubConnection();

hubConnection.on("ReceiveMessage", raw => {
    // 1. Clean fences or markdown
    const jsonStr = raw.trim().replace(/^```json|```$/g, "").trim();

    // 2. Parse
    let data;
    try { data = JSON.parse(jsonStr); }
    catch (e) { console.error("Bad JSON", e, raw); return; }

    // 3. Show UI
    document.getElementById("question-criteria").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");

    // 4. Inject question
    document.getElementById("question").innerText = `Soru: ${data.soru}`;

    // 5. Inject answers
    data.cevaplar.slice(0, 4).forEach((c, i) => {
        const btn = document.getElementById(`response${i + 1}`);
        btn.innerText = c.deger;
        btn.dataset.correct = c.secenek === data.dogru_cevap;
        btn.onclick = handleAnswerClick;               // ➊ attach click logic
        btn.disabled = false;                          // re-enable for next question
        btn.classList.remove('opacity-60', 'bg-green-500', 'bg-red-500');
        btn.classList.add('bg-sky-50', 'hover:bg-sky-500', 'hover:text-white');
    });
});


// Function to send user input to backend
function generateQuestion() {
    if (!hubConnection.connectionId) {
        console.error("SignalR Connection ID is not available.");
        return;
    }
    console.log("activated");
    // Criteria: lesson, concept, (optionally: grade, difficulty, etc.)
    const concept = document.getElementById("question-concept").value; // örn. 'Çarpma'
    const grade = document.getElementById("question-grade") ? document.getElementById("question-grade").value : "";
    const difficulty = document.getElementById("question-difficulty") ? document.getElementById("question-difficulty").value : "";

    // Remove criteria form
    const storyCriteriaDiv = document.getElementById("story-criteria");
    if (storyCriteriaDiv) storyCriteriaDiv.remove();

    // Construct the prompt
    let prompt = `${grade ? grade + ". sınıf " : ""}$ düzeyi için "${concept}" konusunda`;
    if (difficulty) prompt += `, ${difficulty} seviyesinde`;
    prompt += " 1 adet çoktan seçmeli soru oluştur. Şıklar A, B, C, D olsun. Aşağıdaki şemaya uygun, sadece geçerli bir JSON döndür. Açıklama ekleme.";

    prompt += `
{
  "soru": "<SORU_METNI>",
  "cevaplar": [
    {"secenek": "A", "deger": "<CEVAP_A>"},
    {"secenek": "B", "deger": "<CEVAP_B>"},
    {"secenek": "C", "deger": "<CEVAP_C>"},
    {"secenek": "D", "deger": "<CEVAP_D>"}
  ],
  "dogru_cevap": "<DOĞRU_SEÇENEK>"
}
`;

    console.log("Sending prompt to backend:", prompt);

    fetch("/Platform/Sohbet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: prompt,
            connectionId: hubConnection.connectionId
        })
    })
        .then(async response => {
            if (!response.ok) {
                console.log("HTTP error:", response.status, response.statusText);
                return;
            }
            const text = await response.text();
            if (!text) {
                console.log("Empty response body");
                return;
            }
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.log("Response not valid JSON:", text);
                return;
            }
            // handle LLM response
            if (!data.response) {
                console.log("Invalid API response:", data);
                return;
            }
            // Insert your logic here to display/use the generated question
            // Example: displayQuestion(data.response);
        });
}

// attach once, after the DOM is loaded
document.getElementById("regenerate").onclick = () => {
    // unlock buttons in case user clicks regenerate before answering
    document.querySelectorAll('#question-container button.answer-btn').forEach(b => {
        b.disabled = false;
        b.classList.remove('opacity-60', 'bg-green-500', 'bg-red-500', 'text-white');
        b.classList.add('bg-sky-50', 'hover:bg-sky-500', 'hover:text-white');
    });
    generateQuestion();
};
// Utility: lock buttons after first choice

function lockButtons() {
    document.querySelectorAll('#question-container button').forEach(b => {
        b.disabled = true;
        b.classList.add('cursor-not-allowed', 'opacity-60');
    });
}

function handleAnswerClick(e) {
    const btn = e.currentTarget;

    // Already answered – ignore
    if (btn.disabled) return;

    const isCorrect = btn.dataset.correct === "true";

    if (isCorrect) {
        // green background
        btn.classList.remove('bg-sky-50', 'hover:bg-sky-500', 'hover:text-white');
        btn.classList.add('bg-green-500', 'text-white');

        // confetti blast
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        // red feedback for wrong choice
        btn.classList.remove('bg-sky-50', 'hover:bg-sky-500', 'hover:text-white');
        btn.classList.add('bg-red-500', 'text-white');
    }

    lockButtons();
}
