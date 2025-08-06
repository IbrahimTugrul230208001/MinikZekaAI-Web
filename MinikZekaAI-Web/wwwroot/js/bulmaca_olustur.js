var hubConnection = new signalR.HubConnectionBuilder().withUrl("/ai-hub").build();
hubConnection.start();
let currentMode = null;
hubConnection.on("ReceiveMessage", raw => {
    const jsonStr = raw.trim().replace(/^```json|```$/g, "").trim();
    let data; try { data = JSON.parse(jsonStr); } catch (e) { console.error("Bad JSON", e); return; }
    if (currentMode === 'puzzle') {
        const grid = document.getElementById("puzzle-grid");
        grid.innerHTML = "";
        data.grid.forEach(row => {
            const tr = document.createElement("tr");
            row.split('').forEach(ch => {
                const td = document.createElement("td");
                td.textContent = ch;
                td.className = "border w-8 h-8 text-center";
                tr.appendChild(td);
            });
            grid.appendChild(tr);
        });
        document.getElementById("puzzle-words").innerText = (data.words || []).join(', ');
        document.getElementById("puzzle-container").classList.remove("hidden");
    } else if (currentMode === 'idiom') {
        document.getElementById("idiom-question").innerText = data.soru;
        const optDiv = document.getElementById("idiom-options");
        optDiv.innerHTML = "";
        data.secenekler.forEach(o => {
            const btn = document.createElement("button");
            btn.textContent = o.deger;
            btn.className = "answer-btn w-full px-4 py-2 border rounded-lg bg-sky-50 hover:bg-sky-500 hover:text-white";
            btn.dataset.correct = o.secenek === data.dogru_cevap;
            btn.onclick = function () {
                const isCorrect = this.dataset.correct === "true";
                this.classList.remove('bg-sky-50', 'hover:bg-sky-500', 'hover:text-white');
                this.classList.add(isCorrect ? 'bg-green-500' : 'bg-red-500', 'text-white');
                if (isCorrect) {
                    confetti({
                        particleCount: 120,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            };
            optDiv.appendChild(btn);
        });
    }
});
function generatePuzzle(size) {
    if (!hubConnection.connectionId) return;
    currentMode = 'puzzle';
    const prompt = `${size}x${size} boyutunda bir kelime bulmacası hazırla. Sadece geçerli JSON dön:\n{\n"grid":["<satir1>","<satir2>",...],\n"words":["kelime1","kelime2"]\n}`;
    fetch("/Platform/Sohbet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt, connectionId: hubConnection.connectionId })
    });
}
function generateIdiom() {
    if (!hubConnection.connectionId) return;
    currentMode = 'idiom';
    const prompt = `Bir Türk atasözü seç ve bir kelimesini boş bırak. Boşluk için 3 seçenek (A,B,C) sun ve doğru seçeneği belirt. Sadece geçerli JSON dön:\n{\n"soru":"<cümle>",\n"secenekler":[{"secenek":"A","deger":"<A>"},{"secenek":"B","deger":"<B>"},{"secenek":"C","deger":"<C>"}],\n"dogru_cevap":"<DOGRU>"\n}`;
    fetch("/Platform/Sohbet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt, connectionId: hubConnection.connectionId })
    });
}