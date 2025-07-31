const openBtn = document.querySelector('[aria-label="Chat with AI"]');
const chatBox = document.getElementById('chatBox');
const closeBtn = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatContent = document.getElementById('chatContent');

// Show chat box
openBtn.addEventListener('click', () => {
    chatBox.classList.remove('scale-0', 'opacity-0');
    chatBox.classList.add('scale-100', 'opacity-100');
    setTimeout(() => chatInput.focus(), 250);
});

// Hide chat box
closeBtn.addEventListener('click', () => {
    chatBox.classList.remove('scale-100', 'opacity-100');
    chatBox.classList.add('scale-0', 'opacity-0');
});

// Basic chat send (append message, simulate AI reply)
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatContent.innerHTML += `<div class="my-2 flex justify-end"><div class="bg-yellow-200 text-gray-900 px-3 py-2 rounded-lg max-w-xs">${text}</div></div>`;
    chatInput.value = '';
    chatContent.scrollTop = chatContent.scrollHeight;
    // Simulate AI response
    setTimeout(() => {
        chatContent.innerHTML += `<div class="my-2 flex justify-start"><div class="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg max-w-xs">[AI]: Cevabınız burada!</div></div>`;
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 600);
});

// Close chat on outside click
document.addEventListener('click', e => {
    if (!chatBox.contains(e.target) && !openBtn.contains(e.target)) {
        chatBox.classList.remove('scale-100', 'opacity-100');
        chatBox.classList.add('scale-0', 'opacity-0');
    }
});

// Close chat on escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        chatBox.classList.remove('scale-100', 'opacity-100');
        chatBox.classList.add('scale-0', 'opacity-0');
    }
});
