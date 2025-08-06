var hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/ai-hub")
    .build();

async function startHubConnection() {
    await hubConnection.start();
    console.log("SignalR Connected. Connection ID:", hubConnection.connectionId);
}
startHubConnection();

hubConnection.on("ReceiveMessage", (message) => {
    console.log("Received AI Response:", message);
    const modifiedMessage = marked.parse(message);

    const storyContainer = document.getElementById("story-container");
    storyContainer.classList.remove("hidden");

    const storyText = document.getElementById("story");
    // Typewriter effect
    const typewriter = new Typewriter(storyText, {
        delay: 10,
        cursor: ''
    });

    typewriter
        .typeString(modifiedMessage)
        .start()
        .callFunction(() => {
            storyContainer.scrollTop = storyContainer.scrollHeight;
        });

    setTimeout(() => {
        storyContainer.scrollTop = storyContainer.scrollHeight;
    }, 100);

});

// Function to send user input to backend
function generateQuestion() {

    if (!hubConnection.connectionId) {
        console.error("SignalR Connection ID is not available.");
        return;
    }



    const mainCharacter = document.getElementById("main-character").value;
    const storyTheme = document.getElementById("story-theme").value;
    const storyLength = document.getElementById("story-length").value;
    // Loading spinner as a DOM element
    const storyCriteriaDiv = document.getElementById("story-criteria");
    storyCriteriaDiv.remove();



    const prompt = `Bir hikaye oluştur. Hikaye ana karakteri: ${mainCharacter}, hikaye teması: ${storyTheme}, hikaye uzunluğu: ${storyLength}.`;
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
            // Now use data as before
            if (!data.response) {
                console.log("Invalid API response:", data);
                return;
            }
        });


}

